import { FC } from "react";
import MobileMoneyRequestsItem from "./MobileMoneyRequestsItem";

interface Props {}

const MobileMoneyRequestsList: FC<Props> = () => {
    return (
        <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[10px]">
                <div className="text-[13px] font-[500]">25.02.2023</div>

                <div className="flex flex-col gap-[2px]">
                    <MobileMoneyRequestsItem />
                    <MobileMoneyRequestsItem />
                </div>
            </div>

            <div className="flex flex-col gap-[10px]">
                <div className="text-[13px] font-[500]">24.02.2023</div>

                <div className="flex flex-col gap-[2px]">
                    <MobileMoneyRequestsItem />
                </div>
            </div>

            <div className="flex flex-col gap-[10px]">
                <div className="text-[13px] font-[500]">23.02.2023</div>

                <div className="flex flex-col gap-[2px]">
                    <MobileMoneyRequestsItem />
                </div>
            </div>
        </div>
    );
};

export default MobileMoneyRequestsList;
