"use client";

import Image from "next/image";
import React, { useState } from "react";
import copy from "copy-to-clipboard";
import cn from "classnames";

type Props = {
    email: string;
};
const WishesEndorserLinkBlock: React.FC<Props> = ({ email }) => {
    const [copied, setCopied] = useState(false);

    const onCopyClick = () => {
        copy(`https://aga.live/3wishes/e/${email}`);
        setCopied(true);

        setTimeout(() => setCopied(false), 2 * 1000);
    };

    return (
        <div className="flex flex-col items-center gap-[50px]">
            <h3 className="text-center text-[22px] font-[600] text-accentGreen">
                Your endorser link
            </h3>

            <div className="challenges-card-bg flex min-w-[370px] items-center justify-center rounded-[200px] p-[3px] wishes-md:min-w-[280px] wishes-md:max-w-full">
                <div
                    onClick={() => onCopyClick()}
                    className="tooltip-trigger relative flex h-full w-full cursor-pointer items-center justify-between gap-[20px] rounded-[200px] border-transparent bg-cardCombined p-[25px_40px] text-center text-[20px] leading-[calc(15/20)] text-white wishes-lg:leading-normal wishes-md:p-[10px_15px] wishes-md:text-[14px] wishes-md:leading-normal"
                >
                    <div className={cn("tooltip", { active: copied })}>
                        {copied ? "Copied!" : "Click to Copy"}
                    </div>
                    <span className="overflow-hidden text-ellipsis">
                        https://aga.live/3wishes/e/{email}
                    </span>
                    <button
                        onClick={() => {
                            copy(`https://aga.live/3wishes/e/${email}`);
                        }}
                    >
                        <Image
                            src="/wishes/icon-copy.svg"
                            width={20}
                            height={20}
                            alt="Copy"
                        />
                    </button>
                </div>
            </div>

            <div className="text-center">
                Share the following link on social media:
            </div>

            <div className="flex gap-[20px]">
                <a
                    className="cursor-pointer"
                    href={process.env.NEXT_PUBLIC_FACEBOOK_LINK}
                >
                    <Image
                        src="/wishes/facebook.svg"
                        alt="Facebook"
                        width={35}
                        height={35}
                    />
                </a>
                <a
                    className="cursor-pointer"
                    href={process.env.NEXT_PUBLIC_LINKEDIN_LINK}
                >
                    <Image
                        src="/wishes/linkedin.svg"
                        alt="LinkedIn"
                        width={35}
                        height={35}
                    />
                </a>
                <a
                    className="cursor-pointer"
                    href={process.env.NEXT_PUBLIC_TWITTER_LINK}
                >
                    <Image
                        src="/wishes/twitter.svg"
                        alt="Twitter"
                        width={35}
                        height={35}
                    />
                </a>
                <a
                    className="cursor-pointer"
                    href={process.env.NEXT_PUBLIC_WHATSAPP_LINK}
                >
                    <Image
                        src="/wishes/whatsapp.svg"
                        alt="WhatsApp"
                        width={35}
                        height={35}
                    />
                </a>
                <a
                    className="cursor-pointer"
                    href={process.env.NEXT_PUBLIC_TELEGRAM_LINK}
                >
                    <Image
                        src="/wishes/telegram.svg"
                        alt="Telegram"
                        width={35}
                        height={35}
                    />
                </a>
            </div>

            <div className="text-center">
                This link will only become active upon completion of the
                E-signature in the next step, but you can already have a
                glimpse. Encourage as many contributions as you can. It’s akin
                to running your own business. Determine your own income, working
                from your mobile or laptop, from anywhere in the world – even
                from a tropical beach. Embark on a journey towards financial
                independence and perpetual income. We encourage you to donate as
                much as you can now, as half of your initial donation will set
                the lifelong maximum you can earn from each single endorsed
                contribution.
            </div>
        </div>
    );
};

export default WishesEndorserLinkBlock;
