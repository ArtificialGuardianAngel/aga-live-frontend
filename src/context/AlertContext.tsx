"use client";
import cn from "classnames";
import {
    PropsWithChildren,
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";
import { createPortal } from "react-dom";

type AlertType = "info" | "success" | "warn" | "error";

interface IAlertContext {
    toggle: (data?: { message: string; type: AlertType }) => void;
    close: () => void;
}

export const AlertContext = createContext<IAlertContext>({
    toggle: () => {},
    close: () => {},
});

const AlertContainer = ({
    message,
    type,
}: {
    message?: string;
    type: AlertType;
}) => {
    return (
        <div
            className={cn(
                "fixed bottom-[20px] left-[10px] right-[10px] rounded-[5px] border px-[30px] py-[15px] text-sm",
                {
                    "border-blue-400/95 bg-blue-400/25 text-blue-400/95":
                        type === "info",
                    "border-orange-400/95 bg-orange-400/25 text-orange-400/95":
                        type === "warn",
                    "border-accent-green/95 bg-accent-green/25 text-accent-green/95":
                        type === "success",
                    "border-red-400/95 bg-red-400/25 text-red-400/95":
                        type === "error",
                },
            )}
        >
            {message}
        </div>
    );
};

export const AlertProvider = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [type, setType] = useState<AlertType>("info");

    const toggle: IAlertContext["toggle"] = useCallback((data) => {
        if (!data) return setOpen((p) => !p);
        setMessage(data.message);
        setType(data.type);
        setOpen(true);
    }, []);

    const close = useCallback(() => {
        setOpen(false);
    }, []);

    useEffect(() => {
        if (!open) return;
        const ti = setTimeout(() => {
            setOpen(false);
        }, 6000);
        return () => clearTimeout(ti);
    }, [open]);

    return (
        <AlertContext.Provider value={{ toggle, close }}>
            {children}
            {open &&
                createPortal(
                    <AlertContainer type={type} message={message} />,
                    document.body,
                )}
        </AlertContext.Provider>
    );
};
