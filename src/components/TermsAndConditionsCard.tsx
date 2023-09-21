import React from "react";

interface Props {
    title: string;
    text: string;
}

const TermsAndConditionsCard: React.FC<Props> = ({ title, text }) => {
    return (
        <div className="flex gap-[20px] rounded-[10px] bg-white/[0.03] p-[30px] shadow-lg wishes-md:flex-col wishes-sm:p-[30px_20px]">
            <div className="w-[220px] flex-initial font-bold">{title}</div>
            <div className="flex-1 font-light text-white">
                {text.split("\n").map((item, idx) => (
                    <>
                        <div key={idx}>{item}</div>
                        <br />
                    </>
                ))}
            </div>
        </div>
    );
};

export default TermsAndConditionsCard;
