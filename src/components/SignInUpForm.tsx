"use client";
import { useEffect, useState } from "react";
import { Input } from ".";
import { ArrowIcon } from "./Icons";
import Link from "next/link";
import Button from "@/app/wishes/components/Button";
import { useApp } from "@/hooks/use-app";
import { UserTypeEnum } from "@/types/user";

type EnterProps = {
    onButtonClick: (value: string) => void;
};
const EmailEnter = ({ onButtonClick }: EnterProps) => {
    const [state, set] = useState("");
    return (
        <>
            <Input
                value={state}
                onChange={(e) => set(e)}
                placeholder="example@nuah.org"
                buttonContent={<ArrowIcon color="#3D4B72" />}
                buttonProps={{
                    onClick: () => onButtonClick(state),
                    disabled: !state,
                }}
                name="email"
            />
        </>
    );
};

const PasswordEnter = ({ onButtonClick }: EnterProps) => {
    const [state, set] = useState("");
    return (
        <>
            <Input
                value={state}
                onChange={(e) => set(e)}
                type="password"
                name="email"
            />

            <Button disabled={!state} onClick={() => onButtonClick(state)}>
                Open wallet
            </Button>

            {/* <div className="flex justify-center">
                <Link href="/chat" className="text-sm text-blue-5 underline">
                    Cancel
                </Link>
            </div> */}
        </>
    );
};

const OtpEnter = ({ onButtonClick }: EnterProps) => {
    const [state, set] = useState("");
    return (
        <>
            <Input
                placeholder="one-time password"
                value={state}
                onChange={(e) => set(e)}
                name="email"
            />

            <Button disabled={!state} onClick={() => onButtonClick(state)}>
                Verify
            </Button>

            {/* <div className="flex justify-center">
                <Link href="/chat" className="text-sm text-blue-5 underline">
                    Cancel
                </Link>
            </div> */}
        </>
    );
};

const MemoriseMnemonic = ({
    mnemonic,
    onOk,
}: {
    mnemonic: string;
    onOk: () => void;
}) => {
    return (
        <>
            <div className="grid grid-cols-4 gap-1 text-xs">
                {mnemonic.split(" ").map((word) => (
                    <span
                        className="rounded-[4px] bg-blue-6 px-1 py-[2px]"
                        key={word}
                    >
                        {word}
                    </span>
                ))}
            </div>
            <Button onClick={onOk}>Okay</Button>
        </>
    );
};

type StateSteps = "email.fill" | "otp.fill" | "password.fill" | "memo.mnemo";
const getTextForStep = (step: StateSteps) => {
    if (step === "email.fill") {
        return "Use your email address and receive rewards for using AGA";
    }
    if (step === "otp.fill") {
        return "Enter the one-time password sent to your e-mail";
    }
    if (step === "password.fill") {
        return "Enter your wallet password";
    }
    if (step === "memo.mnemo") {
        return "Memorize or write somewhere ";
    }
};

export const SignInUpForm = () => {
    const { connectWallet, verify, user, mnemonic, authorize } = useApp();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [firstTime, setFirstTime] = useState(true);
    const [step, setStep] = useState<StateSteps>("email.fill");

    const handleAuthorize = (email: string) => {
        authorize(email).then(() => {
            setEmail(email);
            setStep("otp.fill");
        });
    };

    const handleConnectWallet = (password: string) => {
        // @ts-ignore
        connectWallet(password, true);
        if (!user?.hasWallet) {
            setPwd(password);
            setFirstTime(true);
            setStep("memo.mnemo");
        }
    };
    const handleOk = () => {
        connectWallet(pwd);
        if (!user?.hasWallet) {
            setFirstTime(true);
            setStep("memo.mnemo");
        }
    };

    const handleVerify = (otp: string) => {
        verify(otp, email).then(() => {
            setStep("password.fill");
        });
    };

    useEffect(() => {
        if (!user?.email) return;
        if (user.type === UserTypeEnum.authed) {
            setStep("password.fill");
        }
    }, [user?.email, user?.type]);

    return (
        <div className="flex max-w-[296px] flex-col gap-[20px] rounded-[10px] border border-blue-5 bg-white/[3%] p-[40px_20px]">
            <h4 className="text-center text-lg font-bold uppercase text-accent-green">
                Access your wallet
            </h4>
            <p className="text-center text-sm">{getTextForStep(step)}</p>

            {step === "email.fill" && (
                <EmailEnter onButtonClick={handleAuthorize} />
            )}
            {step === "otp.fill" && <OtpEnter onButtonClick={handleVerify} />}
            {step === "password.fill" && (
                <PasswordEnter onButtonClick={handleConnectWallet} />
            )}
            {step === "memo.mnemo" && mnemonic && (
                <MemoriseMnemonic mnemonic={mnemonic} onOk={handleOk} />
            )}

            <div className="border-t border-t-white/10"></div>

            <div className="flex justify-center">
                <Link href="/chat" className="text-sm text-blue-5 underline">
                    Cancel
                </Link>
            </div>
        </div>
    );
};
