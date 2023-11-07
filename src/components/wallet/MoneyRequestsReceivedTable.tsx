import dayjs from "dayjs";
import cn from "classnames";
import Table from "../Table";
import WalletButton from "./WalletButton";

const MOCK_DATA = [
    {
        date: new Date(),
        from: "user2@nuah.org",
        reason: "Money transfer",
        amount: "4 000,00 USDn",
        type: "Pending",
    },
    {
        date: new Date(),
        from: "user2@nuah.org",
        reason: "Money transfer",
        amount: "4 000,00 USDn",
        type: "Declined",
    },
    {
        date: new Date(),
        from: "user2@nuah.org",
        reason: "Money transfer",
        amount: "4 000,00 USDn",
        type: "Received",
    },
];

const MoneyRequestsReceivedTable = () => {
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
            key: "from",
            title: "From",
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
            render: (row: any) => {
                if (row.type === "Pending") {
                    return (
                        <div className="cell flex gap-[5px]">
                            <WalletButton color="green">Accept</WalletButton>
                            <WalletButton color="yellow">Decline</WalletButton>
                        </div>
                    );
                }

                return (
                    <div
                        className={cn("cell", {
                            ["text-[#E2AC6C]"]: row.type === "Declined",
                            ["text-[#11F4D1]"]: row.type === "Received",
                        })}
                    >
                        {row.type}
                    </div>
                );
            },
        },
    ];

    return <Table columns={columns} data={MOCK_DATA} />;
};

export default MoneyRequestsReceivedTable;
