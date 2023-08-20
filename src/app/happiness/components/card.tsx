import { PropsWithChildren } from "react";

export const HappinessCard = ({ children }: PropsWithChildren) => (
    <div className="w-[940px] rounded-[20px] bg-white/5 p-[70px] ">
        {children}
    </div>
);
