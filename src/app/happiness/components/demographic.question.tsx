"use client";
import React, { useState } from "react";
import cn from "classnames";
import { ArrowDownIcon } from "./arrow-down.icon";
import { Question } from "@/types/survey";
import { useHappinessStore } from "../store";

type Props = { index: number } & Question;

const Variants = ({
    variants,
    expanded,
    answer,
    onSelect,
}: {
    variants: string[];
    expanded: boolean;
    answer?: string;
    onSelect: (v: string) => void;
}) => {
    if (!expanded) return null;
    return (
        <div className="absolute left-0 right-0 top-[calc(100%_+_5px)] z-10 flex max-h-[300px] flex-col gap-[30px] overflow-y-scroll rounded-[5px] bg-blue-7 p-[25px] scrollbar">
            {variants.map((v) => (
                <div
                    key={v}
                    className={cn("hover:text-accent-green/50", {
                        "text-accent-green": answer === v,
                    })}
                    onClick={() => onSelect(v)}
                >
                    {v}
                </div>
            ))}
        </div>
    );
};
export const DemographicQuestion = ({ value, variants, index }: Props) => {
    const answer = useHappinessStore((s) => s.demographic_answers[index]);
    const add_answer = useHappinessStore((s) => s.add_demographic_answer);
    const [expanded, setExpanded] = useState(false);
    return (
        <li
            className="relative mb-[5px] flex cursor-pointer items-center justify-between rounded-[5px] bg-white/[3%] p-[25px]"
            onClick={() => setExpanded((p) => !p)}
        >
            <span className={cn({ "text-white/50": !answer })}>{value}</span>
            <ArrowDownIcon
                className="transition-transform duration-500"
                style={expanded ? { transform: "rotateX(180deg)" } : undefined}
            />
            <Variants
                variants={variants}
                expanded={expanded}
                onSelect={(v) => add_answer(index, v)}
                answer={answer}
            />
        </li>
    );
};
