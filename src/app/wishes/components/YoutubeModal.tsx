import React from 'react';

interface Props {
  opened: boolean;
  setOpened: (val: boolean) => void;
  video: string;
}

const YoutubeModal: React.FC<Props> = ({ opened, setOpened, video }) => {
  const onOverlayClick = () => {
    setOpened(false);
  };

  if (!opened) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen bg-black/80 flex items-center justify-center p-[20px]"
      onClick={onOverlayClick}
    >
      <div className="max-w-[880px] aspect-video bg-white w-full">
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${video}?autoplay=0&loop=1&controls=1&rel=0&showinfo=0`}
        />
      </div>
    </div>
  );
};

export default YoutubeModal;
