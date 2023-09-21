import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";

interface Props {
    size?: "sm" | "lg";
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    buttonContent?: React.ReactNode;
    buttonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;
    className?: string;
}

const Input: React.FC<
    Props & Omit<React.HTMLProps<HTMLInputElement>, "onChange" | "size">
> = ({
    size = "sm",
    value,
    onChange,
    placeholder,
    buttonContent,
    buttonProps,
    className,
    ...rest
}) => {
    return (
        <div
            className={cn(
                "max-[1365px]:gap-[10px] flex items-center gap-5 bg-white/10 text-white",
                className,
                {
                    ["max-[1365px]:h-[40px] max-[1365px]:p-[5px_5px_5px_15px] h-12 rounded-[35px] p-[10px_10px_10px_20px] text-sm font-medium"]:
                        size === "sm",
                    ["max-[767px]:h-[50px] h-15 rounded-lg p-[10px_10px_10px_25px] text-15"]:
                        size === "lg",
                },
            )}
        >
            <input
                className={cn(
                    "max-[1365] max-w-[calc(100%_-_38px)] flex-1 bg-transparent outline-none placeholder:text-blue-4",
                )}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                {...rest}
            />

            {buttonContent && (
                <button
                    {...buttonProps}
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full",
                        {
                            ["h-10 w-10 bg-white/10"]: size === "lg",
                            ["h-7 w-7 bg-accent-green"]: size === "sm",
                        },
                        buttonProps?.className,
                    )}
                >
                    {buttonContent}
                </button>
            )}
        </div>
    );
};

export default Input;
