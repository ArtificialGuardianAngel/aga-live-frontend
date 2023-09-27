"use client";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "@/components";
import { TriangleArrowIcon } from "@/components/Icons";
import { useApp } from "@/hooks/use-app";
import cn from "classnames";

const RightBar = () => {
    const { chats, chatId, startNewChat, changeChat, user } = useApp();
    const [prevChatsOpened, setPrevChatsOpened] = useState<boolean>(false);

    return (
        <div className="flex flex-col overflow-y-auto wishes-lg:hidden">
            <div className="flex gap-[5px] wishes-xl:flex-col">
                <Button
                    className="flex-1"
                    type="secondary"
                    size="sm"
                    onClick={startNewChat}
                >
                    Start new chat
                </Button>
                {user && (
                    <Button
                        className="flex-1"
                        type="secondary"
                        size="sm"
                        onClick={() => setPrevChatsOpened((prev) => !prev)}
                    >
                        Previous chats
                    </Button>
                )}
            </div>
            <div className="flex-1 p-[20px_0]">
                <CSSTransition
                    in={prevChatsOpened}
                    timeout={300}
                    unmountOnExit
                    classNames={"slide"}
                >
                    <div className="p-[20] text-sm text-blue-4">
                        <div className="mb-[20px] flex items-center justify-between">
                            <h4>Previous chats:</h4>
                            <button
                                className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/10"
                                onClick={() => setPrevChatsOpened(false)}
                            >
                                <TriangleArrowIcon color="#D6E1FA" />
                            </button>
                        </div>

                        <div className="">
                            {chats.map((item, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "mb-[2px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-[50px] p-[10px_20px] transition-all hover:bg-accent-green/20",
                                        {
                                            "bg-white/10": chatId !== item._id,
                                            "bg-accent-green/40":
                                                chatId === item._id,
                                        },
                                    )}
                                    onClick={() => changeChat(item._id)}
                                >
                                    {new Date(item.updatedAt).toLocaleString()}
                                </div>
                            ))}
                        </div>
                    </div>
                </CSSTransition>
            </div>
            <div className="text-end text-sm text-blue-4">
                NUAH AGA (version 0.1)
            </div>
        </div>
    );
};

export default RightBar;
