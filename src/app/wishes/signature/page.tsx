"use client";

import copy from "copy-to-clipboard";
import Image from "next/image";
import BackButton from "../components/BackButton";

type Props = {
    email: string;
};
export default function ESignature({ email }: Props) {
    return (
        <main>
            <BackButton className="wishes-xl:top-[30px] wishes-xl:left-[30px] wishes-sm:top-[20px] wishes-sm:left-[20px] fixed left-[50px] top-[50px]" />
            <section className="wishes-xl:mt-0 mx-[auto] mt-[50px] min-h-screen max-w-[1080px] bg-card">
                <div className="wishes-md:gap-[30px] wishes-sm:p-[100px_10px_10px] wishes-md:p-[100px_30px_30px] wishes-lg:p-[120px_50px_50px] flex flex-col gap-[70px] p-[70px]">
                    <div className="flex flex-col items-center gap-[30px]">
                        <h2 className="wishes-md:text-[28px] text-center text-[40px] font-[200]">
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
                                <span className="green">9 min. 47 sec.</span>
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
                                    className="green cursor-pointer"
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            "https://aga.live/3wishes/e/user@gmail.com",
                                        )
                                    }
                                >
                                    https://aga.live/3wishes/e/{email}
                                    <button
                                        onClick={() => {
                                            copy(
                                                `https://aga.live/3wishes/e/${email}`,
                                            );
                                        }}
                                    >
                                        <Image
                                            className="wishes-md:hidden ml-[10px] inline"
                                            src="/wishes/icon-copy.svg"
                                            width={17}
                                            height={17}
                                            alt="Copy"
                                        />
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
