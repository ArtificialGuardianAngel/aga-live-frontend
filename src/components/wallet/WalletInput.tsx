import { FC, HTMLProps, ReactNode } from "react";
import cn from "classnames";

interface InputProps {
    special?: boolean;
    prefix?: ReactNode;
    postfix?: ReactNode;
}

type Props = InputProps & Omit<HTMLProps<HTMLInputElement>, 'prefix'>;

const WalletInput: FC<Props> = ({
    className,
    special,
    prefix,
    postfix,
    ...props
}) => {
    return (
        <div
            className={cn(
                "flex items-center gap-[20px] rounded-[5px] bg-[#3D4B72] p-[15px_20px] text-[#D6E1FA]",
                className,
            )}
        >
            {prefix}
            <input
                className={cn(
                    "inline-block flex-1 bg-transparent text-[15px] font-[500] leading-[calc(10/15)] outline-none",
                    { ["italic text-accent-green/70"]: special },
                )}
                {...props}
            />
            {postfix}
        </div>
    );
};

export default WalletInput;
