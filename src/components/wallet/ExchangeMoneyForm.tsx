import Image from "next/image";
import WalletButton from "./WalletButton";
import WalletInput from "./WalletInput";
import {
    DenomList,
    DenomTrackerType,
    Denoms,
    DenomsNative,
    DenomsStabe,
    useBalances,
    useExchange,
    useOracles,
} from "@nuahorg/aga";
import { useEffect, useMemo, useState } from "react";
import Button from "@/app/wishes/components/Button";

const ExchangeMoneyForm = () => {
    const [amount, setAmount] = useState("");
    const [denomSource, setDenomSource] = useState<DenomTrackerType>("nuah");
    const [denomTarget, setDenomTarget] = useState<DenomTrackerType>("eur");
    const { price: priceSource } = useOracles({ denom: denomSource });
    const { price: priceTarget } = useOracles({ denom: denomTarget });
    const { balances } = useBalances();
    // const {} = useExchange()

    const sourceDenomPrice = useMemo(() => {
        console.log(priceSource);
        const val = priceSource.find(
            (price) => price.denom === DenomList[denomSource],
        )?.price;
        if (!val) return 0;
        return val;
    }, [priceSource, denomSource]);

    const targetDenomPrice = useMemo(() => {
        console.log(priceTarget);
        const val = priceTarget.find(
            (price) => price.denom === DenomList[denomTarget],
        )?.price;
        if (!val) return 0;
        return val;
    }, [priceTarget, denomTarget]);

    const targetAmount = useMemo(() => {
        const division = sourceDenomPrice / targetDenomPrice;
        if (
            !targetDenomPrice ||
            targetDenomPrice === 0 ||
            isNaN(Number(amount))
        )
            return 0;
        return Number(amount) * (sourceDenomPrice / targetDenomPrice);
    }, [amount, sourceDenomPrice, targetDenomPrice]);

    return (
        <div className="flex flex-col gap-[30px]">
            <div className="relative flex items-center gap-[10px]">
                <div className="flex flex-1 flex-col gap-[2px]">
                    <div className="flex items-center gap-[20px] rounded-[5px] bg-[#3D4B72] p-[20px_50px] bp-1336:gap-[10px] bp-1336:p-[10px_20px] bp-1024:flex-col bp-1024:items-stretch bp-1024:p-[20px_20px_40px]">
                        <div className="w-[50px] text-[15px] font-[500] uppercase text-blue-5 bp-1024:text-[13px]">
                            From:
                        </div>

                        <div className="hidden h-[1.5px] bg-white/5 bp-1024:block"></div>

                        <div className="flex w-[170px] items-center justify-center gap-[10px] bp-1336:w-[105px] bp-1024:w-full bp-1024:justify-start">
                            <div></div>
                            <select
                                value={denomSource}
                                onChange={(e) =>
                                    setDenomSource(
                                        e.target.value as DenomTrackerType,
                                    )
                                }
                                className="bg-[#3D4B72] text-[15px] font-[500] text-accent-green "
                            >
                                {/* {DenomList.map((d) => <opt)} */}
                                {[DenomsNative, DenomsStabe].map((group, i) => (
                                    <optgroup
                                        key={i}
                                        label={
                                            i == 0
                                                ? "Native coins"
                                                : "Stable coins"
                                        }
                                    >
                                        {Object.keys(group).map((denom) => (
                                            <option key={denom} value={denom}>
                                                {
                                                    group[
                                                        denom as keyof typeof group
                                                    ]
                                                }
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>

                        <div className="block h-[50px] w-[1.5px] bg-white/10 bp-1024:hidden"></div>

                        <div className="flex flex-1 items-center gap-[10px]">
                            <div className="text-[15px] font-[500] text-blue-5 bp-1024:hidden">
                                Amount:
                            </div>
                            <WalletInput
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder={`0.00 - ${Number(
                                    balances.find(
                                        (balance) =>
                                            balance.denom === denomSource,
                                    )?.amount || 0,
                                ).toFixed(2)}`}
                                className="w-full border-[1px] border-white/20"
                            />
                        </div>

                        <div className="text-[15px] font-[500] text-blue-5 bp-1024:text-end">
                            ≈{(Number(amount) * sourceDenomPrice).toFixed(2)}{" "}
                            USDn
                        </div>
                    </div>

                    <div className="flex items-center gap-[20px] rounded-[5px] bg-[#3D4B72] p-[20px_50px] bp-1336:gap-[10px] bp-1336:p-[10px_20px] bp-1024:flex-col bp-1024:items-stretch bp-1024:p-[40px_20px_20px]">
                        <div className="w-[50px] text-[15px] font-[500] uppercase text-blue-5 bp-1024:text-[13px]">
                            To:
                        </div>

                        <div className="hidden h-[1.5px] bg-white/5 bp-1024:block"></div>

                        <div className="flex w-[170px] items-center justify-center gap-[10px] bp-1336:w-[105px] bp-1024:w-full bp-1024:justify-start">
                            <div></div>

                            <select
                                value={denomTarget}
                                onChange={(e) =>
                                    setDenomTarget(
                                        e.target.value as DenomTrackerType,
                                    )
                                }
                                className="bg-[#3D4B72] text-[15px] font-[500] text-accent-green "
                            >
                                {/* {DenomList.map((d) => <opt)} */}
                                {[DenomsNative, DenomsStabe].map((group, i) => (
                                    <optgroup
                                        key={i}
                                        label={
                                            i == 0
                                                ? "Native coins"
                                                : "Stable coins"
                                        }
                                    >
                                        {Object.keys(group).map((denom) => (
                                            <option key={denom} value={denom}>
                                                {
                                                    group[
                                                        denom as keyof typeof group
                                                    ]
                                                }
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>

                        <div className="block h-[50px] w-[1.5px] bg-white/10 bp-1024:hidden"></div>

                        <div className="flex flex-1 items-center gap-[10px]">
                            <div className="text-[15px] font-[500] text-blue-5 bp-1024:hidden">
                                Amount:
                            </div>
                            <div className="text-[15px] font-[500] italic text-accent-green">
                                +{targetAmount.toFixed(2)}
                            </div>
                        </div>

                        <div className="text-[15px] font-[500] text-blue-5">
                            ≈
                            {(
                                Number(amount) *
                                (sourceDenomPrice / targetDenomPrice) *
                                targetDenomPrice
                            ).toFixed(2)}{" "}
                            USDn
                        </div>
                    </div>
                </div>

                <button className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#3D4B72] bp-1024:absolute bp-1024:left-1/2 bp-1024:top-1/2 bp-1024:-translate-x-1/2 bp-1024:-translate-y-[10px] bp-1024:border-[1px] bp-1024:border-white">
                    <Image
                        src="/images/wallet/icons/exchange.svg"
                        alt="Exchange"
                        width={24}
                        height={17}
                    />
                </button>
            </div>

            <div className="h-[1px] bg-white/10"></div>

            <WalletButton
                color="green"
                sz="lg"
                className="self-end bp-1024:self-auto"
                disabled
            >
                Exchange
            </WalletButton>
        </div>
    );
};

export default ExchangeMoneyForm;
