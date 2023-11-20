import dayjs from "dayjs";
import Table from "../Table";
import { useWindowSize } from "usehooks-ts";
import MobileTransactionsList from "./MobileTransactionsList";

const MOCK_DATA = [
    {
        key: new Date(),
        type: "Received",
    },
    {
        key: new Date(),
        type: "Exchange",
    },
    {
        key: new Date(),
        type: "Received",
    },
    {
        key: new Date(),
        type: "Exchange",
    },
    {
        key: new Date(),
        type: "Exchange",
    },
    {
        key: new Date(),
        type: "Received",
    },
];

const TransactionsTable = () => {
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
            key: "type",
            title: "Type",
        },
        {
            title: "From/To",
            render: (row: any) => (
                <div className="cell">
                    {row.type === "Received" ? "user2@nuah.org" : "-"}
                </div>
            ),
        },
        {
            key: "reason",
            title: "Reason",
            render: (row: any) => (
                <div className="cell">
                    {row.type === "Received" ? "Money transfer" : "-"}
                </div>
            ),
        },
        {
            title: "Amount",
            render: (row: any) => (
                <div className="cell">
                    {row.type === "Received" && (
                        <span className="text-accent-green">+10 NUAH</span>
                    )}
                    {row.type !== "Received" && (
                        <div className="flex flex-col gap-[10px]">
                            <div className="flex gap-[5px]">
                                <span className="w-[45px]">From:</span>
                                <span className="text-accent-green">
                                    10 NUAH
                                </span>
                            </div>
                            <div className="flex gap-[5px]">
                                <span className="w-[45px]">To:</span>
                                <span className="text-accent-green">
                                    15 NUAH+
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            ),
        },
    ];

    if (width <= 1024) {
        return <MobileTransactionsList />;
    }

    return <Table columns={columns} data={MOCK_DATA} />;
};

export default TransactionsTable;
