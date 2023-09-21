"use client";
import React, { useState } from "react";
import cn from "classnames";
import { TriangleArrowIcon } from "./Icons";

interface Props {
    question: string;
    answer: string;
}

const FaqCard: React.FC<Props> = ({ question, answer }) => {
    const [opened, setOpened] = useState<boolean>(false);

    return (
        <div className="rounded-[10px] bg-white/[0.03] shadow-lg">
            <div className="wishes-xs:p-[30px_20px] flex items-center gap-[20px] p-[30px] font-bold">
                <span className="wishes-xs:text-[15px] flex-1">{question}</span>
                <button
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/10"
                    onClick={() => setOpened((prev) => !prev)}
                >
                    <span
                        className={cn("transition-all", {
                            ["rotate-90"]: !opened,
                            ["rotate-[-90deg]"]: opened,
                        })}
                    >
                        <TriangleArrowIcon color="#D6E1FA" />
                    </span>
                </button>
            </div>

            {opened && (
                <div className="wishes-xs:p-[0_20px_30px] max-[480px]:text-[15px] p-[0_30px_30px] text-blue-5">
                    {answer.split("\n").map((el, i, { length }) => (
                        <React.Fragment key={i}>
                            {el}
                            {i < length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FaqCard;
