"use client";

import { FC, PropsWithChildren, createContext, useState } from "react";
import { MenuItems } from "../utils/wallet";

interface IWalletTabsContext {
    key: MenuItems;
    setKey: (key: MenuItems) => void;
}

const defaultValue: IWalletTabsContext = {
    key: 1,
    setKey: () => {},
};

const WalletTabsContext = createContext<IWalletTabsContext>(defaultValue);

export const WalletTabsContextProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const [selectedTabKey, setSelectedTabKey] = useState<MenuItems>(
        MenuItems.WALLET_ALL,
    );

    return (
        <WalletTabsContext.Provider
            value={{ key: selectedTabKey, setKey: setSelectedTabKey }}
        >
            {children}
        </WalletTabsContext.Provider>
    );
};

export default WalletTabsContext;
