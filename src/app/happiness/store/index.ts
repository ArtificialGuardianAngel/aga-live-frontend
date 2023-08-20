import { create } from "zustand";
type HappinessStore = {
    question_answers: Record<string, Record<string, any>>;
    demographic_answers: Record<string, string>;
    add_demographic_answer: (index: number, value: string) => void;
    add_question_answer: (
        category: string,
        question: string,
        answer: any,
    ) => void;
    calculated_result: number;
    calculate_result: () => void;
};
export const useHappinessStore = create<HappinessStore>((set) => ({
    question_answers: {},
    demographic_answers: {},
    calculated_result: 0,
    add_demographic_answer: (index: number, value: string) =>
        set((state) => ({
            demographic_answers: {
                ...state.demographic_answers,
                [index]: value,
            },
        })),
    add_question_answer: (category: string, question: string, answer: any) =>
        set((state) => ({
            question_answers: {
                ...state.question_answers,
                [category]: {
                    ...state.question_answers[category],
                    [question]: answer,
                },
            },
        })),
    calculate_result: () =>
        set((state) => {
            const categories = Object.keys(state.question_answers);
            if (categories.length === 0) return { calculated_result: 0 };
            const answers = categories.reduce<number[]>((r, key) => {
                const results = Object.keys(state.question_answers[key]).map(
                    (k) => state.question_answers[key][k] as number,
                );

                return r.concat(...results);
            }, []);
            console.log(answers);
            return {
                calculated_result:
                    answers.reduce((r, i) => r + i) / answers.length,
            };
        }),
}));
