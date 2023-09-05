"use client";
import classNames from "classnames";
import Image from "next/image";

type Props = {
    className: string;
};

const BackButton = ({ className }: Props) => {
    const onClick = () => {
        window.history.go(-1);
    };

    return (
        <button
            className={classNames("flex items-center gap-[15px]", className)}
            onClick={onClick}
        >
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-accentGreen">
                <Image
                    className="rotate-180"
                    src="/icons/arrow.svg"
                    alt=""
                    width={14}
                    height={14}
                />
            </div>

            <div className="text-[13px] font-[600] uppercase wishes-2xl:hidden">
                Back
            </div>
        </button>
    );
};
export default BackButton;
