"use client";
import {
    FormEvent,
    FormHTMLAttributes,
    useCallback,
    useEffect,
    useState,
} from "react";
import { Button, Input } from "..";
import { useApp } from "@/hooks/use-app";
import { UserTypeEnum } from "@/types/user";
import cn from "classnames";
import { useCosmos } from "@nuahorg/aga";

type AnonymusFormProps = {
    authorize: FormHTMLAttributes<HTMLFormElement>["onSubmit"];
    verify: FormHTMLAttributes<HTMLFormElement>["onSubmit"];
    authorized: boolean;
};
const AnonymusForm = ({ authorize, verify, authorized }: AnonymusFormProps) => {
    return (
        <form
            className="flex min-w-[350px] flex-col gap-[15px] rounded-[20px] bg-black/30 px-[60px] py-[30px]"
            onSubmit={authorized ? verify : authorize}
        >
            <h2 className="text-xl">Create account</h2>
            <span className="text-accent-green/50">
                Make up a password to gain secure access to your wallet
            </span>
            <Input name="email" placeholder="email" />
            {authorized && (
                <Input
                    type="password"
                    name="otp"
                    placeholder="one-time password"
                />
            )}
            <Button htmlType="submit">
                {authorized ? "Create" : "Get OTP"}
            </Button>
        </form>
    );
};

export const ConnectWalletForm = () => {
    const { user, connectWallet, verify, authorize, mnemonic } = useApp();
    const { isConnected } = useCosmos();
    const [connectWalletError, setConnectWalletError] = useState<Error>();
    const isAuthed = user?.type === UserTypeEnum.authed;
    const hasMnemonicSerialized = Boolean(mnemonic);
    const [authorized, setAuthorized] = useState(false);
    const handleConnectWallet = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const fd = new FormData(e.currentTarget);

        const password = fd.get("password")?.toString();
        const passwordConfirmation = fd
            .get("password-confirmation")
            ?.toString();

        // console.log({ password, passwordConfirmation });
        if (user?.hasWallet && password)
            return connectWallet(password).catch((e) =>
                setConnectWalletError(e),
            );
        if (
            password &&
            password.length > 0 &&
            password === passwordConfirmation
        )
            connectWallet(password).catch((e) => setConnectWalletError(e));
    };

    const handleAuthorize = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            e.stopPropagation();

            const fd = new FormData(e.currentTarget);

            const email = fd.get("email")?.toString();
            if (email) {
                authorize(email);
                setAuthorized(true);
            }
            // setShowPasswordField(true);
        },
        [authorize],
    );
    const handleVerify = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            e.stopPropagation();

            const fd = new FormData(e.currentTarget);

            const email = fd.get("email")?.toString();
            const password = fd.get("otp")?.toString();

            debugger;
            if (password && email) verify(password, email);
        },
        [verify],
    );

    if (!isConnected)
        return (
            <div
                className={cn(
                    "absolute inset-0 flex h-full w-full items-center justify-center backdrop-blur-sm",
                    { hidden: Boolean(mnemonic) },
                )}
            >
                <div className="flex min-w-[350px] flex-col items-center justify-center gap-[15px] rounded-[20px] bg-black/30 px-[60px] py-[30px]">
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="h-16 w-16 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="h-[1rem]">
                        Connecting to blockchain{" "}
                        <span className="animate-pulse text-accent-green">
                            .
                        </span>
                        <span className="animate-pulse text-accent-green">
                            .
                        </span>
                        <span className="animate-pulse text-accent-green">
                            .
                        </span>
                    </div>
                </div>
            </div>
        );

    return (
        <div
            className={cn(
                "absolute inset-0 flex h-full w-full items-center justify-center backdrop-blur-sm",
                { hidden: Boolean(mnemonic) },
            )}
        >
            {!isAuthed ? (
                <AnonymusForm
                    authorize={handleAuthorize}
                    verify={handleVerify}
                    authorized={authorized}
                />
            ) : (
                <form
                    className="flex min-w-[350px] flex-col gap-[15px] rounded-[20px] bg-black/30 px-[60px] py-[30px]"
                    onSubmit={handleConnectWallet}
                >
                    <h2 className="text-xl">
                        {isAuthed ? "Connect wallet" : "Create wallet"}
                    </h2>
                    <span className="text-accent-green/50">
                        Make up a password to gain secure access to your wallet
                    </span>
                    {!isAuthed && <Input name="email" placeholder="email" />}
                    <Input
                        type="password"
                        name="password"
                        placeholder="password"
                    />
                    {!user.hasWallet && (
                        <Input
                            type="password"
                            name="password-confirmation"
                            placeholder="confirm password"
                        />
                    )}
                    <Button htmlType="submit">Connect</Button>
                </form>
            )}
        </div>
    );
};
