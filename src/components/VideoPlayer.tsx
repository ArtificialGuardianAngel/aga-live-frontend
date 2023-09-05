"use client";

import cn from "classnames";
import { HTMLAttributes, PropsWithChildren, useState } from "react";
import VideoPlayButton from "./VideoPlayButton";

type Props = PropsWithChildren<{
    containerProps: HTMLAttributes<HTMLDivElement>;
    placeHolderImage: string;
}>;

const VideoPlayer = ({
    containerProps: { className, ...containerProps },
    children,
    placeHolderImage,
}: Props) => {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <section {...containerProps} className={cn(className, "relative")}>
            <div className="relative aspect-video overflow-hidden rounded-[20px]">
                <div
                    className={cn(
                        "absolute inset-0 z-20 flex h-full w-full items-center justify-center rounded-[20px]",
                        { hidden: isClicked },
                    )}
                    style={{
                        background: `linear-gradient(102deg, rgba(17, 244, 209, 0.50) 0%, rgba(124, 29, 206, 0.50) 100%), url(${placeHolderImage}), lightgray 50% / cover no-repeat`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                >
                    <VideoPlayButton onClick={() => setIsClicked(true)} />
                </div>
                {children}
            </div>
        </section>
    );
};

export default VideoPlayer;
