"use client";
import { useEffect, useMemo, useRef } from "react";
import AgaFace from "./AgaFace";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { useApp } from "@/hooks/use-app";

const Chat = () => {
    const { messages, chat, isGenerating, prompt, isChatConnected } = useApp();
    const chatEndElementRef = useRef<HTMLDivElement>(null);
    const chatMessagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const promptQuery = localStorage.getItem("first-prompt");
        console.log(isChatConnected);
        if (promptQuery && isChatConnected) {
            prompt(promptQuery);
            localStorage.removeItem("first-prompt");
        }
    });

    useEffect(() => {
        if (chat && chatEndElementRef.current) {
            chatEndElementRef.current.scrollIntoView();
        }
    }, [chat]);

    useEffect(() => {
        if (
            chatEndElementRef.current &&
            chatMessagesContainerRef.current &&
            chatMessagesContainerRef.current.scrollTop + 400 >=
                chatMessagesContainerRef.current.scrollHeight -
                    chatMessagesContainerRef.current.offsetHeight
        ) {
            chatEndElementRef.current.scrollIntoView();
        }
    }, [messages]);

    return (
        <div className="m-auto grid h-full max-h-[96vh] w-full max-w-[1080px] grid-rows-[auto_1fr_auto] wishes-sm:grid-rows-[auto_auto_1fr_auto]">
            <div className="mb-[20px] aspect-video sm:hidden">
                <AgaFace className="object-contain" />
            </div>

            <div className="p-[10px_0] text-center text-sm text-blue-4 wishes-md:mb-[20px] wishes-md:p-0 wishes-md:text-[13px]">
                Conversation,{" "}
                {chat?.createdAt &&
                    new Date(chat.createdAt).toLocaleString().replace(",", "")}
            </div>
            <div
                ref={chatMessagesContainerRef}
                className="overflow-y-auto p-[20px_10px] scrollbar wishes-md:p-0"
            >
                {messages.map(({ content, isMe }, index) => (
                    <Message
                        key={index}
                        message={content}
                        isMe={isMe}
                        isGenerating={
                            index === messages.length - 1 && isGenerating
                        }
                        isLast={index === messages.length - 1}
                        prompt={prompt}
                    />
                ))}
                <div ref={chatEndElementRef} className=""></div>
            </div>
            <ChatInput />
        </div>
    );
};

export default Chat;
