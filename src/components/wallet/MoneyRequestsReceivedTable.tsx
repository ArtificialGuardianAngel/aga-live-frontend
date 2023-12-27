import dayjs from "dayjs";
import cn from "classnames";
import Table from "../Table";
import WalletButton from "./WalletButton";
import { useWindowSize } from "usehooks-ts";
import MobileMoneyRequestsList from "./MobileMoneyRequestsList";
import { useEffect, useState, useCallback, useMemo } from "react";
import { DenomList, useCosmos, usePreparedTransaction } from "@nuahorg/aga";
import { QueryGetRequestBookResponse } from "@nuahorg/aga/dist/stargate/proto/nuah/loan/query";
import { SigningStargateClient } from "@cosmjs/stargate";
import { MsgAcceptRequest } from "@nuahorg/aga/dist/stargate/proto/nuah/loan/tx";
import {
    MsgAcceptRequestEncodeObject,
    MsgDeclineRequestEncodeObject,
} from "@nuahorg/aga/dist/stargate/modules";

const truncate = (value: string, start = 9, end = 3) =>
    `${value.slice(0, start)}...${value.slice(
        value.length - end,
        value.length,
    )}`;

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

const MoneyRequestsReceivedTable = () => {
    const { width } = useWindowSize();
    const { queryClient, currentAccount, client } = useCosmos();
    const [requestBook, setRequestBook] =
        useState<QueryGetRequestBookResponse>();

    const [addresses, setAddresses] = useState<string[]>([]);
    const [nameMap, setNameMap] = useState<Map<string, string>>();
    const { executeSync, status, message } = usePreparedTransaction({
        fee: { amount: "1", denom: "nuahp" },
    });

    const [id, setId] = useState(-1);

    const getRequestBook = useCallback(async () => {
        try {
            if (!currentAccount?.address)
                throw new Error("You're not connected");

            const book = await queryClient?.loan.getRequesBookByAddress(
                currentAccount.address,
            );
            if (book) {
                setRequestBook(book);
                setAddresses(
                    book.requestBook?.book?.requests.map((v) => v.creator) ||
                        [],
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

    const handleAccept = async (
        id: number,
        to: string,
        amount: number,
        denom: string,
    ) => {
        setId(id);
        try {
            if (!client || !(client instanceof SigningStargateClient))
                throw new Error("Bad client");
            if (!currentAccount) throw new Error("Bad client");

            await executeSync([
                {
                    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                    value: {
                        fromAddress: currentAccount.address,
                        toAddress: to,
                        amount: [{
                            amount: amount.toString(),
                            denom: denom
                        }],
                    },
                },
                {
                    typeUrl: "/nuah.loan.MsgAcceptRequest",
                    value: { creator: currentAccount.address, id },
                },
            ]);
        } catch (error) {}
    };
    const handleDecline = async (id: number, ...rest: any) => {
        setId(id);
        try {
            if (!client || !(client instanceof SigningStargateClient))
                throw new Error("Bad client");
            if (!currentAccount) throw new Error("Bad client");

            await executeSync<MsgDeclineRequestEncodeObject>([
                {
                    typeUrl: "/nuah.loan.MsgDeclineRequest",
                    value: { creator: currentAccount.address, id },
                },
            ]);
        } catch (error) {}
    };

    const columns = useMemo(
        () => [
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
                render: (row: { transferArgs: [number, string, number, string]; type: string }) => {
                    if (row.type === "Pending") {
                        return (
                            <div className="cell flex gap-[5px]">
                                <WalletButton
                                    color="green"
                                    onClick={() =>
                                        handleAccept(...row.transferArgs)
                                    }
                                    disabled={
                                        status === "pending" &&
                                        row.transferArgs[0] === id
                                    }
                                >
                                    Accept
                                </WalletButton>
                                <WalletButton
                                    color="yellow"
                                    onClick={() =>
                                        handleDecline(...row.transferArgs)
                                    }
                                    disabled={
                                        status === "pending" &&
                                        row.transferArgs[0] === id
                                    }
                                >
                                    Decline
                                </WalletButton>
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
        ],
        [status, id],
    );

    useEffect(() => {
        if (status === "idle" || status === "success") {
            getRequestBook();
        }
    }, [getRequestBook, status]);

    useEffect(() => {
        if (addresses.length > 0) makeAddressNameMap(addresses);
    }, [addresses, makeAddressNameMap]);

    if (width < 1366) {
        return <MobileMoneyRequestsList />;
    }

    return (
        <>
            <Table
                columns={columns}
                data={
                    requestBook?.requestBook?.book?.requests.map((r) => ({
                        date: Date.now(),
                        from: nameMap?.get(r.creator) || truncate(r.creator),
                        reason: "Money transfer",
                        amount: `${r.amount} ${
                            DenomList[r.denom as keyof typeof DenomList]
                        }`,

                        transferArgs: [r.id, r.creator, r.amount, r.denom],
                        type: getStatus(r),
                    })) || []
                }
            />
            {status !== "pending" && (
                <div
                    className={cn({
                        "text-red-500": status === "failed",
                        "text-accent-green": status === "success",
                    })}
                >
                    {message}
                </div>
            )}
        </>
    );
};

export default MoneyRequestsReceivedTable;
