"use client";

import Image from "next/image";
import VideoBackground from "../components/VideoBackground";

export default function ESignature() {
    return (
        <main>
            <section className="min-h-screen pt-[50px]">
                <VideoBackground />

                <div className="flex flex-col gap-[70px] p-[70px] md:gap-[30px] md:p-[15px]">
                    <div className="flex flex-col items-center gap-[30px]">
                        <h2 className="text-center text-[40px] font-[200] md:text-[28px]">
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
                        <h3 className="text-accentGreen text-center text-[22px] font-[600]">
                            E-signature Instructions
                        </h3>

                        <div className="text-center">
                            Secure your commitment with an e-signature via
                            email, and let's set the wheels in motion.
                        </div>
                    </div>

                    <div className="flex flex-col gap-[5px]">
                        <div className="bg-card flex items-center gap-[15px] rounded-[10px] p-[30px] md:flex-col">
                            <div className="bg-accentGreen text-blue7 flex h-[30px] w-[30px] items-center justify-center rounded-full text-[13px] font-bold">
                                1
                            </div>

                            <div>
                                Check your email inbox (or spam folder) for the
                                e-signature request.
                            </div>
                        </div>

                        <div className="bg-card flex items-center gap-[15px] rounded-[10px] p-[30px] md:flex-col">
                            <div className="bg-accentGreen text-blue7 flex h-[30px] w-[30px] items-center justify-center rounded-full text-[13px] font-bold">
                                2
                            </div>

                            <div>
                                Complete the e-signature within the next{" "}
                                <span className="green">9 min. 47 sec.</span>
                            </div>
                        </div>

                        <div className="bg-card flex items-center gap-[15px] rounded-[10px] p-[30px] md:flex-col">
                            <div className="bg-accentGreen text-blue7 flex h-[30px] w-[30px] items-center justify-center rounded-full text-[13px] font-bold">
                                3
                            </div>

                            <div>
                                Once signed, you’ll receive access to an
                                endorsing money generation page for free.
                            </div>
                        </div>

                        <div className="bg-card flex items-center gap-[15px] rounded-[10px] p-[30px] md:flex-col">
                            <div className="bg-accentGreen text-blue7 flex h-[30px] w-[30px] items-center justify-center rounded-full text-[13px] font-bold">
                                4
                            </div>

                            <div>
                                This page will refresh automatically once the
                                signature is completed.
                            </div>
                        </div>

                        <div className="bg-card flex items-center gap-[15px] rounded-[10px] p-[30px] md:flex-col">
                            <div className="bg-accentGreen text-blue7 flex h-[30px] w-[30px] items-center justify-center rounded-full text-[13px] font-bold">
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
                                    https://aga.live/3wishes/e/user@gmail.com
                                    <Image
                                        className="ml-[10px] inline md:hidden"
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
