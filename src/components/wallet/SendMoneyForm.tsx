"use client";
import { useBalances, useCosmos, useTransaction } from "@nuahorg/aga";
import WalletButton from "./WalletButton";
import WalletInput from "./WalletInput";
import { useState } from "react";

const COIN_MAP: Record<string, string> = {
    nuahp: "NUAH+",
    nuah: "NUAH",
    aga: "AGA",
};

const SendMoneyForm = () => {
    const [amount, setAmount] = useState(0);
    const [denom, setDenom] = useState<string>("nuahp");
    const [receiver, setReceiver] = useState<string>("");

    const { currentAccount } = useCosmos();
    const { balances } = useBalances();
    const {} = useTransaction({
        fee: { amount: "90000", denom: "nuahp" },
        amount: [{ amount: amount.toString(), denom }],
        to: receiver,
    });
    return (
        <div className="flex flex-col gap-[30px]">
            <div className="grid grid-cols-2 gap-[30px]">
                <div className="flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">Send money from:</div>
                    <WalletInput
                        value={currentAccount?.address}
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
                        placeholder="Receiver email address"
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-[15px] text-[15px] text-[#D6E1FA] col-span-2">
                    <div className="leading-[10px]">Amount:</div>
                    <WalletInput
                        prefix={
                            <select className="rounded-md border-none bg-[#3D4B72] text-accent-green">
                                {Object.keys(COIN_MAP).map((denom) => (
                                    <option
                                        value={denom}
                                        key={denom}
                                        className="bg-transparent"
                                    >
                                        {COIN_MAP[denom]}
                                    </option>
                                ))}
                            </select>
                        }
                        postfix={<div className="font-[500]">≈0.00 USDn</div>}
                        placeholder="0.00"
                    />
                </div>

                <div className="col-span-2 flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">Reason (optional):</div>
                    <WalletInput placeholder="e.g. Money transfer" />
                </div>
            </div>

            <div className="h-[1px] bg-white/10"></div>

            <WalletButton color="green" sz="lg" className="self-end" disabled>
                Send money
            </WalletButton>
        </div>
    );
};

export default SendMoneyForm;
