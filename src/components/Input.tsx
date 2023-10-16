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
                "flex items-center justify-between gap-5 bg-white/10 text-white wishes-xl:gap-[10px]",
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
                    "min-w-[100px] max-w-[calc(100%_-_38px)] bg-transparent outline-none placeholder:text-blue-4",
                )}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                {...rest}
            />

            {buttonContent && (
                <div>
                    <button
                        {...buttonProps}
                        className={cn(
                            "flex h-10 w-10 flex-1 items-center justify-center rounded-full",
                            {
                                ["h-10 w-10 bg-white/10"]: size === "lg",
                                ["h-7 w-7 bg-accent-green"]: size === "sm",
                            },
                            buttonProps?.className,
                        )}
                    >
                        {buttonContent}
                    </button>
                </div>
            )}
        </div>
    );
};
export const TextArea: React.FC<
    Props &
        Omit<
            React.TextareaHTMLAttributes<HTMLTextAreaElement>,
            "onChange" | "size"
        >
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
                "flex items-center gap-5 bg-white/10 text-white wishes-xl:gap-[10px]",
                className,
                {
                    ["h-12 rounded-[35px] p-[10px_10px_10px_20px] text-sm font-medium wishes-xl:h-[40px] wishes-xl:p-[5px_5px_5px_15px]"]:
                        size === "sm",
                    ["h-15 rounded-lg p-[10px_10px_10px_25px] text-15 wishes-md:h-[50px]"]:
                        size === "lg",
                },
            )}
        >
            <textarea
                rows={value?.split("\n").length}
                className={cn(
                    "max-w-[calc(100%_-_38px)] flex-1 bg-transparent outline-none placeholder:text-blue-4",
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
