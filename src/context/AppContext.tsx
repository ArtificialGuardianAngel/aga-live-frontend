"use client";
import {
    PropsWithChildren,
    createContext,
    useCallback,
    useMemo,
    useState,
    useEffect,
} from "react";
import { IUser, UserTypeEnum } from "../types/user";
import { IWallet } from "../types/wallet";
import { io } from "socket.io-client";
import { getLocalInfo } from "../utils/metadata";
import authApi from "../api/auth";
import { IPromptAddedDto, IPromptReplyDto } from "../types/message";
import { IChatDocument, History } from "../types/chat";
import chatApi from "../api/chat";
import { mdAnswer, parseHistoryToMessages } from "./helpers";
import walletApi from "../api/wallet";
import { AxiosError } from "axios";
import crypto from "crypto";
import { useCosmos } from "@nuahorg/aga";

type Message = { content: string; isMe: boolean };

interface IContext {
    user: IUser | null;
    token: string | null;
    history: History;
    wallet: IWallet | null;
    messages: Array<Message>;
    chats: Array<IChatDocument>;
    chat: IChatDocument | undefined;
    chatId: string | null;
    isGenerating: boolean;
    isChatConnected: boolean;
    mnemonic?: string | null | undefined;
    prompt: (data: string) => void;
    authorize: (...data: Parameters<typeof authApi.authorize>) => void;
    verify: (...data: Parameters<typeof authApi.verify>) => void;
    changeChat: (id: string) => void;
    startNewChat: () => void;
    connectWallet: (password?: string) => Promise<void>;
}

const DEFAULT_CONTEXT: IContext = {
    user: null,
    token: null,
    wallet: null,
    history: { internal: [["", ""]], visible: [["", ""]] },
    messages: [],
    chats: [],
    chatId: null,
    chat: undefined,
    isGenerating: false,
    isChatConnected: false,
    prompt: () => {
        console.warn("Context Is Empty");
    },
    authorize: () => {
        console.warn("Context Is Empty");
    },
    verify: () => {
        console.warn("Context Is Empty");
    },
    changeChat: () => {
        console.warn("Context Is Empty");
    },
    startNewChat: () => {
        console.warn("Context Is Empty");
    },
    connectWallet: () =>
        new Promise(() => {
            console.warn("Context Is Empty");
        }),
};

export const AppContext = createContext<IContext>(DEFAULT_CONTEXT);

