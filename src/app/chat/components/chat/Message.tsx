import React, { useMemo } from "react";

const BotEndTag = "</bot>";
interface Props {
    message: string;
    isMe: boolean;
    isGenerating?: boolean;
    isLast?: boolean;
    prompt?: (data: string) => void;
}

const Message: React.FC<Props> = ({ message, isMe, isGenerating }) => {
    const formattedMessage = useMemo(() => {
        const hasEndTag = message.includes(BotEndTag);
        let suffix = "";
        if (!isMe && !hasEndTag) suffix = "...";
        const content = message.trim().replace(BotEndTag, "") + suffix;
        const messageParts = content.split("\n");
        const msg = messageParts.map((part, idx) => (
            <React.Fragment key={idx}>
                {part && (
                    <>
                        <div>
                            {part}
                            {idx >= messageParts.length - 1 &&
                                isGenerating &&
                                !isMe && (
                                    <span className="inline-block h-3 w-[.5ch] animate-ping bg-white/80" />
                                )}
                        </div>
                        {idx < messageParts.length - 1 && <br />}
                    </>
                )}
            </React.Fragment>
        ));
        return <>{msg}</>;
    }, [message, isGenerating, isMe]);

    if (isMe) {
        return (
            <div className="flex gap-[30px] rounded-[10px] bg-white/[0.03] p-[30px] shadow wishes-md:flex-col wishes-md:gap-[10px] wishes-md:p-[20px] wishes-md:text-sm">
                <div className="w-[110px] font-bold text-accent-green">
                    Your message:
                </div>
                <div className="flex-1 text-blue-4">{formattedMessage}</div>
            </div>
        );
    }

    return (
        <div className="flex gap-[30px] p-[50px] wishes-md:flex-col wishes-md:gap-[25px] wishes-md:p-[30px_20px]">
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

                    <div className="leading-[20px] wishes-md:text-sm">
                        {formattedMessage}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
