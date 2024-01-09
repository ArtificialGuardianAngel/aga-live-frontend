import { useAlert } from "@/hooks/use-alert";
import { DecodeObject, decodeTxRaw } from "@cosmjs/proto-signing";
import {
    QueryClient,
    SigningStargateClient,
    StargateClient,
    createProtobufRpcClient,
} from "@cosmjs/stargate";
import { useCosmos } from "@nuahorg/aga";
import {
    GetTxsEventResponse,
    ServiceClientImpl,
} from "cosmjs-types/cosmos/tx/v1beta1/service";
import { useCallback, useEffect, useState } from "react";

const MessageTypes: Record<string, string> = {
    "/cosmos.bank.v1beta1.MsgSend": "Transfer",
    "/nuah.nameservice.MsgSetName": "Changing on-chain name",
    "/nuah.loan.MsgCreateRequestBook": "Creating a money request book",
    "/nuah.loan.MsgCreateRequest": "Creating a money request",
    "/na": "Unrecognized",
};

const FromPathMessageTypeMap: Record<
    string,
    (object: any) => { from: string; to?: string }
> = {
    "/cosmos.bank.v1beta1.MsgSend": (object: any) => ({
        from: object.fromAddress,
        to: object.toAddress,
    }),
    "/nuah.nameservice.MsgSetName": (object: any) => ({ from: object.creator }),
    "/nuah.loan.MsgCreateRequestBook": (object: any) => ({
        from: object.creator,
        to: object.to,
    }),
    "/nuah.loan.MsgCreateRequest": (object: any) => ({
        from: object.creator,
        to: object.to,
    }),
    "/na": () => ({ from: "Unrecognized" }),
};

type Transaction = {
    hash: string;
    from: string;
    to: string;

    coin_transfer: {
        spender: string;
        amount: number;
        denom: string;
    }[];

    type: string;
    date: string;

    data?: any;
};

const formatTransaction = (
    input: GetTxsEventResponse,
    client: SigningStargateClient,
): Transaction[] => {
    const transactions: Transaction[] = [];
    for (let i = 0; i < input.txs.length; i++) {
        const tx = input.txs[i];
        const txResponse = input.txResponses[i];
        const data = tx.body?.messages
            .filter((m) => m)
            .map((m) => client.registry.decode(m));

        const fromTo = FromPathMessageTypeMap[
            tx.body?.messages[0].typeUrl || "/na"
        ](data?.[0]);
        const transactionBody: Transaction = {
            hash: txResponse.txhash,
            date: txResponse.timestamp,
            type:
                tx.body?.messages
                    .map((message) => MessageTypes[message.typeUrl])
                    .join(", ") || MessageTypes["/na"],
            coin_transfer: txResponse.logs.map((el) => {
                const event = el.events.find(
                    (event) => event.type === "coin_spent",
                );
                if (!event)
                    return {
                        spender: "no one",
                        amount: 0,
                        denom: "nuah",
                    };
                const spender = event.attributes.find(
                    (attr) => attr.key === "spender",
                );
                const coin = event.attributes.find(
                    (attr) => attr.key === "amount",
                );
                const denom = coin?.value.match(/[a-zA-Z]+/g);
                const amount = coin?.value.match(/\d+/g);
                if (!denom?.[0] || !amount?.[0])
                    return {
                        spender: "no one",
                        amount: 0,
                        denom: "nuah",
                    };
                return {
                    spender: spender?.value || "unkown",
                    amount: Number(amount[0]) * -1,
                    denom: denom[0],
                };
            }),
            data,
            from: fromTo.from,
            to: fromTo.to || "",
        };
        transactions.push(transactionBody);
    }

    return transactions;
};

export const useGetTxns = () => {
    // GetTxsEventRequest;
    const { client, queryClient, currentAccount } = useCosmos();
    const [transactions, setTransations] = useState<Transaction[]>([]);
    const { toggle } = useAlert();

    const get = useCallback(
        async (address: string) => {
            try {
                if (!queryClient)
                    throw new Error("You are not connected to the node");
                const rpc = createProtobufRpcClient(queryClient);
                const queryService = new ServiceClientImpl(rpc);

                const response = await queryService.GetTxsEvent({
                    events: [
                        `message.sender='${address}'`,
                        // "delegate.validator='{validator_address}'",
                    ],
                    orderBy: 2,
                });
                const formattedTransactions = formatTransaction(
                    response,
                    client as SigningStargateClient,
                );
                setTransations(formattedTransactions);
            } catch (error) {
                if (error instanceof Error) {
                    toggle({ message: error.message, type: "error" });
                }
                // setStatus(error);
            }
        },
        [queryClient, toggle, client],
    );

    useEffect(() => {
        if (!currentAccount || !currentAccount.address) return;
        const id = setInterval(() => {
            get(currentAccount.address);
        }, 10000);
        return () => clearInterval(id);
    }, [get, currentAccount]);

    return {
        data: transactions,
    };
};
