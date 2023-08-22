import React from 'react';

interface Props {
  title: string;
  content: React.ReactNode;
}

const GuidelineCard: React.FC<Props> = ({ title, content }) => {
  return (
    <div className="rounded-[10px] p-[50px] flex flex-col gap-[30px] bg-card md:p-[50px_30px]">
      <h5 className="text-accentGreen text-[20px] font-[600] leading-[calc(15/20)] md:leading-none">
        {title}
      </h5>
      <div className="md:text-[16px]">{content}</div>
    </div>
  );
};

export default GuidelineCard;
