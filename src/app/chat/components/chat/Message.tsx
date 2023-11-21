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

const findByPercent = (
    searching: string,
    substring: string,
): [number, number] => {
    let index = -1;
    let maxPercent = 0;
    const chars = substring.split("");
    for (let i = 0; i < chars.length; i++) {
        const char = chars.slice(0, i + 1).join("");
        // console.log(char);
        const foundIndex = searching.indexOf(char);
        if (foundIndex > -1) {
            index = foundIndex;
            maxPercent = ((i + 1) / chars.length) * 100;
        }
    }
    return [index, maxPercent];
};

const TAGS = ["</bot>", "</s>", "<human>:"];
interface Props {
    message: string;
    isMe: boolean;
    isGenerating?: boolean;
    isLast?: boolean;
    prompt?: (data: string) => void;
}

const Message: React.FC<Props> = ({ message, isMe, isGenerating }) => {
    const untaggedMessage = useMemo(() => {
        let nearest = -1;
        let occuracy = 0;
        for (const tag of TAGS) {
            const [index, percent] = findByPercent(message, tag);
            console.log(tag, index, percent);
            if (index <= nearest && index !== -1 && occuracy <= percent) {
                nearest = index;
                occuracy = percent;
            }
        }
        // console.log(nearest);
        return nearest === -1 ? message : message.slice(0, nearest);
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
