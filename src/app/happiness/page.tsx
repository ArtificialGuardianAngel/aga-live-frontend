"use client";
import { useState } from "react";
import { ProgressBar } from "./components/progress-bar";
import { QuestionSection } from "./components/question";
import { Stage } from "./components/stage";
import data from "./data/survey.json";
import { DemographicSection } from "./components/demographic";
import { Introduction } from "./components/introduction";
import { Sora } from "next/font/google";
import cn from "classnames";
import { Instructions } from "./components/instructions";
import { HappinessResult } from "./components/result";
import { useHappinessStore } from "./store";

const sora = Sora({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

const HappinesPage = () => {
    const [stage, setStage] = useState(-2);

    const onNext = () => {
        setStage((p) => p + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const onPrevious = () => {
        setStage((p) => p - 1);
    };
    return (
        <>
            {stage === -2 && <Introduction onNext={onNext} />}
            {stage === -1 && <Instructions onNext={onNext} />}
            {stage >= 0 && stage < data.questions.length && (
                <Stage
                    name={data.questions[stage].name}
                    questions={data.questions[stage].question}
                    progressBar={
                        <div className="mb-[50px]">
                            <ProgressBar
                                value={
                                    (stage / (data.questions.length - 1)) * 100
                                }
                            />
                        </div>
                    }
                    onNext={onNext}
                    onPrevious={stage === 0 ? undefined : onPrevious}
                />
            )}
            {stage === data.questions.length && (
                <DemographicSection
                    questions={data.demographic}
                    onNext={onNext}
                />
            )}
            {stage > data.questions.length && <HappinessResult />}
        </>
    );
};

export default HappinesPage;
