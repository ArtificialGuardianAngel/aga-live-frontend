import { Button } from "@/components";
import data from "../data/survey.json";
type Props = {
    onNext?: () => void;
};
export const Introduction = ({ onNext }: Props) => {
    return (
        <section className="flex flex-col items-center gap-[50px]">
            <div className="rounded-[100px] bg-white/5 px-[50px] py-[30px] text-[40px] font-extralight leading-[0.8]">
                The Hapiness Index
            </div>
            <div className="linear-rect"></div>
            <p className="max-w-[880px] text-center">{data.info}</p>
            <Button size="lg" onClick={onNext}>
                fill in the questionnaire
            </Button>
        </section>
    );
};
