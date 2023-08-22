import React, { useEffect, useRef } from 'react';

interface Props {
  value: number;
  setValue: (val: number) => void;
}

const MIN_VALUE = 369;
const MAX_VALUE = 1080000;

const GiveSliderBlock: React.FC<Props> = ({ value, setValue }) => {
  const valueItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (valueItemRef.current) {
      valueItemRef.current.style.left = `calc(${
        ((value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100
      }% + ${25 - 50 * ((value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE))}px)`;
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-[120px]">
      <div className="flex flex-col gap-[30px]">
        <h4 className="text-center">Your one-time donation:</h4>

        <div className="flex items-center gap-[25px] md:flex-col">
          <div>369 USD</div>
          <div className="flex-1 flex items-center relative">
            <input
              value={value}
              onChange={(e) => setValue(+e.target.value)}
              className="range w-full"
              type="range"
              min={MIN_VALUE}
              max={MAX_VALUE}
            />
            <div
              ref={valueItemRef}
              className="bg-accentGreen rounded-[5px] p-[12px] text-blue7 leading-[calc(12/16)] absolute bottom-0 translate-y-[calc(100%+25px)] translate-x-[-50%] w-[180px] text-center"
            >
              <span className="font-[700]">
                {value.toLocaleString('en-US')}
              </span>{' '}
              USD
            </div>
          </div>
          <div>1,080,000 USD</div>
        </div>
      </div>

      <div className="flex flex-col gap-[50px]">
        <div className="flex flex-col gap-[30px] items-center">
          <h4 className="text-center">Your financial reward:</h4>

          <div className="challenges-card-bg rounded-[200px] flex justify-center items-center p-[3px] min-w-[370px] md:min-w-[280px]">
            <div className="text-center h-full w-full flex flex-col p-[30px_50px] border-transparent bg-cardCombined rounded-[200px] text-[40px] uppercase font-[200] text-white font-ceraPro leading-[calc(20/30)] md:p-[10px_15px] md:text-[20px] md:leading-normal lg:leading-normal">
              {(value / 2).toLocaleString('en-US')} USD
            </div>
          </div>
          <h4 className="text-center">
            When someone donates the same amount using your endorsement link.
          </h4>
        </div>

        <div className="text-center">
          Every time someone donates using your unique endorser link, you earn
          half of the donation. It’s that powerful and straightforward. Expand
          your influence by endorsing numerous friends. Donate significantly
          today and let your generosity reward you indefinitely.
        </div>
      </div>
    </div>
  );
};

export default GiveSliderBlock;
