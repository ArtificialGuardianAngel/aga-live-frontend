import React from 'react';
import Button from './Button';

interface Props {
  title: string | null;
  content: string | null;
  type: 'playlist' | 'video';
  link: string | null;
  openModal?: () => void;
}

const TrainingCenter: React.FC<Props> = ({
  title,
  content,
  type,
  link,
  openModal,
}) => {
  const buttonProps: {
    link?: string;
    linkType?: "external" | "internal";
    className?: string;
    type?: 'primary' | 'secondary';
    onClick?: () => void;
  } = {
    className: 'self-start',
    type: 'secondary',
  };

  if (type === 'playlist') {
    if (link) {
      buttonProps.link = link;
      buttonProps.linkType = 'external';
    }
  }

  return (
    <div className="challenges-card-bg rounded-[20px] flex justify-center items-center p-[3px]">
      <div className="h-full w-full flex flex-col p-[50px_40px] gap-[20px] border-transparent bg-cardCombined rounded-[20px]">
        {title && <h5 className="text-[20px] leading-normal">{title}</h5>}

        {title && (content || link) && (
          <div className="h-[1px] bg-[rgba(255,255,255,0.2)]"></div>
        )}

        {content && (
          <div className="text-[16px] leading-[calc(19/16)]">{content}</div>
        )}

        {link && (
          <Button
            onClick={() => (openModal ? openModal() : null)}
            {...buttonProps}
          >
            {type === 'playlist' ? 'Open channel' : 'Watch video'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TrainingCenter;
