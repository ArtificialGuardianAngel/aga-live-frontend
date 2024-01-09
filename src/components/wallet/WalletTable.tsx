import cn from "classnames";
import Table, { Column } from "../Table";
import WalletButton from "./WalletButton";
import { FC } from "react";
import {
    DenomsNative,
    DenomsStabe,
    useBalances,
    useOracles,
} from "@nuahorg/aga";
import Link from "next/link";

interface IWalletData {
    name: string;
    denom: string;
    balance: number;
    livePrice: number;
    lastChange: {
        type: "up" | "down";
        value: number;
    };
}

interface Props {
    type: "ALL" | "STABLE" | "NATIVE";
}

const WalletTable: FC<Props> = ({ type }) => {
    const { price } = useOracles(undefined);
    const { balances } = useBalances();

    const dataStable: IWalletData[] = Object.keys(DenomsStabe).map((denom) => ({
        name: DenomsStabe[denom as keyof typeof DenomsStabe],
        denom,
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
            denom,
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
                <div className="p-[13px_20px] text-[15px]  font-[500] wishes-sm:p-[5px_10px]">
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
                <div className="p-[13px_20px] text-[15px] font-[500] wishes-sm:p-[5px_10px]">
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
                    className={cn(
                        "p-[13px_20px] text-[15px]  font-[500] wishes-sm:p-[5px_10px]",
                        {
                            ["text-accent-green"]: row.lastChange.type === "up",
                            ["text-[#FF6A85]"]: row.lastChange.type === "down",
                        },
                    )}
                >
                    {row.lastChange.value}%
                </div>
            ),
        },
        {
            title: "Action",
            width: 155,
            render: (row) => {
                return (
                    <div className="flex h-full items-center gap-[5px]">
                        <Link href={`/wallet/send?denom=${row.denom}`}>
                            <WalletButton>Send</WalletButton>
                        </Link>
                        <Link href={`/wallet/exchange?from=${row.denom}`}>
                            <WalletButton>Exchange</WalletButton>
                        </Link>
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
