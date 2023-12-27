"use client";
import {
    DenomList,
    DenomTrackerType,
    useBalances,
    useCosmos,
    useOracles,
} from "@nuahorg/aga";
import WalletCoinsInput from "./CoinsInput";
import WalletButton from "./WalletButton";
import WalletInput from "./WalletInput";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Bech32 } from "@cosmjs/encoding";
import {
    DeliverTxResponse,
    SigningStargateClient,
    assertIsDeliverTxSuccess,
} from "@cosmjs/stargate";
import cn from "classnames";

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
    const { client, currentAccount, queryClient } = useCosmos();
    const [addressValue, setAddressValue] = useState("");
    const [amount, setAmount] = useState("");
    const [denom, setDenom] = useState<DenomTrackerType>("nuah");

    const [myName, setMyName] = useState("");
    const [tx, setTx] = useState<DeliverTxResponse>();
    const [status, setStatus] = useState<
        "idle" | "pending" | "success" | "failed"
    >("idle");
    const [message, setMessage] = useState("");

    const isFormValid = useMemo(() => {
        return currentAccount?.address && amount && denom;
    }, [currentAccount?.address, amount, denom]);

    const { price } = useOracles({ denom });
    const { balances } = useBalances();

    // useEffect(() => {}, [addressValue])

    const q = useMemo(() => queryClient, [queryClient]);
    const handleSubmit = async () => {
        try {
            if (!amount || !denom)
                throw new Error("Transaction currency is not set");
            if (!currentAccount?.address)
                throw new Error("Transaction currency is not set");
            if (!addressValue) throw new Error("No recepient details provided");

            if (isValidBech32Address(addressValue)) {
                //
            } else {
                setStatus("pending");
                const name =
                    await queryClient?.nameservice.getName(addressValue);

                if (!name?.whois?.value)
                    throw new Error("No recepient details provided");
                if (client instanceof SigningStargateClient) {
                    const tx = await client.sendTokens(
                        currentAccount.address,
                        name.whois.value,
                        [{ amount, denom }],
                        {
                            amount: [
                                {
                                    denom,
                                    amount: (Number(amount) * 0.01).toString(),
                                },
                            ],
                            gas: "80000",
                        },
                    );
                    setTx(tx);
                }
            }
        } catch (error) {
            setStatus("failed");
            if (error instanceof Error) {
                setMessage(error.message);
                console.log(error);
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
        if (tx) {
            try {
                assertIsDeliverTxSuccess(tx);
                setStatus("success");
                setMessage("Successfuly sent coins");
            } catch (error) {
                setStatus("failed");
                if (error instanceof Error) {
                    setMessage(error.message);
                    console.error("assertIsDeliverTxSuccess error", error);
                }
            }
        }
    }, [tx]);

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
        </div>
    );
};

export default SendMoneyForm;
