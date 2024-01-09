"use client";
import { useApp } from "@/hooks/use-app";
import truncate from "@/utils/truncate";
import { useCosmos } from "@nuahorg/aga";
import Link from "next/link";
import { useEffect, useState } from "react";

type WalletUserInfoProps = {
    openChangeMenu?: () => void;
    refreshFlag?: boolean;
};
export const WalletUserInfo = ({
    openChangeMenu,
    refreshFlag,
}: WalletUserInfoProps) => {
    const [name, setName] = useState("");
    const { logout } = useApp();

    const { currentAccount, queryClient } = useCosmos();

    useEffect(() => {
        if (!currentAccount?.address) return;
        const id = setInterval(() => {
            queryClient?.nameservice
                .getNameByAddress(currentAccount?.address)
                .then((r) => setName(r.whoisByValue?.whoisIndex as string))
                .catch((e) => console.error(e));
        }, 2000);

        return () => clearInterval(id);
    }, [currentAccount?.address, refreshFlag]);

    return (
        <>
            <div className="flex items-center gap-[10px] rounded-[10px] bg-white/[0.03] p-[20px] wishes-md:flex-col wishes-md:items-end">
                <Link
                    href="/wallet/settings"
                    className="flex-1 break-words text-accent-green wishes-sm:hidden"
                    onClick={openChangeMenu}
                >
                    {name || currentAccount?.address}
                </Link>
                <Link
                    href="/wallet/settings"
                    className="hidden flex-1 break-words text-accent-green wishes-sm:block"
                    onClick={openChangeMenu}
                >
                    {name || truncate(currentAccount?.address || "")}
                </Link>

                <button
                    className="text-xs text-blue-5 underline"
                    onClick={logout}
                >
                    Sign Out
                </button>
            </div>
        </>
    );
};

// {name && (
//     <div className="col-span-2 text-end text-xs text-blue-5">
//         {currentAccount?.address}
//     </div>
// )}
