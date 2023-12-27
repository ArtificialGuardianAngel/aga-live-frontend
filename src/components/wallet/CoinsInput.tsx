import { FC, HTMLProps, ReactNode, SelectHTMLAttributes } from "react";
import cn from "classnames";
import { DenomList, DenomsNative, DenomsStabe } from "@nuahorg/aga";

interface CoinInputProps {
    selectValue?: string;
    onSelectChange?: SelectHTMLAttributes<HTMLSelectElement>["onChange"];
    suffix?: ReactNode;
    disableDenom?: (denom: keyof typeof DenomList) => boolean;
}

type Props = CoinInputProps & Omit<HTMLProps<HTMLInputElement>, "prefix">;

const WalletCoinsInput: FC<Props> = ({
    className,
    placeholder = "0.00",
    selectValue,
    onSelectChange,
    suffix,
    disableDenom,
    ...props
}) => {
    return (
        <div
            className={cn(
                "relative flex items-center gap-[20px] rounded-[5px] bg-[#3D4B72] p-[15px_20px] text-[#D6E1FA]",
                className,
            )}
        >
            <div className="flex items-center gap-[5px]">
                <select
                    value={selectValue}
                    onChange={onSelectChange}
                    name="denom"
                    className="bg-[#3D4B72] text-[15px] font-[500] text-accent-green "
                >
                    {/* {DenomList.map((d) => <opt)} */}
                    {[DenomsNative, DenomsStabe].map((group, i) => (
                        <optgroup
                            key={i}
                            label={i == 0 ? "Native coins" : "Stable coins"}
                        >
                            {Object.keys(group).map((denom) => (
                                <option
                                    key={denom}
                                    value={denom}
                                    disabled={disableDenom?.(
                                        denom as keyof typeof DenomList,
                                    )}
                                >
                                    {group[denom as keyof typeof group]}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
                {/* <span className="text-[15px] font-[500] text-accent-green">
                    NUAH+
                </span> */}
            </div>
            <input
                className={cn(
                    "inline-block flex-1 bg-transparent text-[15px] font-[500] leading-[calc(10/15)] outline-none",
                )}
                placeholder={placeholder}
                {...props}
            />
            <div className="text-[15px] font-[500] bp-1024:hidden">
                {suffix}
            </div>
        </div>
    );
};

export default WalletCoinsInput;
