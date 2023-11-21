import Image from "next/image";
import WalletButton from "./WalletButton";
import WalletInput from "./WalletInput";

const ExchangeMoneyForm = () => {
    return (
        <div className="flex flex-col gap-[30px]">
            <div className="relative flex items-center gap-[10px]">
                <div className="flex flex-1 flex-col gap-[2px]">
                    <div className="bp-1024:p-[20px_20px_40px] bp-1024:flex-col bp-1024:items-stretch bp-1336:gap-[10px] bp-1336:p-[10px_20px] flex items-center gap-[20px] rounded-[5px] bg-[#3D4B72] p-[20px_50px]">
                        <div className="bp-1024:text-[13px] w-[50px] text-[15px] font-[500] uppercase text-blue-5">
                            From:
                        </div>

                        <div className="bp-1024:block hidden h-[1.5px] bg-white/5"></div>

                        <div className="bp-1024:w-full bp-1024:justify-start bp-1336:w-[105px] flex w-[170px] items-center justify-center gap-[10px]">
                            <div></div>
                            <div className="text-[15px] font-[500] text-accent-green">
                                NUAH
                            </div>
                        </div>

                        <div className="bp-1024:hidden block h-[50px] w-[1.5px] bg-white/10"></div>

                        <div className="flex flex-1 items-center gap-[10px]">
                            <div className="bp-1024:hidden text-[15px] font-[500] text-blue-5">
                                Amount:
                            </div>
                            <WalletInput
                                placeholder="-0"
                                className="w-full border-[1px] border-white/20"
                            />
                        </div>

                        <div className="bp-1024:text-end text-[15px] font-[500] text-blue-5">
                            ≈0.00 USDn
                        </div>
                    </div>

                    <div className="bp-1024:p-[40px_20px_20px] bp-1024:flex-col bp-1024:items-stretch bp-1336:gap-[10px] bp-1336:p-[10px_20px] flex items-center gap-[20px] rounded-[5px] bg-[#3D4B72] p-[20px_50px]">
                        <div className="bp-1024:text-[13px] w-[50px] text-[15px] font-[500] uppercase text-blue-5">
                            To:
                        </div>

                        <div className="bp-1024:block hidden h-[1.5px] bg-white/5"></div>

                        <div className="bp-1024:w-full bp-1024:justify-start bp-1336:w-[105px] flex w-[170px] items-center justify-center gap-[10px]">
                            <div></div>
                            <div className="text-[15px] font-[500] text-accent-green">
                                NUAH+
                            </div>
                        </div>

                        <div className="bp-1024:hidden block h-[50px] w-[1.5px] bg-white/10"></div>

                        <div className="flex flex-1 items-center gap-[10px]">
                            <div className="bp-1024:hidden text-[15px] font-[500] text-blue-5">
                                Amount:
                            </div>
                            <div className="text-[15px] font-[500] italic text-accent-green">
                                +0
                            </div>
                        </div>

                        <div className="text-[15px] font-[500] text-blue-5">
                            ≈0.00 USDn
                        </div>
                    </div>
                </div>

                <button className="bp-1024:top-1/2 bp-1024:left-1/2 bp-1024:-translate-x-1/2 bp-1024:-translate-y-[10px] bp-1024:border-[1px] bp-1024:border-white bp-1024:absolute flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#3D4B72]">
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
                className="bp-1024:self-auto self-end"
                disabled
            >
                Exchange
            </WalletButton>
        </div>
    );
};

export default ExchangeMoneyForm;
