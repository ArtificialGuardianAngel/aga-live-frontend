import type { Metadata } from "next";
import { Sora } from "next/font/google";
import cn from "classnames";
import { PropsWithChildren } from "react";
import { Button } from "@/components";
import { ArrowIcon } from "@/components/Icons";
import Link from "next/link";
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
);
export default HappinessLayout;
