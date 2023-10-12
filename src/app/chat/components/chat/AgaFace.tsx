import React from "react";
import cn from "classnames";
import VideoBackground from "@/app/wishes/components/VideoBackground";

interface Props {
    className?: string;
}

const AgaFace: React.FC<Props> = ({ className }) => {
    return (
        <VideoBackground
            className={cn(
                "h-full w-full rounded-[10px] mix-blend-lighten",
                className,
            )}
            thumbnail="/images/idle_thumbnail.png"
        >
            <source src="/videos/idle.webm" type="video/webm" />
            <source src="/videos/idle_h264.mp4" type="video/mp4" />
            <source src="/videos/idle.mp4" type="video/mp4" />
        </VideoBackground>
    );
};

export default AgaFace;
