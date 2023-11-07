import WalletButton from "./WalletButton";
import WalletInput from "./WalletInput";

const GetMoneyForm = () => {
    return (
        <div className="flex flex-col gap-[30px]">
            <div className="grid grid-cols-2 gap-[30px]">
                <div className="col-span-2 flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">
                        On what email should the funds be deposited:
                    </div>
                    <WalletInput value="miko@nuah.org" special disabled />
                    <div className="leading-[10px]">
                        <span className="underline">Sign out</span> to change
                    </div>
                </div>

                <div className="flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">Currency or coin:</div>
                    <WalletInput
                        placeholder="NUAH+"
                        postfix={<div className="underline">change</div>}
                    />
                </div>

                <div className="flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">Amount:</div>
                    <WalletInput
                        prefix={
                            <div className="font-[500] text-accent-green">
                                NUAH+
                            </div>
                        }
                        postfix={<div className="font-[500]">≈0.00 USDn</div>}
                        placeholder="0.00"
                    />
                </div>
            </div>

            <div className="h-[1px] bg-white/10"></div>

            <div className="flex justify-end gap-[10px]">
                <WalletButton
                    color="green"
                    sz="lg"
                    className="self-end"
                    disabled
                >
                    Pay with crypto
                </WalletButton>
                <WalletButton
                    color="green"
                    sz="lg"
                    className="self-end"
                    disabled
                >
                    Pay with fiat
                </WalletButton>
            </div>
        </div>
    );
};

export default GetMoneyForm;
