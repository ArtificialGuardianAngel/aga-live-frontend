"use client";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/dracula.css";
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

export const DocsRenderer = ({ content }: { content: string }) => (
    <div className="flex justify-center">
        <div
            className="markdown markdown-invert leading-[20px] wishes-md:text-sm"
            dangerouslySetInnerHTML={{ __html: marked.parse(marked(content)) }}
        />
    </div>
);
