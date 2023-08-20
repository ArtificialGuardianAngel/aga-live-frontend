import { PropsWithChildren } from "react";
import { HapinessDivider } from "./divider";

export const HappinessHeading = ({ children }: PropsWithChildren) => (
    <>
        <h1 className="text-center text-[30px] font-bold text-accent-green">
            {children}
        </h1>
        <HapinessDivider />
    </>
);
