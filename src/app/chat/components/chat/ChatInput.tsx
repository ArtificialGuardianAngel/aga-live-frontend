"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components";
import { useApp } from "@/hooks/use-app";
import { SendIcon } from "@/components/Icons";
import { CHAT_COMANNDS_COMPONENTS, CHAT_COMMANDS } from "./constants";
import { TextArea } from "@/components/Input";

interface Props {
    onChatInput?: (input?: string) => void;
}

const ChatInput: React.FC<Props> = ({ onChatInput }) => {
    const { prompt } = useApp();
    const [input, setInput] = useState("");
    const isCommand = useMemo(() => input.startsWith("/"), [input]);

    const onSubmit = () => {
        console.log("submittion", input);
        if (onChatInput) return onChatInput(input);
        prompt(input);
        setInput("");
    };

    useEffect(() => {
        console.log("input", input);
    }, [input]);

    return (
        <div className="relative pb-[20px] wishes-md:p-[20px_0]">
            {isCommand && (
                <section
                    id="commands"
                    className="absolute bottom-[calc(100%_+_10px)] left-0 right-0 rounded-[15px] bg-blue-2 px-[30px] py-[15px]"
                >
                    {CHAT_COMMANDS.filter((el) =>
                        el.includes(input.replace("/", "")),
                    ).map((el, i) => {
                        const Container = CHAT_COMANNDS_COMPONENTS[el];
                        return (
                            <div
                                key={i}
                                className="my-[5px] border-b border-b-white/10 py-[5px]"
                            >
                                <Container>/{el}</Container>
                            </div>
                        );
                    })}
                </section>
            )}
            <TextArea
                placeholder="Ask your question here..."
                size="lg"
                buttonContent={<SendIcon color="#FFFFFF" />}
                buttonProps={{
                    onClick: onSubmit,
                }}
                value={input}
                onChange={setInput}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        onSubmit();
                    }
                }}
            />
            {/* <div className="flex gap-[30px] items-center justify-center max-[767px]:hidden">
        <Switch label="Assistant mode" />
        <Switch label="Knowledge mode" />
        <Switch label="Internet search" />
      </div> */}
        </div>
    );
};

export default ChatInput;
