import React from "react";
import cn from "classnames";

interface Props {
    className?: string;
}

const AgaFace: React.FC<Props> = ({ className }) => {
    return (
        <video
            className={cn(
                "h-full w-full rounded-[10px] mix-blend-lighten",
                className,
            )}
            autoPlay
            muted
            loop
            playsInline
        >
            <source src="/videos/idle.webm" type="video/webm" />
            <source src="/videos/idle_h264.mp4" type="video/mp4" />
            <source src="/videos/idle.mp4" type="video/mp4" />
        </video>
    );
};

export default AgaFace;
