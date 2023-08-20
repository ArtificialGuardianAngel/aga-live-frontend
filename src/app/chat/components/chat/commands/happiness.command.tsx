import Link from "next/link";
import { PropsWithChildren } from "react";

export const HappinessCommand = ({ children }: PropsWithChildren) => (
    <Link href={"/happiness"}>{children}</Link>
);
