import type { Metadata } from "next";
import { Sora } from "next/font/google";
import cn from "classnames";
import { PropsWithChildren } from "react";
import { ArrowIcon } from "@/components/Icons";
import Link from "next/link";
import './happiness.css'

const sora = Sora({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "A.G.A. Happiness Index",
    description:
        "The Happiness Score Questionnaire, a 50-question tool, quantifies happiness and well-being in areas like personal satisfaction, health, work satisfaction, and spirituality. The happiness score is an average of all responses, with higher scores indicating greater happiness.",
};

const HappinessLayout = ({ children }: PropsWithChildren) => (
    <>
        <div
            className={cn(
                "flex min-h-[100dvh] items-center justify-center py-[150px] font-[Sora] text-blue-5",
                sora.className,
            )}
        >
            <div className="absolute left-[50px] top-[50px]">
                <Link href="/">
                    <button className="flex items-center gap-[1rem]">
                        <span className="flex h-[40px] w-[40px] rotate-[180deg] items-center justify-center rounded-full bg-accent-green">
                            <ArrowIcon color="#22304D" />
                        </span>
                        BACK
                    </button>
                </Link>
            </div>
            {children}
        </div>
        <section className="container p-[75px_0_25px] md:p-[25px_0]">
            <div className="flex flex-col items-center gap-[50px]">
                <div className="linear-rect"></div>
                <div className="text-[14px] font-[500]">Powered by NUAH</div>
            </div>
        </section>
    </>
);
export default HappinessLayout;
