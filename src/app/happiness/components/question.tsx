import { Question } from "@/types/survey";
import cn from "classnames";
import { HapinessDivider } from "./divider";
import { useHappinessStore } from "../store";

type Props = Question & { index: number; category: string };
export const QuestionSection = ({
    value,
    variants,
    index,
    category,
}: Props) => {
    const giverAnswers = useHappinessStore((s) => s.question_answers[category]);
    const add_answer = useHappinessStore((s) => s.add_question_answer);
    const answer = !giverAnswers ? undefined : giverAnswers[value];

    return (
        <>
            <section>
                <div className="mb-[30px]">
                    {index + 1} {value}
                </div>
                <div className="flex items-center justify-between">
                    <span>Not at all</span>
                    {variants.map((e, i) => (
                        <button
                            key={i}
                            onClick={() => add_answer(category, value, e)}
                            className={cn(
                                "flex h-[50px] w-[50px] items-center justify-center rounded-full hover:bg-accent-green/50",
                                {
                                    "bg-accent-green text-blue-6": e === answer,
                                    "bg-white/10": e !== answer,
                                },
                            )}
                        >
                            {e}
                        </button>
                    ))}
                    <span>Completely</span>
                </div>
                <HapinessDivider />
            </section>
        </>
    );
};
