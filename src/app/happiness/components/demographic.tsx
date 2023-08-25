import { Question } from "@/types/survey";
import { HappinessCard } from "./card";
import { HappinessHeading } from "./heading";
import { HapinessDivider } from "./divider";
import { DemographicQuestion } from "./demographic.question";
import { useHappinessStore } from "../store";
import { Button } from "@/components";
import Link from "next/link";

type Props = {
    questions: { value: string; variants: string[] }[];
    isNextButtonDisabled?: boolean;
};
export const DemographicSection = ({
    questions,
    isNextButtonDisabled,
}: Props) => {
    return (
        <HappinessCard>
            <HappinessHeading>Demographics</HappinessHeading>
            <div className="text-center">
                Please, give us some information about you to complete and get
                your result of the questionnaire.
            </div>
            <HapinessDivider />
            <ol>
                {questions.map((q, i) => (
                    <DemographicQuestion key={i} {...q} index={i} />
                ))}
            </ol>
            <HapinessDivider />
            <div className="flex items-center justify-center">
                <Link href="/happiness/result">
                    <Button disabled={isNextButtonDisabled} size="lg">Ok, done</Button>
                </Link>
            </div>
        </HappinessCard>
    );
};
