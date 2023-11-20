import { FC, HTMLProps, ReactNode } from "react";
import cn from "classnames";

interface CoinInputProps {}

type Props = CoinInputProps & Omit<HTMLProps<HTMLInputElement>, "prefix">;

const WalletCoinsInput: FC<Props> = ({
    className,
    placeholder = "0.00",
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
                <span className="text-[15px] font-[500] text-accent-green">
                    NUAH+
                </span>
            </div>
            <input
                className={cn(
                    "inline-block flex-1 bg-transparent text-[15px] font-[500] leading-[calc(10/15)] outline-none",
                )}
                placeholder={placeholder}
                {...props}
            />
            <div className="bp-1024:hidden text-[15px] font-[500]">
                ≈0.00 USDn
            </div>
        </div>
    );
};

export default WalletCoinsInput;
