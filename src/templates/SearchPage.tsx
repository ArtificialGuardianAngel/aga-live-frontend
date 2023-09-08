"use client";
import { Button } from "../components";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import cookie from "cookie-cutter";
import { ChatInput } from "@/app/chat/components/chat";
import { useApp } from "@/hooks/use-app";
// import video from '../assets/videos/AgaHQ.mp4';

interface Props {
    isActivated: boolean;
}

const SearchPage = ({ isActivated: _isAcrivated }: Props) => {
    const [isActivated, setIsActivated] = useState(_isAcrivated);
    const router = useRouter();
    const activate = () => {
        cookie.set("is_activated", "true");
        setIsActivated(true);
        // router.push("/chat");
    };
    return (
        <div className="flex h-[100dvh] w-screen flex-col items-center p-[30px_30px_40px]">
            {!isActivated && (
                <div className="text-sm text-blue-4">
                    NUAH A.G.A. (version 0.1)
                </div>
            )}
            <div className="flex w-full flex-1 items-center justify-center">
                {!isActivated && (
                    <img
                        className="max-h-[65vh] mix-blend-lighten"
                        src="/images/aga-face-new.png"
                        alt=""
                    />
                )}
                {isActivated && (
                    // <video className="max-h-[70vh] rounded-[30px]" autoPlay>
                    //   <source src={video} type="video/mp4" />
                    // </video>
                    <iframe
                        className="h-full max-h-[70vh] w-full max-w-[740px] rounded-[30px]"
                        src="https://www.youtube.com/embed/qnv_tOxIsMM?autoplay=1&controls=0&rel=0&showinfo=0"
                    ></iframe>
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
                    Watch A.G.A.
                </Button>
            )}
            <div className="w-full max-w-[840px]">
                <ChatInput
                    onChatInput={(prompt) => {
                        router.push(`/chat?prompt=${prompt}`);
                    }}
                />
            </div>
        </div>
    );
};

export default SearchPage;
