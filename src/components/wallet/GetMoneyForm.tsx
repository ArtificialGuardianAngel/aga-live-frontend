import { useCallback, useState } from "react";
import WalletCoinsInput from "./CoinsInput";
import WalletButton from "./WalletButton";
import WalletInput from "./WalletInput";
import {
    DenomList,
    DenomTrackerType,
    DenomsStabe,
    useCosmos,
    useOracles,
} from "@nuahorg/aga";
import cn from "classnames";
import { useApp } from "@/hooks/use-app";
import { useNameService } from "@/hooks/use-nameservice";
import { useAlert } from "@/hooks/use-alert";

const GetMoneyForm = () => {
    const { user } = useApp();
    const { currentAccount } = useCosmos();
    const { toggle } = useAlert();
    const [amount, setAmount] = useState("");
    const [denom, setDenom] = useState<DenomTrackerType>("nuah");
    const { price } = useOracles({ denom });
    const { name } = useNameService();

    const [status, setStatus] = useState<
        "idle" | "pending" | "success" | "failed"
    >("idle");

    const handleFaucetCall = useCallback(async () => {
        if (!currentAccount) return;
        setStatus("pending");
        try {
            await fetch(
                process.env.NEXT_PUBLIC_NODE_FAUCET_URL ||
                    "http://localhost:4500",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        address: currentAccount.address,
                        coins: [amount + denom],
                    }),
                },
            );
            toggle({
                message: `Your balance was funded with ${amount} ${DenomList[denom]}`,
                type: "success",
            });
        } catch (error) {
            if (error instanceof Error) {
                toggle({
                    message: error.message,
                    type: "error",
                });
            }
        }
    }, [currentAccount, amount, denom, toggle]);

    return (
        <div className="flex flex-col gap-[30px]">
            <div className="grid grid-cols-1 gap-[30px]">
                <div className="col-span-1 flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">
                        On what email should the funds be deposited:
                    </div>
                    <WalletInput
                        value={`${user?.email || currentAccount?.address} (${
                            name || currentAccount?.address
                        })`}
                        special
                        disabled
                    />
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
                        disableDenom={(d) =>
                            Object.keys(DenomsStabe).includes(d)
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
                    disabled={status === "pending"}
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
        </div>
    );
};

export default GetMoneyForm;
