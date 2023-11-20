import cn from "classnames";
import Table, { Column } from "../Table";
import WalletButton from "./WalletButton";
import { FC } from "react";

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
            width: 80,
            render: (row) => (
                <div className="p-[13px_20px] text-[15px] font-[500]">
                    {row.livePrice.toFixed(2)} {row.name}
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
                        <WalletButton>Send</WalletButton>
                        <WalletButton>Exchange</WalletButton>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <div className="wallet-table-header-bg rounded-[5px] p-[10px_20px] text-[13px] font-[700] uppercase leading-[calc(16/13)]">
                {type}
            </div>
            <Table columns={columns} data={MOCK_DATA} />
        </div>
    );
};

export default WalletTable;
