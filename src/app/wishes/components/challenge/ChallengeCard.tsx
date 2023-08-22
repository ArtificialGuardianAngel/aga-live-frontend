import React from 'react';

interface Props {
  title?: string;
  content?: string;
}

const ChallengeCard: React.FC<Props> = ({ title, content }) => {
  return (
    <div className="challenges-card-bg rounded-[20px] flex justify-center items-center p-[3px]">
      <div className="h-full w-full flex flex-col p-[50px_40px] gap-[20px] border-transparent bg-cardCombined rounded-[20px]">
        {title && <h5 className="text-[20px] leading-normal">{title}</h5>}

        {title && content && (
          <div className="h-[1px] bg-[rgba(255,255,255,0.2)]"></div>
        )}

        {content && (
          <div className="text-[16px] leading-[calc(19/16)]">{content}</div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;
