import cn from "classnames";
import Table, { Column } from "../Table";
import WalletButton from "./WalletButton";
import { FC, useCallback, useContext, useEffect } from "react";
import {
    DenomList,
    Denoms,
    DenomsNative,
    DenomsStabe,
    useBalances,
    useCosmos,
    useOracles,
} from "@nuahorg/aga";
import Link from "next/link";
import WalletTabsContext from "@/context/WalletTabsContext";
import { MenuItems } from "@/utils/wallet";

interface IWalletData {
    name: string;
    balance: number;
    livePrice: number;
    lastChange: {
        type: "up" | "down";
        value: number;
    };
}

const MOCK_DATA: IWalletData[] = [
    {
        name: "USDn",
        balance: 0.0,
        livePrice: 1.0,
        lastChange: {
            type: "up",
            value: 0.9,
        },
    },
    {
        name: "USDn",
        balance: 0.0,
        livePrice: 1.0,
        lastChange: {
            type: "down",
            value: 0.9,
        },
    },
    {
        name: "USDn",
        balance: 0.0,
        livePrice: 1.0,
        lastChange: {
            type: "up",
            value: 0.9,
        },
    },
];

interface Props {
    type: "ALL" | "STABLE" | "NATIVE";
}

const WalletTable: FC<Props> = ({ type }) => {
    const { setKey } = useContext(WalletTabsContext);
    const { client } = useCosmos();
    const { price } = useOracles(undefined);
    const { balances } = useBalances();

    // const {} = use;
    const handleNaviagate = useCallback(
        (k: MenuItems) => {
            setKey(k);
        },
        [setKey],
    );

    // @ts-ignore
    const dataStable: IWalletData[] = Object.keys(DenomsStabe).map((denom) => ({
        name: DenomsStabe[denom as keyof typeof DenomsStabe],
        balance:
            Number(
                balances.find(
                    (b) =>
                        b.denom ===
                        DenomsStabe[(denom + "n") as keyof typeof DenomsStabe],
                )?.amount,
            ) || 0,
        lastChange: { value: -0.2, type: "up" },
        livePrice:
            price.find(
                (p) =>
                    p.denom === DenomsStabe[denom as keyof typeof DenomsStabe],
            )?.price || 0,
    }));
    const dataNative: IWalletData[] = Object.keys(DenomsNative).map(
        (denom) => ({
            name: DenomsNative[denom as keyof typeof DenomsNative],
            balance:
                Number(balances.find((b) => b.denom === denom)?.amount) || 0,
            lastChange: { value: -0.2, type: "up" },
            livePrice:
                price.find(
                    (p) =>
                        p.denom ===
                        DenomsNative[denom as keyof typeof DenomsNative],
                )?.price || 0,
        }),
    );

    const columns: Column<IWalletData>[] = [
        {
            width: 35,
        },
        {
            key: "name",
            title: "Name",
            width: 50,
        },
        {
            key: "balance",
            title: "Balance",
            render: (row) => (
                <div className="p-[13px_20px] text-[15px] font-[500]">
                    {row.balance.toFixed(2)}{" "}
                    <span className="text-[#D6E1FA]">(0.00 USDn)</span>
                </div>
            ),
        },
        {
            key: "livePrice",
            title: "Live price",
            width: 90,
            render: (row) => (
                <div className="p-[13px_20px] text-[15px] font-[500]">
                    {row.livePrice.toFixed(2)} USDn
                </div>
            ),
        },
        {
            key: "lastChange",
            title: "24h change",
            width: 80,
            render: (row) => (
                <div
                    className={cn("p-[13px_20px] text-[15px] font-[500]", {
                        ["text-accent-green"]: row.lastChange.type === "up",
                        ["text-[#FF6A85]"]: row.lastChange.type === "down",
                    })}
                >
                    {row.lastChange.value}%
                </div>
            ),
        },
        {
            title: "Action",
            width: 155,
            render: () => {
                return (
                    <div className="flex h-full items-center gap-[5px]">
                        <WalletButton
                            onClick={() =>
                                handleNaviagate(MenuItems.SEND_MONEY)
                            }
                        >
                            Send
                        </WalletButton>
                        <WalletButton
                            onClick={() =>
                                handleNaviagate(MenuItems.EXCHANGE_MONEY)
                            }
                        >
                            Exchange
                        </WalletButton>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            {(type === "ALL" || type === "STABLE") && (
                <>
                    <div className="wallet-table-header-bg rounded-[5px] p-[10px_20px] text-[13px] font-[700] uppercase leading-[calc(16/13)]">
                        STABLE
                    </div>
                    <Table columns={columns} data={dataStable} />
                </>
            )}
            {(type === "ALL" || type === "NATIVE") && (
                <>
                    <div className="wallet-table-header-bg rounded-[5px] p-[10px_20px] text-[13px] font-[700] uppercase leading-[calc(16/13)]">
                        NATIVE
                    </div>
                    <Table columns={columns} data={dataNative} />
                </>
            )}
        </div>
    );
};

export default WalletTable;