export const AppProvider = ({ children }: PropsWithChildren) => {
    const { connect } = useCosmos();
    const [mnemonic, setMnemonic] = useState<string>();
    const [isGenerating, setIsGenerating] = useState(false);
    const [messages, setMessages] = useState<
        Array<{ _id: string; content: string; isMe: boolean }>
    >([
        // { _id: "123", content: "hello", isMe: true },
        // { _id: "123", content: mdAnswer, isMe: false },
    ]);

    const [chatId, setChatId] = useState<string | null>(null);
    const [chats, setChats] = useState<IContext["chats"]>([]);
    const [chat, setChat] = useState<IContext["chat"]>();

    const [token, setToken] = useState<IContext["token"]>(
        DEFAULT_CONTEXT["token"],
    );
    const [user, setUser] = useState<IContext["user"]>(DEFAULT_CONTEXT["user"]);
    const [wallet, setWallet] = useState<IContext["wallet"]>(
        DEFAULT_CONTEXT["wallet"],
    );
    const [walletF, setWalletF] = useState(false);
    const [history] = useState<IContext["history"]>(DEFAULT_CONTEXT["history"]);

    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [isChatConnected, setIsChatConnected] = useState(false);

    const socket = useMemo(
        () =>
            io(
                `${
                    process.env.NEXT_PUBLIC_SOCKET_URL ||
                    process.env.NEXT_PUBLIC_API_URL ||
                    "https://api.aga.live"
                }/?token=${token}`,
                {
                    autoConnect: false,
                },
            ),
        [token],
    );

    const _addMessage = (
        id: string,
        content: string,
        history: null | History = null,
        isMe = false,
    ) => {
        setMessages((msgs) => {
            const h = [...msgs];
            const index = msgs.findIndex(
                (el) => el._id === id && el.isMe === isMe,
            );
            if (index > -1) {
                if (history && history.visible.length > 0) {
                    console.log(
                        "Appening new text",
                        history.visible[history.visible.length - 1],
                    );
                    h[index].content = history.visible.pop()?.pop() || "";
                }
                h[index].isMe = isMe;
            } else {
                let _content = content;
                if (history && history.visible.length > 0) {
                    _content = history.visible.pop()?.pop() || "";
                    console.log(">>>", _content);
                }
                console.log("Adding new message", _content);
                h.push({
                    _id: id,
                    content: _content,
                    isMe,
                });
            }
            return h;
        });
    };

    const generateId = useCallback(
        (message: string) => {
            const hash = crypto.createHash("md5").update(message).digest("hex");
            return `${hash}.${chatId}`;
        },
        [chatId],
    );

    const getWalletMenmonic = useCallback(
        (password: string) => {
            if (!user) throw new Error("User is not authorized");
            return new Promise<string>((resolve, reject) => {
                walletApi
                    .connectWallet(password)
                    .then((response) => resolve(response.data.mnemonic))
                    .catch(reject);
            });
        },
        [user],
    );

    const connectWallet = useCallback(
        async (_password?: string) => {
            try {
                const password = _password || sessionStorage.getItem("pwd");
                if (!password) throw new Error("Password is not set");
                const mnemonic = await getWalletMenmonic(password);
                if (mnemonic) connect(mnemonic);
                setMnemonic(mnemonic);
                if (!password) sessionStorage.setItem("pwd", password);
            } catch (error) {
                throw error;
            } finally {
                setWalletF((p) => !p);
            }
        },
        [getWalletMenmonic, connect],
    );

    const prompt: IContext["prompt"] = useCallback(
        (input) => {
            if (!input) return console.warn("No prompt was provided");
            if (!socket.connected) console.warn("Socket is not connected");

            // _addMessage(generateId(input), input, null, true);
            socket.emit("prompt", { message: input, chatId });
        },
        [chatId, socket],
    );

    const authorize: IContext["authorize"] = useCallback(
        (email) =>
            authApi
                .authorize(email)
                .then((response) => setToken(response.data.token)),
        [],
    );

    const verify: IContext["verify"] = useCallback(
        (code, email) =>
            authApi.verify(code, email).then((r) => setUser(r.data)),
        [],
    );
    const changeChat = useCallback((id: string) => setChatId(id), []);
    const startNewChat = useCallback(() => {
        chatApi
            .create()
            .then((r) => setChatId(r.data._id))
            .catch((e) => console.error(e));
    }, []);

    useEffect(() => {
        if (chatId)
            chatApi.getById(chatId).then((r) => {
                setMessages(parseHistoryToMessages(r.data.history));
                setChat(r.data);
            });
    }, [chatId]);

    useEffect(() => {
        chatApi.getLast().then((r) => setChatId(r.data._id));
        if (user?.type === UserTypeEnum.authed) {
            chatApi.getPrevious().then((r) => setChats(r.data));
        }
    }, [user]);

    useEffect(() => {
        if (chat) setIsChatConnected(isSocketConnected);
    }, [chat, isSocketConnected]);

    useEffect(() => {
        if (token) {
            socket.connect();
            socket.on("prompt_added", (data: IPromptAddedDto) => {
                /** */
                _addMessage(data._id, data.input, null, true);
                setIsGenerating(true);
            });
            socket.on("prompt_reply", (data: IPromptReplyDto) => {
                /** */
                _addMessage(data.sid, data.message, data.history, false);
            });

            socket.on("prompt_reply_end", () => {
                setIsGenerating(false);
                setWalletF((p) => !p);
            });

            socket.on("connect", () => {
                // alert("connected");
                setIsSocketConnected(true);
            });
            socket.on("disconnect", () => {
                // alert("disconnected");
                setIsSocketConnected(false);
            });
        }
    }, [socket, token]);

    useEffect(() => {
        if (token) localStorage.setItem("token", token);
        authApi
            .me()
            .then((r) => setUser(r.data))
            .catch((e: AxiosError) =>
                console.error("Error while authorizing", e),
            );
    }, [token, walletF]);

    useEffect(() => {
        if (user?.hasWallet) connectWallet().catch((e) => console.error(e));
    }, [user?.hasWallet]);

    useEffect(() => {
        getLocalInfo()
            .then(authApi.connect)
            .then((r) => {
                setToken(r.data.token);
            });
    }, []);

    const state: IContext = useMemo(
        () => ({
            user,
            history,
            wallet,
            prompt,
            token,
            getWalletMenmonic,
            authorize,
            verify,
            messages,
            chats,
            chatId,
            chat,
            isGenerating,
            changeChat,
            startNewChat,
            isChatConnected,
            connectWallet,
            mnemonic,
        }),
        [
            user,
            history,
            wallet,
            prompt,
            token,
            authorize,
            verify,
            messages,
            chats,
            chatId,
            chat,
            changeChat,
            startNewChat,
            isGenerating,
            isChatConnected,
            getWalletMenmonic,
            connectWallet,
            mnemonic,
        ],
    );

    return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
