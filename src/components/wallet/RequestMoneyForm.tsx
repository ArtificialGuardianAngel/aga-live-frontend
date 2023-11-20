import WalletCoinsInput from "./CoinsInput";
import WalletButton from "./WalletButton";
import WalletInput from "./WalletInput";

const RequestMoneyForm = () => {
    return (
        <div className="flex flex-col gap-[30px]">
            <div className="bp-1024:grid-cols-1 grid grid-cols-2 gap-[30px]">
                <div className="flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">
                        Who do you request money from?
                    </div>
                    <WalletInput placeholder="Email address" />
                </div>

                <div className="flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">
                        Where should the money be received?
                    </div>
                    <WalletInput value="miko@nuah.org" special disabled />
                    <div className="leading-[10px]">
                        <span className="underline">Sign out</span> to change
                    </div>
                </div>

                <div className="bp-1024:col-span-1 col-span-2 flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">
                        Currency or coin / amount
                    </div>
                    <WalletCoinsInput />
                </div>

                <div className="bp-1024:col-span-1 col-span-2 flex flex-col gap-[15px] text-[15px] text-[#D6E1FA]">
                    <div className="leading-[10px]">Reason (optional):</div>
                    <WalletInput placeholder="e.g. Money transfer" />
                </div>
            </div>

            <div className="h-[1px] bg-white/10"></div>

            <WalletButton
                color="green"
                sz="lg"
                className="bp-1024:self-auto self-end"
                disabled
            >
                Request money
            </WalletButton>
        </div>
    );
};

export default RequestMoneyForm;
