"use client";

import { Fragment, useContext, useState } from "react";
import cn from "classnames";
import { MenuItems } from "@/utils/wallet";
import WalletTabsContext from "@/context/WalletTabsContext";

const MENU = [
    {
        key: MenuItems.WALLET,
        name: "Wallet",
        children: [
            {
                key: MenuItems.WALLET_ALL,
                name: "All",
            },
            {
                key: MenuItems.WALLET_STABLE,
                name: "Stable",
            },
            {
                key: MenuItems.WALLET_NATIVE,
                name: "Native",
            },
        ],
    },
    {
        key: MenuItems.EXCHANGE_MONEY,
        name: "Exchange money",
    },
    {
        key: MenuItems.SEND_MONEY,
        name: "Send money",
    },
    {
        key: MenuItems.REQUEST_MONEY,
        name: "Request money",
    },
    {
        key: MenuItems.GET_MONEY,
        name: "Get money",
    },
    {
        key: MenuItems.TRANSACTIONS,
        name: "Transactions",
    },
    {
        key: MenuItems.MONEY_REQUESTS,
        name: "Money requests",
        children: [
            {
                key: MenuItems.MONEY_REQUESTS_SENT,
                name: "Sent",
            },
            {
                key: MenuItems.MONEY_REQUESTS_RECEIVED,
                name: "Received",
            },
        ],
    },
    {
        key: MenuItems.LOGINS,
        name: "Logins",
    },
];

const WalletNavbar = () => {
    const [openedKey, setOpenedKey] = useState<MenuItems | null>(
        MenuItems.WALLET_ALL,
    );
    const { key: selectedTabKey, setKey: setSelectedTabKey } =
        useContext(WalletTabsContext);

    const onMenuItemClick = (
        key: MenuItems,
        hasChildren: boolean,
        nested: boolean,
    ) => {
        if (hasChildren) {
            return setOpenedKey(key);
        }

        if (!nested) {
            setOpenedKey(null);
        }

        setSelectedTabKey(key);
    };

    return (
        <div className="flex w-[300px] flex-col gap-[5px] p-[70px_20px_20px]">
            {MENU.map((item) => (
                <Fragment key={item.key}>
                    <div
                        className={cn(
                            "cursor-pointer rounded-[10px] bg-white/[0.03] p-[15px_20px] text-[12px] font-[700] uppercase leading-[calc(8/12)]",
                            {
                                ["text-accent-green"]:
                                    item.key === selectedTabKey ||
                                    item.key === openedKey,
                            },
                        )}
                        onClick={() =>
                            onMenuItemClick(item.key, !!item.children, false)
                        }
                    >
                        {item.name}
                    </div>
                    {item.key === openedKey && (
                        <div className="p-[10px]">
                            {item.children?.map((subItem) => (
                                <div
                                    key={subItem.key}
                                    className={cn(
                                        "cursor-pointer p-[10px_40px] text-[12px] font-[700] uppercase leading-[calc(8/12)]",
                                        {
                                            ["text-accent-green"]:
                                                subItem.key === selectedTabKey,
                                        },
                                    )}
                                    onClick={() =>
                                        onMenuItemClick(
                                            subItem.key,
                                            false,
                                            true,
                                        )
                                    }
                                >
                                    {subItem.name}
                                </div>
                            ))}
                        </div>
                    )}
                </Fragment>
            ))}
        </div>
    );
};

export default WalletNavbar;
