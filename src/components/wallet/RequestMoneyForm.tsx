import { useEffect, useState } from "react";
import WalletCoinsInput from "./CoinsInput";
import WalletButton from "./WalletButton";
import WalletInput from "./WalletInput";
import {
    DenomList,
    DenomTrackerType,
    useBalances,
    useCosmos,
    useOracles,
    usePreparedTransaction,
    useTransaction,
} from "@nuahorg/aga";
import { isValidBech32Address, useNameService } from "@/hooks/use-nameservice";
import {
    DeliverTxResponse,
    SigningStargateClient,
    assertIsDeliverTxSuccess,
} from "@cosmjs/stargate";
import {
    MsgCreateRequest,
    MsgCreateRequestBook,
} from "@nuahorg/aga/dist/stargate/proto/nuah/loan/tx";
import {
    MsgCreateRequestBookEncodeObject,
    MsgCreateRequestEncodeObject,
} from "@nuahorg/aga/dist/stargate/modules";
import { wrap } from "@/utils/wrap";
import cn from "classnames";

const RequestMoneyForm = () => {
    const { client, currentAccount, queryClient } = useCosmos();
    const { balances } = useBalances();
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [denom, setDenom] = useState<DenomTrackerType>("nuah");
    const { price } = useOracles({ denom });

    const { name: myName } = useNameService(currentAccount?.address);

    const [message, setMessage] = useState("");
    const {
        status,
        executeSync,
        message: txMessage,
    } = usePreparedTransaction<MsgCreateRequestBookEncodeObject>({
        fee: { amount: "1", denom: "nuahp" },
    });
    // const {} = useTransaction()

    const handleSubmit = async () => {
        try {
            if (!amount || !denom)
                throw new Error("Transaction currency is not set");
            if (!currentAccount?.address)
                throw new Error("Transaction currency is not set");
            if (!to) throw new Error("No recepient details provided");

            let address: string;

            if (isValidBech32Address(to)) {
                //
                address = to;
            } else {
                const name = await queryClient?.nameservice.getName(to);

                if (!name?.whois?.value)
                    throw new Error("No recepient details provided");

                address = name.whois.value;
            }

            const messages = [];
            const createBook: MsgCreateRequestBookEncodeObject = {
                typeUrl: "/nuah.loan.MsgCreateRequestBook",
                value: {
                    creator: currentAccount.address,
                    to: address,
                },
            };

            try {
                const book =
                    await queryClient?.loan.getRequesBookByAddress(address);
                if (!book) {
                    messages.push(createBook);
                }
            } catch (error) {
                messages.push(createBook);
            }
            const createRequest: MsgCreateRequestEncodeObject = {
                typeUrl: "/nuah.loan.MsgCreateRequest",
                value: {
                    to: address,
                    amount: parseInt(amount),
                    denom,
                    creator: currentAccount.address,
                },
            };
            messages.push(createRequest);

            await executeSync(messages);
            setMessage(
                "Request is pending, as soon as it will ber accepted you will receive money",
            );
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                setMessage(error.message);
            }
        }
    };

    return (
        <div className="flex flex-col gap-[30px]">
            <div className="grid grid-cols-2 gap-[30px] bp-1024:grid-cols-1">
                <div className="flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">
                        Who do you request money from?
                    </div>
                    <WalletInput
                        placeholder="On-chain name or address"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">
                        Where should the money be received?
                    </div>
                    <WalletInput
                        value={myName || currentAccount?.address}
                        special
                        disabled
                    />
                    <div className="leading-[10px]">
                        <span className="underline">Sign out</span> to change
                    </div>
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
                // disabled
                onClick={handleSubmit}
                disabled={status === "pending"}
            >
                Request money
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

export default RequestMoneyForm;
