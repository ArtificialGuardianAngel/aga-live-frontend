import cn from "classnames";
import React, { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";

interface Props {
    value: number;
    setValue: (val: number) => void;
}

const MIN_VALUE = 369;
const MAX_VALUE = 1080000;

const GiveSliderBlock: React.FC<Props> = ({ value, setValue }) => {
    const valueItemRef = useRef<HTMLDivElement>(null);
    const { width: windowWidth } = useWindowSize();

    useEffect(() => {
        if (valueItemRef.current) {
            valueItemRef.current.style.left = `calc(${
                ((value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100
            }% + ${
                25 - 50 * ((value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE))
            }px)`;

            valueItemRef.current.style.transform =
                windowWidth <= 767
                    ? `translate(${
                          -100 * ((value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE))
                      }%, calc(100% + 25px))`
                    : `translate(-50%, calc(100% + 25px))`;
        }
    }, [value, windowWidth]);

    return (
        <div className="flex flex-col gap-[120px] wishes-md:gap-[60px]">
            <div className="flex flex-col gap-[30px]">
                <h4 className="text-center">Your one-time donation:</h4>

                <div className="flex items-center gap-[25px] wishes-md:flex-col">
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
                            className="absolute bottom-0 z-20 w-[180px] rounded-[5px] bg-accentGreen p-[12px] text-center leading-[calc(12/16)] text-blue7"
                        >
                            <input
                                className={cn(
                                    "inline-block min-w-[3ch] max-w-[8ch] bg-transparent font-[700]",
                                    // `w-[${value.toString().length}ch]`,
                                )}
                                style={{
                                    width: `${value.toString().length}ch`,
                                }}
                                // type="number"
                                max={1080000}
                                min={369}
                                value={value}
                                onChange={(e) => {
                                    let value = parseInt(e.target.value);
                                    if (value > Number(e.target.max))
                                        value = Number(e.target.max);
                                    // if (value < Number(e.target.min))
                                    //     value = Number(e.target.min);
                                    setValue(isNaN(value) ? 0 : value);
                                }}
                                onBlur={(e) => {
                                    let value = parseInt(e.target.value);
                                    if (value < Number(e.target.min))
                                        setValue(Number(e.target.min));
                                }}
                            />
                            {""}
                            USD
                        </div>
                    </div>
                    <div className="hidden w-full justify-between wishes-md:flex">
                        <span>369 USD</span>
                        <span>1,080,000 USD</span>
                    </div>
                    <div className="wishes-md:hidden">1,080,000 USD</div>
                </div>
            </div>

            <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col items-center gap-[30px]">
                    <h4 className="text-center">
                        Your future financial reward when your friend donates
                        the same amount:
                    </h4>

                    <div className="challenges-card-bg flex min-w-[370px] items-center justify-center rounded-[200px] p-[3px] wishes-md:min-w-[280px]">
                        <div className="flex h-full w-full flex-col rounded-[200px] border-transparent bg-cardCombined p-[30px_50px] text-center text-[40px] font-[200] uppercase leading-[calc(20/30)] text-white wishes-lg:leading-normal wishes-md:p-[10px_15px] wishes-md:text-[30px] wishes-md:leading-normal">
                            {(value / 2).toLocaleString("en-US")} USD
                        </div>
                    </div>
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
