"use client";
import React, { createContext, useCallback, useState } from "react";

interface INotificationsContext {
    notifications: string[];
    addNotification: (message: string) => void;
}

const defaultContext: INotificationsContext = {
    notifications: [],
    addNotification: () => undefined,
};

const NotificationsContext =
    createContext<INotificationsContext>(defaultContext);

export const NotificationsContextProvider: React.FC<
    React.PropsWithChildren
> = ({ children }) => {
    const [notifications, setNotifications] = useState<string[]>([]);

    const addNotification = useCallback((message: string) => {
        setNotifications((prev) => [...prev, message]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((item) => item !== message));
        }, 10 * 1000);
    }, []);

    return (
        <NotificationsContext.Provider
            value={{ notifications, addNotification }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};

export default NotificationsContext;
