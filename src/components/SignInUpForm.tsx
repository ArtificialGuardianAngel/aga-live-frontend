"use client";
import { useEffect, useMemo, useState } from "react";
import { Input } from ".";
import { ArrowIcon } from "./Icons";
import Link from "next/link";
import Button from "@/app/wishes/components/Button";
import { useApp } from "@/hooks/use-app";
import { UserTypeEnum } from "@/types/user";
import { useAlert } from "@/hooks/use-alert";
import { useCosmos } from "@nuahorg/aga";

type EnterProps = {
    onButtonClick: (value: string) => void;
    error?: string;
};

const ErrorMessage = ({ error }: { error?: string }) => (
    <div>
        {error && (
            <div className="rounded-sm border border-red-200 bg-white/10 px-4 py-2 text-sm text-red-500">
                {error}
            </div>
        )}
    </div>
);

const EmailEnter = ({ onButtonClick, error }: EnterProps) => {
    const [state, set] = useState("");
    return (
        <>
            <ErrorMessage error={error} />
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

const PasswordEnter = ({
    onButtonClick,
    isFirstTime,
    error,
}: EnterProps & { isFirstTime?: boolean }) => {
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    return (
        <>
            <Input
                value={password}
                onChange={(e) => setPassword(e)}
                type="password"
                name="email"
                placeholder="password"
            />
            {isFirstTime && (
                <>
                    <p className="text-center text-sm">
                        Please repeat password
                    </p>
                    <Input
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e)}
                        type="password"
                        name="email"
                        placeholder="password confirmation"
                    />
                </>
            )}

            <ErrorMessage error={error} />
            <Button
                disabled={
                    isFirstTime ? password !== passwordConfirmation : !password
                }
                onClick={() => {
                    if (!isFirstTime) return onButtonClick(password);
                    if (password === passwordConfirmation)
                        return onButtonClick(password);
                }}
            >
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

const OtpEnter = ({ onButtonClick, error }: EnterProps) => {
    const [state, set] = useState("");
    return (
        <>
            <Input
                placeholder="one-time password"
                value={state}
                onChange={(e) => set(e)}
                name="email"
            />

            <ErrorMessage error={error} />
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
    const { currentAccount, queryClient } = useCosmos();
    const { toggle, close } = useAlert();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [step, setStep] = useState<StateSteps>("email.fill");

    const isFirstTime = useMemo(() => !user?.hasWallet, [user?.hasWallet]);

    const connected = useMemo(() => {
        return !!user?.hasWallet && !!currentAccount;
    }, [user?.hasWallet, currentAccount]);

    const handleAuthorize = (email: string) => {
        close();
        authorize(email)
            .then(() => {
                setEmail(email);
                setStep("otp.fill");
            })
            .catch((e) => toggle({ message: e.message, type: "error" }));
    };

    const handleConnectWallet = (password: string) => {
        close();

        // @ts-ignore
        connectWallet(password, true)
            .then(() => {
                if (!user?.hasWallet) {
                    setPwd(password);
                    setStep("memo.mnemo");
                }
            })
            .catch((e) => toggle({ message: e.message, type: "error" }));
    };
    const handleOk = () => {
        close();
        connectWallet(pwd);
        if (isFirstTime) {
            setStep("memo.mnemo");
        }
    };

    const handleVerify = (otp: string) => {
        close();
        verify(otp, email)
            .then(() => {
                setStep("password.fill");
            })
            .catch((e) => toggle({ message: e.message, type: "error" }));
    };

    useEffect(() => {
        if (!user?.email) return;
        if (user.type === UserTypeEnum.authed) {
            setStep("password.fill");
        }
    }, [user?.email, user?.type]);

    return (
        !connected && <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
            <div className="flex max-w-[296px] flex-col gap-[20px] rounded-[10px] border border-blue-5 bg-white/[3%] p-[40px_20px]">
                <h4 className="text-center text-lg font-bold uppercase text-accent-green">
                    Access your wallet
                </h4>
                <p className="text-center text-sm">{getTextForStep(step)}</p>

                {step === "email.fill" && (
                    <EmailEnter onButtonClick={handleAuthorize} />
                )}
                {step === "otp.fill" && (
                    <OtpEnter onButtonClick={handleVerify} />
                )}
                {step === "password.fill" && (
                    <PasswordEnter
                        onButtonClick={handleConnectWallet}
                        isFirstTime={isFirstTime}
                    />
                )}
                {step === "memo.mnemo" && mnemonic && (
                    <MemoriseMnemonic mnemonic={mnemonic} onOk={handleOk} />
                )}

                <div className="border-t border-t-white/10"></div>

                <div className="flex justify-center">
                    <Link
                        href="/chat"
                        className="text-sm text-blue-5 underline"
                    >
                        Cancel
                    </Link>
                </div>
            </div>
        </div>
    );
};
