import { Question } from "@/types/survey";
import { QuestionSection } from "./question";
import { Button } from "@/components";
import { ReactNode } from "react";
import { HappinessCard } from "./card";
import { HappinessHeading } from "./heading";

type Props = {
    name: string;
    questions: Question[];
    progressBar: ReactNode;
    isNextButtonDisabled?: boolean;
    onNext?: () => void;
    onPrevious?: () => void;
};
export const Stage = ({
    name,
    questions,
    progressBar,
    isNextButtonDisabled,
    onNext,
    onPrevious,
}: Props) => {
    return (
        <HappinessCard>
            {progressBar}
            <HappinessHeading>{name}</HappinessHeading>
            {questions.map((q, j) => (
                <QuestionSection
                    key={`${name}-${j}`}
                    category={name}
                    index={j}
                    {...q}
                />
            ))}
            <div className="flex items-center justify-between">
                {onPrevious ? (
                    <Button size="lg" onClick={onPrevious}>
                        Previous
                    </Button>
                ) : (
                    <div />
                )}
                {onNext && (
                    <Button size="lg" onClick={onNext} disabled={isNextButtonDisabled}>
                        Next
                    </Button>
                )}
            </div>
        </HappinessCard>
    );
};
