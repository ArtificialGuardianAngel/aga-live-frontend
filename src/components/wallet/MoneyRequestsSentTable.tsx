import dayjs from "dayjs";
import cn from "classnames";
import Table from "../Table";
import { useWindowSize } from "usehooks-ts";
import MobileMoneyRequestsList from "./MobileMoneyRequestsList";

const MOCK_DATA = [
    {
        date: new Date(),
        to: "user2@nuah.org",
        reason: "Money transfer",
        amount: "4 000,00 USDn",
        type: "Pending",
    },
    {
        date: new Date(),
        to: "user2@nuah.org",
        reason: "Money transfer",
        amount: "4 000,00 USDn",
        type: "Declined",
    },
    {
        date: new Date(),
        to: "user2@nuah.org",
        reason: "Money transfer",
        amount: "4 000,00 USDn",
        type: "Received",
    },
];

const MoneyRequestsSentTable = () => {
    const { width } = useWindowSize();

    const columns = [
        {
            key: "date",
            title: "Date",
            render: (row: any) => (
                <div className="cell">
                    {dayjs(row.date).format("DD.MM.YYYY")}
                </div>
            ),
        },
        {
            key: "to",
            title: "To",
        },
        {
            key: "reason",
            title: "Reason",
        },
        {
            key: "amount",
            title: "Amount",
            render: (row: any) => {
                return (
                    <div
                        className={cn("cell", {
                            ["text-[#D6E1FA]"]: row.type === "Pending",
                            ["text-[#E2AC6C]"]: row.type === "Declined",
                            ["text-[#11F4D1]"]: row.type === "Received",
                        })}
                    >
                        {row.amount}
                    </div>
                );
            },
        },
        {
            key: "type",
            title: "Pending",
            render: (row: any) => (
                <div
                    className={cn("cell", {
                        ["text-[#D6E1FA]"]: row.type === "Pending",
                        ["text-[#E2AC6C]"]: row.type === "Declined",
                        ["text-[#11F4D1]"]: row.type === "Received",
                    })}
                >
                    {row.type}
                </div>
            ),
        },
    ];

    if (width < 1366) {
        return <MobileMoneyRequestsList />;
    }

    return <Table columns={columns} data={MOCK_DATA} />;
};

export default MoneyRequestsSentTable;
