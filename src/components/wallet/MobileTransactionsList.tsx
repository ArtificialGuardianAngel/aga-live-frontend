import { FC } from "react";
import MobileTransactionCard from "./MobileTransactionCard";

interface Props {}

const MobileTransactionsList: FC<Props> = () => {
    return (
        <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[10px]">
                <div className="text-[13px] font-[500]">25.02.2023</div>

                <div className="flex flex-col gap-[2px]">
                    <MobileTransactionCard type="EXCHANGE" />
                    <MobileTransactionCard type="RECEIVED" />
                </div>
            </div>

            <div className="flex flex-col gap-[10px]">
                <div className="text-[13px] font-[500]">24.02.2023</div>

                <div className="flex flex-col gap-[2px]">
                    <MobileTransactionCard type="RECEIVED" />
                </div>
            </div>

            <div className="flex flex-col gap-[10px]">
                <div className="text-[13px] font-[500]">23.02.2023</div>

                <div className="flex flex-col gap-[2px]">
                    <MobileTransactionCard type="EXCHANGE" />
                    <MobileTransactionCard type="RECEIVED" />
                    <MobileTransactionCard type="RECEIVED" />
                </div>
            </div>
        </div>
    );
};

export default MobileTransactionsList;
