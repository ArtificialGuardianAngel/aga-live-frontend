"use client";

import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { MenuItems } from "@/utils/wallet";
import WalletTabsContext from "@/context/WalletTabsContext";
import { useWindowSize } from "usehooks-ts";

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
    const { width } = useWindowSize();

    const [openedKey, setOpenedKey] = useState<MenuItems | null>(
        MenuItems.WALLET_ALL,
    );
    const [mobileMenuOpened, setMobileMenuOpened] = useState(
        () => width > 1024,
    );

    const { key: selectedTabKey, setKey: setSelectedTabKey } =
        useContext(WalletTabsContext);

    const selectedTabText = useMemo(() => {
        for (const firstLevelItem of MENU) {
            if (firstLevelItem.key === selectedTabKey) {
                return firstLevelItem.name;
            }

            if (firstLevelItem.children) {
                for (const secondLevelItem of firstLevelItem.children) {
                    if (secondLevelItem.key === selectedTabKey) {
                        return `${firstLevelItem.name}: ${secondLevelItem.name}`;
                    }
                }
            }
        }
    }, [selectedTabKey]);

    useEffect(() => {
        if (width > 1024) {
            setMobileMenuOpened(true);
        } else {
            setMobileMenuOpened(false);
        }
    }, [width]);

    const toggleMenuOpened = () => {
        setMobileMenuOpened((prev) => !prev);
    };

    const onMenuItemClick = (
        key: MenuItems,
        hasChildren: boolean,
        nested: boolean,
    ) => {
        if (hasChildren) {
            setOpenedKey(key);
            if (MENU[key]?.children?.[0].key) {
                return setSelectedTabKey(MENU[key].children![0].key);
            }
            return setSelectedTabKey(key);
        }

        if (!nested) {
            setOpenedKey(null);
        }

        if (width <= 1024) {
            setMobileMenuOpened(false);
        }
        setSelectedTabKey(key);
    };

    return (
        <div className="relative p-[70px_20px_20px] bp-1336:p-[70px_10px_20px_10px] bp-1024:p-[30px_30px_0] bp-480:p-[20px_20px_0]">
            <div
                className="hidden cursor-pointer rounded-[5px] bg-[#3D4B72] p-[20px] text-[15px] font-[500] uppercase text-accent-green bp-1024:block"
                onClick={toggleMenuOpened}
            >
                {selectedTabText}
            </div>
            {mobileMenuOpened && (
                <div className="z-50 flex w-[300px] flex-col gap-[5px] overflow-hidden bp-1336:w-[230px] bp-1024:absolute bp-1024:left-[30px] bp-1024:w-[calc(100%-60px)] bp-1024:gap-0 bp-1024:rounded-[3px] bp-480:left-[20px] bp-480:w-[calc(100%-40px)]">
                    {MENU.map((item) => (
                        <Fragment key={item.key}>
                            <div
                                className={cn(
                                    "cursor-pointer rounded-[10px] bg-white/[0.03] p-[15px_20px] text-[12px] font-[700] uppercase leading-[calc(8/12)] bp-1024:rounded-none bp-1024:border-b-[1px] bp-1024:border-t-[1px] bp-1024:border-white/5 bp-1024:bg-[#334168] bp-1024:p-[20px]",
                                    {
                                        ["text-accent-green"]:
                                            item.key === selectedTabKey ||
                                            item.key === openedKey,
                                    },
                                )}
                                onClick={() =>
                                    onMenuItemClick(
                                        item.key,
                                        !!item.children,
                                        false,
                                    )
                                }
                            >
                                {item.name}
                            </div>
                            {item.key === openedKey && (
                                <div className="p-[10px] bp-1024:bg-[#334168] bp-1024:p-[0_20px_0_40px]">
                                    {item.children?.map((subItem) => (
                                        <div
                                            key={subItem.key}
                                            className={cn(
                                                "cursor-pointer p-[10px_40px] text-[12px] font-[700] uppercase leading-[calc(8/12)] bp-1024:border-b-[1px] bp-1024:border-t-[1px] bp-1024:border-white/5 bp-1024:p-[20px_0]",
                                                {
                                                    ["text-accent-green"]:
                                                        subItem.key ===
                                                        selectedTabKey,
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
            )}
        </div>
    );
};

export default WalletNavbar;
