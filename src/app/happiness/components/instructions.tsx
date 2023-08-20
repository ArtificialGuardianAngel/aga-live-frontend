import { Button } from "@/components";
import { HappinessCard } from "./card";
import { HapinessDivider } from "./divider";
import { PropsWithChildren } from "react";

type Props = {
    onNext?: () => void;
};

const HT = ({ children }: PropsWithChildren) => (
    <span className="text-accent-green">{children}</span>
);

export const Instructions = ({ onNext }: Props) => {
    return (
        <HappinessCard>
            <h1 className="text-center text-[30px] font-light">Instructions</h1>
            <HapinessDivider />
            <p className="mb-[50px] text-center">
                Please answer the following questions on a scale from <HT>0</HT>{" "}
                to
                <HT>10</HT>, where 0 means <HT>not at all</HT> and 10 means{" "}
                <HT>completely</HT>. Your answers will be used to calculate a
                Happiness score, which will be a number with two digits after
                the comma.
            </p>
            <div className="flex justify-center">
                <Button size="lg" onClick={onNext}>
                    OK, let’s get started
                </Button>
            </div>
        </HappinessCard>
    );
};
