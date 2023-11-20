import { FC } from "react";
import WalletButton from "./WalletButton";

interface Props {}

const MobileMoneyRequestsItem: FC<Props> = () => {
    return (
        <div className="flex flex-col gap-[20px] rounded-[5px] bg-[#22304D] p-[20px_15px] text-[13px] font-[500] text-blue-5">
            <div className="text-[20px]">4 000,00 USDn</div>

            <div className="">
                <div>From:</div>
                <div>user2@nuah.org</div>
            </div>

            <div>Money transfer</div>

            <div className="flex gap-[5px]">
                <WalletButton sz="sm" color="green" className="bp-1024:flex-1">
                    Accept
                </WalletButton>
                <WalletButton sz="sm" color="yellow" className="bp-1024:flex-1">
                    Decline
                </WalletButton>
            </div>
        </div>
    );
};

export default MobileMoneyRequestsItem;
