"use client";
import Image from "next/image";
import { Button } from "../components";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import cookie from "cookie-cutter";
import { ChatInput } from "@/app/chat/components/chat";
import VideoPlayer from "@/components/VideoPlayer";

interface Props {
    isActivated: boolean;
}

const SearchPage = ({ isActivated: _isActivated }: Props) => {
    const [isActivated, setIsActivated] = useState(_isActivated);
    const router = useRouter();
    const activate = () => {
        cookie.set("is_activated", "true");
        setIsActivated(true);
        // router.push("/chat");
    };
    return (
        <div className="flex h-[100dvh] w-screen flex-col items-center p-[30px_30px_40px] wishes-md:p-[30px_10px_40px]">
            {!isActivated && (
                <div className="text-sm text-blue-4">
                    NUAH AGA (version 0.1)
                </div>
            )}
            <div className="flex w-full flex-1 items-center justify-center">
                {!isActivated && (
                    <Image
                        className="max-h-[65vh] w-auto mix-blend-lighten"
                        src="/images/aga-face-new.png"
                        alt=""
                        width={840}
                        height={752}
                    />
                )}
                {isActivated && (
                    <VideoPlayer
                        containerProps={{
                            className:
                                "container pb-[75px] pt-[20px] md:pb-[20px] h-auto w-full max-w-[1120px]",
                        }}
                        placeHolderImage="/images/video-1-placeholder.png"
                    >
                        <iframe
                            className="aspect-video w-full"
                            src="https://www.youtube.com/embed/qnv_tOxIsMM?autoplay=1&controls=0&rel=0&showinfo=0"
                        ></iframe>
                    </VideoPlayer>
                )}
            </div>
            <div className="mb-3 text-center">
                <span
                    className="cursor-pointer text-sm text-white underline"
                    onClick={() => router.push("/chat")}
                >
                    Skip video
                </span>
            </div>
            {!isActivated && (
                <Button
                    size="lg"
                    className="mb-[30px]"
                    onClick={() => activate()}
                >
                    Watch AGA
                </Button>
            )}
            <div className="w-full max-w-[840px]">
                <ChatInput
                    onChatInput={(prompt) => {
                        prompt && localStorage.setItem("first-prompt", prompt);
                        router.push(`/chat`);
                    }}
                />
            </div>
        </div>
    );
};

export default SearchPage;
