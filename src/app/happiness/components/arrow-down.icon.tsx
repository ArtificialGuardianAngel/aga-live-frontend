import { HTMLAttributes } from "react";

type Props = Omit<
    HTMLAttributes<HTMLOrSVGElement>,
    "children" | "width" | "height" | "viewBox" | "fill" | "xmlns"
>;
export const ArrowDownIcon = (props: Props) => (
    <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M11 1.47314L5.94624 6.52691L1 1.47314"
            stroke="white"
            strokeOpacity="0.5"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
