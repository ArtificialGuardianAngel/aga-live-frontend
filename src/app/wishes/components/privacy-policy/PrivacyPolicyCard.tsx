import React from 'react';

interface Props {
  title?: string;
  content: React.ReactNode;
}

const PrivacyPolicyCard: React.FC<Props> = ({ title, content }) => {
  return (
    <div className="bg-card p-[70px] rounded-[20px] md:p-[50px_30px]">
      {title && <h3 className="text-[30px] font-[300]">{title}</h3>}
      {title && (
        <div className="m-[30px_0] bg-[rgba(255,255,255,0.1)] h-[1px]"></div>
      )}
      <div className="text-[18px]">{content}</div>
    </div>
  );
};

export default PrivacyPolicyCard;
