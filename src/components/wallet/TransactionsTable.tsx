import dayjs from "dayjs";
import Table from "../Table";
import { useWindowSize } from "usehooks-ts";
import MobileTransactionsList from "./MobileTransactionsList";
import { useGetTxns } from "@/app/wallet/txns/use-get-txns";
import { DenomList } from "@nuahorg/aga";
import truncate from "@/utils/truncate";

const TransactionsTable = () => {
    const { width } = useWindowSize();
    const { data } = useGetTxns();

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
                    {truncate(row.from)} {row.to && `> ${truncate(row.to)}`}
                </div>
            ),
        },
        {
            title: "Amount",
            render: (row: any) => (
                <div className="cell">
                    <div className="flex flex-col gap-[10px]">
                        {row.spent.length > 0 && (
                            <div className="flex gap-[5px]">
                                <span className="text-accent-green">
                                    {row.spent.map((transfer: any) => {
                                        return (
                                            <>
                                                {transfer.amount}{" "}
                                                {
                                                    DenomList[
                                                        transfer.denom as keyof typeof DenomList
                                                    ]
                                                }
                                            </>
                                        );
                                    })}
                                </span>
                            </div>
                        )}
                        {row.received.length > 0 && (
                            <div className="flex gap-[5px]">
                                <span className="text-accent-green">
                                    {row.received.map((transfer: any) => {
                                        return (
                                            <>
                                                {transfer.amount}{" "}
                                                {
                                                    DenomList[
                                                        transfer.denom as keyof typeof DenomList
                                                    ]
                                                }
                                            </>
                                        );
                                    })}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            ),
        },
    ];

    if (width <= 1024) {
        return <MobileTransactionsList />;
    }
    console.log(data);

    return (
        <Table
            columns={columns}
            data={data.map((tx) => ({
                from: tx.from,
                to: tx.to,
                type: tx.type,
                date: tx.date,
                spent: tx.coin_transfer.filter((el) => el.amount < 0),
                received: tx.coin_transfer.filter((el) => el.amount > 0),
                // date: tx.body?.extensionOptions[0].
            }))}
        />
    );
};

export default TransactionsTable;
