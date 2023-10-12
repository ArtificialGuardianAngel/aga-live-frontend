"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import cn from "classnames";

type Props = PropsWithChildren<{
    className?: string;
    thumbnail: string;
}>;
const VideoBackground = ({ className, thumbnail, children }: Props) => {
    const [suspend, setSuspend] = useState(false);
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.addEventListener("suspend", () => {
            console.log(thumbnail, "suspend");
            setSuspend(true);
        });
        if (ref.current.paused) setSuspend(true);
        // console.log(thumbnail, ref.current.paus]ed);
    }, []);
    return (
        <>
            <video
                ref={ref}
                className={cn(
                    className
                        ? className
                        : "fixed left-0 top-0 -z-20 h-[100dvh] w-screen object-cover",
                    {
                        hidden: suspend,
                    },
                )}
                autoPlay
                loop
                muted
            >
                {children}
            </video>
            <img
                className={cn(
                    className
                        ? className
                        : "fixed left-0 top-0 -z-20 h-[100dvh] w-screen object-cover",
                    {
                        block: suspend,
                        hidden: !suspend,
                    },
                )}
                src={thumbnail}
                alt="thumbnail"
            />
        </>
    );
};

export default VideoBackground;
