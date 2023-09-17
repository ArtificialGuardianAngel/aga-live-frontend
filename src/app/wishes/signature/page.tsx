"use client";

import copy from "copy-to-clipboard";
import cn from "classnames";
import Image from "next/image";
import BackButton from "../components/BackButton";
import { useEffect, useMemo, useRef, useState } from "react";
import { WishesDataType } from "../typs";

interface Props {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}
export default function ESignature({ searchParams }: Props) {
    const [copied, setCopied] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(10 * 60);
    const [email, setEmail] = useState("");
    const interval = useRef<NodeJS.Timeout | null>(null);

    const link = useMemo(() => `aga.live/wishes?e=${email}`, [email]);

    const onCopyClick = () => {
        copy(`https://${link}`);
        setCopied(true);

        setTimeout(() => setCopied(false), 2 * 1000);
    };

    const sendContractByEmail = async (
        data: WishesDataType & { amount: string },
    ) => {
        try {
            console.log(data);
            const res = await fetch("/api/wishes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const resData = await res.json();
            localStorage.setItem("result", JSON.stringify(resData));
        } catch (error) {}
    };

    useEffect(() => {
        interval.current = setInterval(() => {
            setSecondsLeft((p) => {
                if (p > 0) {
                    return p - 1;
                }

                return p;
            });
        }, 1000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        };
    }, []);

    useEffect(() => {
        const dataString = localStorage.getItem("data");

        if (!dataString) return;

        const data: WishesDataType = JSON.parse(dataString);
        setEmail(data.email);

        if (localStorage.getItem("result")) return;
        const amount = localStorage.getItem("amount");
        if (amount) sendContractByEmail({ ...data, amount });
    }, []);

    return (
        <main>
            <BackButton className="fixed left-[50px] top-[50px] wishes-xl:left-[30px] wishes-xl:top-[30px] wishes-sm:left-[20px] wishes-sm:top-[20px]" />
            <section className="mx-[auto] mt-[50px] min-h-screen max-w-[1080px] bg-card wishes-xl:mt-0">
                <div className="flex flex-col gap-[70px] p-[70px] wishes-lg:p-[120px_50px_50px] wishes-md:gap-[30px] wishes-md:p-[100px_30px_30px] wishes-sm:p-[100px_10px_10px]">
                    <div className="flex flex-col items-center gap-[30px]">
                        <h2 className="text-center text-[40px] font-[200] wishes-md:text-[28px]">
                            <span className="green">Congratulations</span> on
                            taking this step!
                        </h2>

                        <div className="max-w-[740px] text-center">
                            Check your inbox (or spam folder) and e-sign the
                            agreement to begin enjoying all the advantages.
                        </div>
                    </div>

                    <div className="h-[1px] bg-white/10"></div>

                    <div className="flex flex-col gap-[30px]">
                        <h3 className="text-center text-[22px] font-[600] text-accentGreen">
                            E-signature Instructions
                        </h3>

                        <div className="text-center">
                            Secure your commitment with an e-signature via
                            email, and let&apos;s set the wheels in motion.
                        </div>
                    </div>

                    <div className="flex flex-col gap-[5px]">
                        <div className="flex items-center gap-[15px] rounded-[10px] bg-card p-[30px] ">
                            <div className="flex h-[30px] w-[30px] flex-shrink-0 flex-grow-0 items-center justify-center rounded-full bg-accentGreen text-[13px] font-bold text-blue7">
                                1
                            </div>

                            <div>
                                Check your email inbox (or spam folder) for the
                                e-signature request.
                            </div>
                        </div>

                        <div className="flex items-center gap-[15px] rounded-[10px] bg-card p-[30px] ">
                            <div className="flex h-[30px] w-[30px] flex-shrink-0 flex-grow-0 items-center justify-center rounded-full bg-accentGreen text-[13px] font-bold text-blue7">
                                2
                            </div>

                            <div>
                                Complete the e-signature within the next{" "}
                                <span className="green">
                                    {Math.floor(secondsLeft / 60)} min.{" "}
                                    {secondsLeft % 60} sec.
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-[15px] rounded-[10px] bg-card p-[30px] ">
                            <div className="flex h-[30px] w-[30px] flex-shrink-0 flex-grow-0 items-center justify-center rounded-full bg-accentGreen text-[13px] font-bold text-blue7">
                                3
                            </div>

                            <div>
                                Once signed, you’ll receive access to an
                                endorsing money generation page for free.
                            </div>
                        </div>

                        <div className="flex items-center gap-[15px] rounded-[10px] bg-card p-[30px] ">
                            <div className="flex h-[30px] w-[30px] flex-shrink-0 flex-grow-0 items-center justify-center rounded-full bg-accentGreen text-[13px] font-bold text-blue7">
                                4
                            </div>

                            <div>
                                This page will refresh automatically once the
                                signature is completed.
                            </div>
                        </div>

                        <div className="flex items-center gap-[15px] rounded-[10px] bg-card p-[30px] ">
                            <div className="flex h-[30px] w-[30px] flex-shrink-0 flex-grow-0 items-center justify-center rounded-full bg-accentGreen text-[13px] font-bold text-blue7">
                                5
                            </div>

                            <div>
                                Copy and save your unique endorser link:{" "}
                                <span
                                    className="green tooltip-trigger relative cursor-pointer"
                                    onClick={onCopyClick}
                                >
                                    <div
                                        className={cn("tooltip", {
                                            active: copied,
                                        })}
                                    >
                                        {copied ? "Copied!" : "Click to Copy"}
                                    </div>
                                    {link}
                                    <Image
                                        className="ml-[10px] inline wishes-md:hidden"
                                        src="/wishes/icon-copy.svg"
                                        width={17}
                                        height={17}
                                        alt="Copy"
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
