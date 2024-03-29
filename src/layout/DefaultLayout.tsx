"use client";
import authApi from "@/api/auth";
import VideoBackground from "@/app/wishes/components/VideoBackground";
import { getLocalInfo } from "@/utils/metadata";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TITLES: { [key: string]: string } = {
    "give-and-earn":
        "Give&Earn - Support the largest humanitarian project that has ever existed.",
    wishes: "3 Wishes - Make your wish a reality with AGA",
};

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    useEffect(() => {
        getLocalInfo()
            .then(authApi.connect)
            .then((r) => {
                console.log(r.data);
            })
            .catch((e) => console.error(e));
    }, []);

    useEffect(() => {
        document.title = TITLES[pathname.split("/")[1]] || "AGA Live";
    }, [pathname]);

    return (
        <>
            <VideoBackground
                className="fixed left-0 top-0 -z-20 h-[100dvh] w-screen object-cover"
                thumbnail="/images/video-bg_thumbnail.png"
            >
                <source src="/videos/video-bg.webm" type="video/webm" />
                <source src="/videos/video-bg.mp4" type="video/mp4" />
                <source src="/videos/video-bg_h264.mp4" type="video/mp4" />
            </VideoBackground>

            <div className="wrapper-background fixed left-0 top-0 -z-10 h-[100dvh] w-screen"></div>
            {children}
        </>
    );
}
