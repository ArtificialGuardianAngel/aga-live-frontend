import { FC } from "react";

interface Props {
    type: "RECEIVED" | "EXCHANGE";
}

const ReceiveContent = () => {
    return (
        <div className="flex flex-col gap-[5px]">
            <div className="text-accent-green">+10 NUAH</div>
            <div>From:</div>
            <div>user2@nuah.org</div>
            <div>Money transfer</div>
        </div>
    );
};

const ExchangeContent = () => {
    return (
        <div className="flex flex-col gap-[5px]">
            <div className="flex gap-[5px]">
                <div className="w-[42px]">From:</div>
                <div className="text-accent-green">10 NUAH</div>
            </div>

            <div className="flex gap-[5px]">
                <div className="w-[42px]">To:</div>
                <div className="text-accent-green">15 NUAH+</div>
            </div>
        </div>
    );
};

const MobileTransactionCard: FC<Props> = ({ type }) => {
    return (
        <div className="flex gap-[5px] rounded-[5px] bg-[#22304D] p-[20px_15px] text-[13px] font-[500]">
            <div className="w-[100px]">
                {type === "RECEIVED" ? "Received" : "Exchange"}
            </div>

            {type === "EXCHANGE" && <ExchangeContent />}
            {type === "RECEIVED" && <ReceiveContent />}
        </div>
    );
};

export default MobileTransactionCard;
