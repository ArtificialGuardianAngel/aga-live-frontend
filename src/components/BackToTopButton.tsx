"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const BackToTopButton = () => {
    const [visible, setVisible] = useState(false);

    const onClick = () => {
        window.scrollTo(0, 0);
    };

    const onScroll = () => {
        if (window.scrollY > 100) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("scroll", onScroll);

        return () => document.removeEventListener("scroll", onScroll);
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <div
            className="overflow:hidden fixed bottom-[20px] right-[20px] z-30 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border-[1px] border-accentGreen backdrop-blur-[25px]"
            onClick={onClick}
        >
            <Image
                src="/icons/green-arrow-top.svg"
                alt=""
                width={14}
                height={14}
            />
        </div>
    );
};

export default BackToTopButton;
