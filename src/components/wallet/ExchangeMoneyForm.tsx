import Image from "next/image";
import WalletButton from "./WalletButton";
import WalletInput from "./WalletInput";

const ExchangeMoneyForm = () => {
    return (
        <div className="flex flex-col gap-[30px]">
            <div className="flex items-center gap-[10px]">
                <div className="flex flex-1 flex-col gap-[2px]">
                    <div className="flex items-center gap-[20px] rounded-[5px] bg-[#3D4B72] p-[20px_50px]">
                        <div className="w-[50px] text-[15px] font-[500] uppercase text-blue-5">
                            From:
                        </div>

                        <div className="flex w-[170px] items-center justify-center gap-[10px]">
                            <div></div>
                            <div className="text-[15px] font-[500] text-accent-green">
                                NUAH
                            </div>
                            <div className="cursor-pointer text-[15px] font-[500] text-blue-5 underline">
                                change
                            </div>
                        </div>

                        <div className="h-[50px] w-[1.5px] bg-white/10"></div>

                        <div className="flex flex-1 items-center gap-[10px]">
                            <div className="text-[15px] font-[500] text-blue-5">
                                Amount:
                            </div>
                            <WalletInput
                                placeholder="-0"
                                className="w-full border-[1px] border-white/20"
                            />
                        </div>

                        <div className="text-[15px] font-[500] text-blue-5">
                            ≈0.00 USDn
                        </div>
                    </div>

                    <div className="flex items-center gap-[20px] rounded-[5px] bg-[#3D4B72] p-[20px_50px]">
                        <div className="w-[50px] text-[15px] font-[500] uppercase text-blue-5">
                            To:
                        </div>

                        <div className="flex w-[170px] items-center justify-center gap-[10px]">
                            <div></div>
                            <div className="text-[15px] font-[500] text-accent-green">
                                NUAH+
                            </div>
                            <div className="cursor-pointer text-[15px] font-[500] text-blue-5 underline">
                                change
                            </div>
                        </div>

                        <div className="h-[50px] w-[1.5px] bg-white/10"></div>

                        <div className="flex flex-1 items-center gap-[10px]">
                            <div className="text-[15px] font-[500] text-blue-5">
                                Amount:
                            </div>
                            <div className="p-[20px] text-[15px] font-[500] italic text-accent-green">
                                +0
                            </div>
                        </div>

                        <div className="text-[15px] font-[500] text-blue-5">
                            ≈0.00 USDn
                        </div>
                    </div>
                </div>

                <button className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#3D4B72]">
                    <Image
                        src="/images/wallet/icons/exchange.svg"
                        alt="Exchange"
                        width={24}
                        height={17}
                    />
                </button>
            </div>

            <div className="h-[1px] bg-white/10"></div>

            <WalletButton color="green" sz="lg" className="self-end" disabled>
                Exchange
            </WalletButton>
        </div>
    );
};

export default ExchangeMoneyForm;
