"use client";

import { useContext, useState, UIEvent as ReactUIEvent, useRef } from "react";
import Image from "next/image";
import OverlayPageContext from "../context/OverlayPageContext";
import { CSSTransition } from "react-transition-group";

const OverlayPage = () => {
    const { opened, content, close } = useContext(OverlayPageContext);
    const [backToTopButtonVisible, setBackToTopButtonVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const onBackToTopButtonClick = () => {
        if (ref.current) {
            ref.current.scrollTo(0, 0);
        }
    };

    const onScroll = (e: ReactUIEvent<HTMLDivElement, UIEvent>) => {
        if (e.currentTarget.scrollTop > 100) {
            setBackToTopButtonVisible(true);
        } else {
            setBackToTopButtonVisible(false);
        }
    };

    return (
        <CSSTransition
            in={opened}
            timeout={300}
            unmountOnExit
            classNames={"overlay-page"}
        >
            <div
                className="overlay-page-background min-[1024px]:scrollbar fixed left-0 top-0 z-50 h-[100dvh] w-screen overflow-y-auto scroll-smooth p-[20px] text-accent-green"
                onScroll={onScroll}
                ref={ref}
            >
                <button
                    onClick={() => close()}
                    className="fixed right-[20px] top-[20px] h-[40px] w-[40px] rounded-full border-2 border-accent-green backdrop-blur-[10px]"
                >
                    <div className="absolute left-[50%] top-[50%] h-[2px] w-[16px] translate-x-[-50%] rotate-45 rounded-[2px] bg-accent-green"></div>
                    <div className="absolute left-[50%] top-[50%] h-[2px] w-[16px] translate-x-[-50%] rotate-[-45deg] rounded-[2px] bg-accent-green"></div>
                </button>

                {backToTopButtonVisible && (
                    <button
                        className="overflow:hidden fixed bottom-[20px] right-[20px] z-30 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border-2 border-accentGreen backdrop-blur-[10px]"
                        onClick={onBackToTopButtonClick}
                    >
                        <Image
                            src="/icons/green-arrow-top.svg"
                            alt=""
                            width={14}
                            height={14}
                        />
                    </button>
                )}

                <div className="max-[1024px]:p-[0_10px] m-auto h-full max-w-[820px]">
                    {content}
                </div>
            </div>
        </CSSTransition>
    );
};

export default OverlayPage;
