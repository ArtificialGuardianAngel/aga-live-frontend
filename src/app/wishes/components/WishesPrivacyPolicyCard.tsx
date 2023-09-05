import React from "react";

interface Props {
    title?: string;
    content: React.ReactNode;
}

const WishesPrivacyPolicyCard: React.FC<Props> = ({ title, content }) => {
    return (
        <div className="rounded-[20px] bg-card p-[70px] text-[#D6E1FA] wishes-md:p-[50px_30px]">
            {title && (
                <h3 className="text-[24px] font-[300] wishes-md:text-[20px]">
                    {title}
                </h3>
            )}
            {title && (
                <div className="m-[30px_0] h-[1px] bg-[rgba(255,255,255,0.1)]"></div>
            )}
            <div className="wishes-md:text-[14px]">{content}</div>
        </div>
    );
};

export default WishesPrivacyPolicyCard;
