import dayjs from "dayjs";
import cn from "classnames";
import Table from "../Table";
import { useWindowSize } from "usehooks-ts";
import MobileMoneyRequestsList from "./MobileMoneyRequestsList";
import { useCallback, useEffect, useState } from "react";
import { QueryGetMadenRequestsResponse } from "@nuahorg/aga/dist/stargate/proto/nuah/loan/query";
import { DenomList, useCosmos } from "@nuahorg/aga";
import truncate from "@/utils/truncate";

const getStatus = (r: any) => {
    if (r.accepted === -1) {
        return "Pending";
    }
    if (r.accepted === 0) {
        return "Decliend";
    }
    if (r.accepted === 1) {
        return "Accepted";
    }
    return "Pending";
};

const MoneyRequestsSentTable = () => {
    const { width } = useWindowSize();
    const { queryClient, currentAccount, client } = useCosmos();
    const [requestBook, setRequestBook] =
        useState<QueryGetMadenRequestsResponse>();

    const [addresses, setAddresses] = useState<string[]>([]);
    const [nameMap, setNameMap] = useState<Map<string, string>>();

    const [id, setId] = useState(-1);

    const getRequestBook = useCallback(async () => {
        try {
            if (!currentAccount?.address)
                throw new Error("You're not connected");

            const book = await queryClient?.loan.getMadenRequests(
                currentAccount.address,
            );
            if (book) {
                setRequestBook(book);
                setAddresses(
                    (book.requests?.map((v) => v.index) || []).concat(
                        currentAccount.address,
                    ),
                );
            }
        } catch (error) {
            console.log(error);
        }
    }, [currentAccount, queryClient]);

    const makeAddressNameMap = useCallback(
        async (addresses: string[]) => {
            try {
                const names = await Promise.allSettled(
                    addresses.map(
                        async (address) =>
                            queryClient?.nameservice.getNameByAddress(address),
                    ),
                );
                const data: Map<string, string> = new Map();

                names
                    .filter((v) => v.status === "fulfilled")
                    .forEach((name) => {
                        if (name.status === "fulfilled") {
                            if (name.value?.whoisByValue)
                                data.set(
                                    name.value.whoisByValue.index,
                                    name.value.whoisByValue.whoisIndex,
                                );
                        }
                    });
                setNameMap(data);
            } catch (error) {}
        },
        [queryClient],
    );
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

    useEffect(() => {
        getRequestBook();
    }, [getRequestBook]);

    useEffect(() => {
        if (addresses.length > 0) makeAddressNameMap(addresses);
    }, [addresses, makeAddressNameMap]);

    if (width < 1366) {
        return <MobileMoneyRequestsList />;
    }

    return (
        <Table
            columns={columns}
            data={
                requestBook?.requests.flatMap((r) => {
                    if (!r.book) return [];
                    return r.book.requests.map((request) => ({
                        date: Date.now(),
                        to: nameMap?.get(r.index) || truncate(r.index),
                        reason: "Money transfer",
                        amount: `${request.amount} ${
                            DenomList[request.denom as keyof typeof DenomList]
                        }`,
                        type: getStatus(r),
                    }));
                }) || []
            }
        />
    );
};

export default MoneyRequestsSentTable;
