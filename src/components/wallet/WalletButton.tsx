import { FC, HTMLProps, PropsWithChildren } from "react";
import cn from "classnames";

interface ButtonProps {
    sz?: "sm" | "lg";
    color?: "blue" | "green" | "yellow";
}

type Props = ButtonProps & PropsWithChildren & HTMLProps<HTMLButtonElement>;

const WalletButton: FC<Props> = ({
    children,
    className,
    sz = "sm",
    color = "blue",
    type,
    ...props
}) => {
    return (
        <button
            className={cn(
                "cursor-pointer uppercase disabled:cursor-not-allowed disabled:opacity-20",
                {
                    ["rounded-[30px] p-[8px_15px] text-[11px] font-[600]"]:
                        sz === "sm",
                    ["rounded-[55px] p-[20px_25px] text-[14px] font-[600]"]:
                        sz === "lg",
                    ["bg-[#3D4B72] text-[#D6E1FA]"]: color === "blue",
                    ["bg-[#11F4D1] text-[#263146]"]: color === "green",
                    ["bg-[#E2AC6C] text-[#3D4B72]"]: color === "yellow",
                },
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default WalletButton;
