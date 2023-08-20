import { HTMLAttributes } from "react";

type Props = Omit<
    HTMLAttributes<HTMLOrSVGElement>,
    "width" | "height" | "viewBox" | "fill" | "xmlns"
>;
export const GradientIcon = (props: Props) => (
    <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect
            x="6.5"
            y="6.5"
            width="387"
            height="387"
            rx="193.5"
            stroke="url(#paint0_linear_4255_3822)"
            stroke-width="13"
        />
        <defs>
            <linearGradient
                id="paint0_linear_4255_3822"
                x1="400"
                y1="400"
                x2="0"
                y2="0"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#11F4D1" />
                <stop offset="1" stop-color="#7C1DCE" />
            </linearGradient>
        </defs>
    </svg>
);
