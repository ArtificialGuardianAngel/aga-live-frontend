import { FC, HTMLProps, PropsWithChildren } from "react";
import cn from "classnames";

interface TagProps {
    type: "success" | "danger";
}

type Props = TagProps & HTMLProps<HTMLDivElement> & PropsWithChildren;

const Tag: FC<Props> = ({ type, children }) => {
    return (
        <div
            className={cn(
                "inline-flex min-w-[80px] items-center justify-center rounded-[5px] p-[9px_14px] text-[15px] font-[500]",
                {
                    ["bg-[#11F4D1] text-[#263146]"]: type === "success",
                    ["bg-[#FF6A85] text-white"]: type === "danger",
                },
            )}
        >
            {children}
        </div>
    );
};

export default Tag;
