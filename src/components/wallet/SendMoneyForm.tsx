"use client";
import {
    DenomList,
    DenomTrackerType,
    useBalances,
    useCosmos,
    useOracles,
    usePreparedTransaction,
} from "@nuahorg/aga";
import WalletCoinsInput from "./CoinsInput";
import WalletButton from "./WalletButton";
import WalletInput from "./WalletInput";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Bech32 } from "@cosmjs/encoding";
import {
    DeliverTxResponse,
    MsgSendEncodeObject,
    SigningStargateClient,
    assertIsDeliverTxSuccess,
} from "@cosmjs/stargate";
import cn from "classnames";
import { useAlert } from "@/hooks/use-alert";
import { useSearchParams } from "next/navigation";

function isValidBech32Address(address: string) {
    try {
        // Decode the Bech32 address
        const _ = Bech32.decode(address);

        // Additional checks can be performed here
        // For example, checking the prefix or the length of the data

        return true;
    } catch (error) {
        // If there's an error in decoding, it's not a valid Bech32 address
        return false;
    }
}
const SendMoneyForm = () => {
    const params = useSearchParams();
    const { client, currentAccount, queryClient } = useCosmos();
    const { toggle } = useAlert();
    const [addressValue, setAddressValue] = useState("");
    const [amount, setAmount] = useState("");
    const [denom, setDenom] = useState<DenomTrackerType>("nuah");

    const [myName, setMyName] = useState("");
    const {
        executeSync,
        status,
        message: txMessage,
    } = usePreparedTransaction<MsgSendEncodeObject>({
        fee: { amount: "1", denom: "nuahp" },
    });

    const isFormValid = useMemo(() => {
        return currentAccount?.address && amount && denom;
    }, [currentAccount?.address, amount, denom]);

    const { price } = useOracles({ denom });
    const { balances } = useBalances();

    const urlDenom = params.get("denom");

    // useEffect(() => {}, [addressValue])

    const q = useMemo(() => queryClient, [queryClient]);
    const handleSubmit = async () => {
        try {
            if (!amount || !denom)
                throw new Error("Transaction currency is not set");
            if (!currentAccount?.address)
                throw new Error("Transaction currency is not set");
            if (!addressValue) throw new Error("No recepient details provided");
            let address = "";
            if (isValidBech32Address(addressValue)) {
                //
                address = addressValue;
            } else {
                const name =
                    await queryClient?.nameservice.getName(addressValue);

                if (!name?.whois?.value)
                    throw new Error("No recepient details provided");
                address = name.whois.value;
            }
            if (client instanceof SigningStargateClient) {
                const msg: MsgSendEncodeObject = {
                    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                    value: {
                        fromAddress: currentAccount.address,
                        toAddress: address,
                        amount: [{ amount, denom }],
                    },
                };

                await executeSync([msg]);
            }
        } catch (error) {
            if (error instanceof Error) {
                toggle({ message: error.message, type: "error" });
            }
        }
    };

    useEffect(() => {
        if (!q || !currentAccount?.address) return;
        q.nameservice
            .getNameByAddress(currentAccount?.address)
            .then((data) => setMyName(data.whoisByValue?.whoisIndex || ""))
            .catch((e) => console.error(e));
    }, [q, currentAccount?.address]);

    useEffect(() => {
        if (status === "failed") {
            toggle({ message: "Transaction failed", type: "error" });
        }
        if (status === "success") {
            toggle({
                message: `Successfuly sent ${amount} ${DenomList[denom]}`,
                type: "success",
            });
        }
    }, [status, txMessage, toggle, amount, denom]);

    useEffect(() => {
        if (urlDenom) setDenom(urlDenom as keyof typeof DenomList);
    }, [urlDenom]);

    return (
        <div className="flex flex-col gap-[30px]">
            <div className="grid grid-cols-2 gap-[30px] bp-1024:grid-cols-1">
                <div className="flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">Send money from:</div>
                    <WalletInput
                        value={myName || currentAccount?.address}
                        special
                        disabled
                    />
                    <div className="leading-[10px]">
                        <span className="underline">Sign out</span> to change
                    </div>
                </div>

                <div className="flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">Send money to:</div>
                    <WalletInput
                        placeholder="Receiver on-chain name or address"
                        value={addressValue}
                        onChange={(e) => setAddressValue(e.target.value)}
                        name="recepient"
                    />
                </div>

                <div className="col-span-2 flex flex-col gap-[15px] text-[15px] text-[#D6E1FA] bp-1024:col-span-1">
                    <div className="leading-[10px]">
                        Currency or coin / amount
                    </div>
                    <WalletCoinsInput
                        name="amount"
                        selectValue={denom}
                        onChange={(e) => setAmount((e.target as any).value)}
                        onSelectChange={(e) =>
                            setDenom((e.target as any).value)
                        }
                        disableDenom={(denom) => {
                            return !balances.some(
                                (balance) =>
                                    balance.denom === denom &&
                                    Number(balance.amount) > 0,
                            );
                        }}
                        placeholder={`0.00 - ${Number(
                            balances.find((balance) => balance.denom === denom)
                                ?.amount || 0,
                        ).toFixed(2)}`}
                        suffix={
                            <>
                                ≈
                                {(
                                    (price.find(
                                        (e) =>
                                            e.denom ===
                                            DenomList[
                                                denom as keyof typeof DenomList
                                            ],
                                    )?.price || 0) * Number(amount)
                                ).toFixed(2)}{" "}
                                USDn
                            </>
                        }
                    />
                </div>

                <div className="col-span-2 flex flex-col gap-[15px] text-[15px] text-[#D6E1FA] bp-1024:col-span-1">
                    <div className="leading-[10px]">Reason (optional):</div>
                    <WalletInput placeholder="e.g. Money transfer" />
                </div>
            </div>

            <div className="h-[1px] bg-white/10"></div>

            <WalletButton
                color="green"
                sz="lg"
                className="self-end bp-1024:self-auto"
                disabled={!isFormValid || status === "pending"}
                onClick={handleSubmit}
            >
                Send money
            </WalletButton>
        </div>
    );
};

export default SendMoneyForm;
