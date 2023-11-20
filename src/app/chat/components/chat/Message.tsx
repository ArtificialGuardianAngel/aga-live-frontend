"use client";
import React, { useMemo } from "react";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/dracula.css";
// import { Light } from "react-syntax-highlighter";

marked.use(
    markedHighlight({
        langPrefix: "hljs language-",
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
        },
    }),
    {
        gfm: true,
    },
);

const TAGS = ["</bot>", "</s>", "<human>", "<s>"];
interface Props {
    message: string;
    isMe: boolean;
    isGenerating?: boolean;
    isLast?: boolean;
    prompt?: (data: string) => void;
}

const Message: React.FC<Props> = ({ message, isMe, isGenerating }) => {
    const untaggedMessage = useMemo(() => {
        let nearest = message.indexOf(TAGS[0]);
        for (const tag in TAGS) {
            if (message.indexOf(tag) < nearest && message.indexOf(tag) != -1)
                nearest = message.indexOf(tag);
        }
        return message.slice(0, nearest);
    }, [message]);

    if (isMe) {
        return (
            <div className="flex gap-[30px] rounded-[10px] bg-white/[0.03] p-[30px] shadow wishes-xl:flex-col wishes-md:gap-[10px] wishes-md:p-[20px] wishes-md:text-sm">
                <div className="w-[110px] font-bold text-accent-green">
                    Your message:
                </div>
                <div
                    className="markdown markdown-invert leading-[20px] wishes-md:text-sm"
                    dangerouslySetInnerHTML={{
                        __html: marked.parse(message),
                    }}
                />
            </div>
        );
    }

    return (
        <div className="flex gap-[30px] p-[50px] wishes-xl:flex-col wishes-md:gap-[25px] wishes-md:p-[30px_20px]">
            <div className="w-[90px] text-accent-green">
                <div className="flex items-center gap-[10px] font-bold wishes-md:text-sm">
                    <img
                        className="wishes-md:hidden"
                        src="/icons/nuah-logo.svg"
                        alt=""
                    />
                    <span>AGA</span>
                </div>
            </div>

            <div className="flex-1">
                <div className="flex flex-col gap-[20px]">
                    {/* <h4 className="text-[15px] text-accent-green font-medium leading-[10px] wishes-md:text-[13px]">
            Assistant mode:
          </h4> */}

                    <div
                        className="markdown markdown-invert leading-[20px] wishes-md:text-sm"
                        dangerouslySetInnerHTML={{
                            __html: marked.parse(untaggedMessage),
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Message;
