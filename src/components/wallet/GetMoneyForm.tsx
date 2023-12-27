import { useCallback, useState } from "react";
import WalletCoinsInput from "./CoinsInput";
import WalletButton from "./WalletButton";
import WalletInput from "./WalletInput";
import {
    DenomList,
    DenomTrackerType,
    useCosmos,
    useOracles,
} from "@nuahorg/aga";
import cn from "classnames";

const GetMoneyForm = () => {
    const { currentAccount } = useCosmos();
    const [amount, setAmount] = useState("");
    const [denom, setDenom] = useState<DenomTrackerType>("nuah");
    const { price } = useOracles({ denom });

    const [status, setStatus] = useState<
        "idle" | "pending" | "success" | "failed"
    >("idle");
    const [message, setMessage] = useState("");

    const handleFaucetCall = useCallback(async () => {
        if (!currentAccount) return;
        setStatus("pending");
        try {
            await fetch("http://34.18.49.227:4500", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    address: currentAccount.address,
                    coins: [amount + denom],
                }),
            });
            setStatus("success");
            setMessage("Your balance was funded by " + amount + denom);
        } catch (error) {
            setStatus("failed");
            if (error instanceof Error) {
                setMessage(error.message);
            }
        }
    }, [currentAccount, amount, denom]);

    return (
        <div className="flex flex-col gap-[30px]">
            <div className="grid grid-cols-1 gap-[30px]">
                <div className="col-span-1 flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">
                        On what email should the funds be deposited:
                    </div>
                    <WalletInput value="miko@nuah.org" special disabled />
                    <div className="leading-[10px]">
                        <span className="underline">Sign out</span> to change
                    </div>
                </div>

                <div className="flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
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
            </div>

            <div className="h-[1px] bg-white/10"></div>

            <div className="flex flex-wrap justify-end gap-[10px]">
                <WalletButton
                    color="green"
                    sz="lg"
                    className="bp-1024:w-full"
                    disabled={status === 'pending'}
                    onClick={handleFaucetCall}
                >
                    Get from faucet
                </WalletButton>
                <WalletButton
                    color="green"
                    sz="lg"
                    className="bp-1024:w-full"
                    disabled
                >
                    Pay with crypto
                </WalletButton>
                <WalletButton
                    color="green"
                    sz="lg"
                    className="bp-1024:w-full"
                    disabled
                >
                    Pay with fiat
                </WalletButton>
            </div>
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

export default GetMoneyForm;
