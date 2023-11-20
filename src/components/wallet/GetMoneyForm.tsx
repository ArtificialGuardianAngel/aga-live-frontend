import WalletCoinsInput from "./CoinsInput";
import WalletButton from "./WalletButton";
import WalletInput from "./WalletInput";

const GetMoneyForm = () => {
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
                    <WalletCoinsInput />
                </div>
            </div>

            <div className="h-[1px] bg-white/10"></div>

            <div className="flex flex-wrap justify-end gap-[10px]">
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
