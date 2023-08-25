"use client";
import { useEffect } from "react";
import { useHappinessStore } from "../store";
import { HappinessCard } from "./card";
import { HappinessHeading } from "./heading";
import { GrowNumber } from "./grow-number";
import data from "../data/result.json";
import cn from "classnames";
import { GradientIcon } from "./gradient.icon";
import happinessApi from "@/api/happiness";

const getResultData = (v: number) => {
    return data.find((el) => v >= el.from && v <= el.to);
};

export const HappinessResult = () => {
    const result = useHappinessStore((s) => s.calculated_result);
    const calculate = useHappinessStore((s) => s.calculate_result);
    const question_answers = useHappinessStore(s => s.question_answers)
    const demographic_answers = useHappinessStore(s => s.demographic_answers)

    useEffect(() => {
        calculate();
    }, []);

    useEffect(() => {
        if (result > 0) {
            // send to backend
            happinessApi.submit(question_answers, demographic_answers)
        }
    }, [result])
    return (
        <HappinessCard>
            <HappinessHeading>Your result</HappinessHeading>
            <div
                className={cn(
                    "mb-[50px] flex items-center justify-center text-blue-5",
                )}
            >
                <div
                    className={cn(
                        "h-[400px] w-[400px] rounded-[50%] p-[10px] ",
                        "relative flex flex-col items-center justify-center gap-[30px]",
                    )}
                >
                    <GradientIcon className="absolute inset-0" />

                    <span className="text-[60px]">
                        <GrowNumber start={0} end={result} duration={2000} />
                    </span>
                    <span>{getResultData(result)?.title}</span>
                </div>
            </div>
            <div className="mb-[30px] text-center text-accent-green">
                {getResultData(result)?.subtitle}
            </div>
            <div className="text-center">{getResultData(result)?.details}</div>
        </HappinessCard>
    );
};
