import React from 'react';

interface Props {
  title: string;
  content: string;
}

const WishesAdvantageCard: React.FC<Props> = ({ title, content }) => {
  return (
    <div className="challenges-card-bg rounded-[20px] flex justify-center items-center p-[3px]">
      <div className="h-full w-full flex flex-col p-[40px_30px] gap-[20px] border-transparent bg-cardCombined rounded-[20px]">
        <h5 className="text-[18px] leading-normal">{title}</h5>

        <div className="h-[1px] bg-[rgba(255,255,255,0.2)]"></div>

        <div className="text-[15px] leading-[calc(19/16)]">{content}</div>
      </div>
    </div>
  );
};

export default WishesAdvantageCard;
