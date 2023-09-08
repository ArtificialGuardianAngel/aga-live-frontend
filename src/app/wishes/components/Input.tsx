import React, { InputHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

type Props = InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<Props> = ({ className, ...props }) => {
    return (
        <input
            className={cn(
                className,
                "rounded-[4px] bg-card p-[20px_25px] text-[16px] leading-[calc(12/16)] text-accent-green outline-none placeholder:text-[rgba(255,255,255,0.5)]",
                "disabled:text-accent-green/50",
            )}
            {...props}
        ></input>
    );
};

export default Input;
