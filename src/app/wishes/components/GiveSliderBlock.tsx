import cn from "classnames";
import React, { useEffect, useRef } from "react";

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
            }% + ${
                25 - 50 * ((value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE))
            }px)`;
        }
    }, [value]);

    return (
        <div className="flex flex-col gap-[120px]">
            <div className="flex flex-col gap-[30px]">
                <h4 className="text-center">Your one-time donation:</h4>

                <div className="wishes-md:flex-col flex items-center gap-[25px]">
                    <div className="wishes-md:hidden">369 USD</div>
                    <div
                        className={cn(
                            "relative z-0 flex w-full flex-1 items-center",
                            "before:contents-[''] before:absolute before:left-[0] before:z-0 before:h-2 before:w-2 before:rounded-[50%] before:bg-white",
                            "after:contents-[''] after:absolute after:right-[0] after:z-0 after:h-2 after:w-2 after:rounded-[50%] after:bg-white",
                        )}
                    >
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
                            className="absolute bottom-0 z-20 w-[180px] translate-x-[-50%] translate-y-[calc(100%+25px)] rounded-[5px] bg-accentGreen p-[12px] text-center leading-[calc(12/16)] text-blue7"
                        >
                            <span className="font-[700]">
                                {value.toLocaleString("en-US")}
                            </span>{" "}
                            USD
                        </div>
                    </div>
                    <div className="wishes-md:flex hidden w-full justify-between">
                        <span>369 USD</span>
                        <span>1,080,000 USD</span>
                    </div>
                    <div className="wishes-md:hidden">1,080,000 USD</div>
                </div>
            </div>

            <div className="flex flex-col gap-[50px]">
                <div className="flex flex-col items-center gap-[30px]">
                    <h4 className="text-center">Your financial reward:</h4>

                    <div className="challenges-card-bg wishes-md:min-w-[280px] flex min-w-[370px] items-center justify-center rounded-[200px] p-[3px]">
                        <div className="wishes-md:p-[10px_15px] wishes-md:text-[30px] wishes-md:leading-normal wishes-lg:leading-normal flex h-full w-full flex-col rounded-[200px] border-transparent bg-cardCombined p-[30px_50px] text-center font-ceraPro text-[40px] font-[200] uppercase leading-[calc(20/30)] text-white">
                            {(value / 2).toLocaleString("en-US")} USD
                        </div>
                    </div>
                    <h4 className="text-center">per donation</h4>
                </div>

                <div className="text-center">
                    Every time someone donates using your unique endorser link,
                    you earn{" "}
                    <span className="text-accent-green">
                        half of the donation
                    </span>
                    .
                    <br />
                    It&apos;s that powerful and straightforward. Expand your
                    influence by endorsing numerous friends. Donate
                    significantly today and let your generosity reward you
                    indefinitely.
                </div>
            </div>
        </div>
    );
};

export default GiveSliderBlock;
