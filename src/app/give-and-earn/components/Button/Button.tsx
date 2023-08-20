"use client";
import React from "react";
import cn from "classnames";

import styles from "./Button.module.scss";

type ButtonSize = "sm" | "md";

type ButtonVariant = "default" | "outline";

interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

type Props = ButtonProps &
    React.PropsWithChildren &
    React.HTMLProps<HTMLButtonElement>;

const Button: React.FC<Props> = ({
    children,
    size = "md",
    variant = "default",
    className,
    type,
    ...props
}) => {
    return (
        <button
            className={cn(styles.btn, styles[size], styles[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
