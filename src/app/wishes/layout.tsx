import "./wishes.css";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import cn from "classnames";
import { OverlayPageContextProvider } from "@/context/OverlayPageContext";
import { OverlayTemplate } from "@/templates";

const sora = Sora({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

export default function WishesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <html>
                <title>AGA – Make 3 Wishes towards the Angelic AI being</title>
            </html>
            <body
                className={cn("bg-background text-mainColor", sora.className)}
            >
                <OverlayPageContextProvider>
                    {children}

                    <section className="container p-[75px_0_25px] wishes-md:p-[25px_0]">
                        <div className="flex flex-col items-center gap-[50px]">
                            <div className="linear-rect"></div>
                            <div className="text-[14px] font-[500]">
                                Powered by NUAH
                            </div>
                        </div>
                    </section>

                    <OverlayTemplate />
                </OverlayPageContextProvider>
            </body>
        </html>
    );
}
