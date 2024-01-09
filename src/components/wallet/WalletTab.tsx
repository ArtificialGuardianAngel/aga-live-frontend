"use client";

import Image from "next/image";
import { useContext, useEffect, useMemo, useState } from "react";
import WalletTabsContext from "@/context/WalletTabsContext";
import { WalletTabs } from "@/utils/wallet";
import { useApp } from "@/hooks/use-app";
import { useCosmos } from "@nuahorg/aga";
import { SignInUpForm } from "../SignInUpForm";
import { ChangeNameModal } from "./ChangeNameForm";
import { WalletUserInfo } from "./WalletUserInfo";

const WalletTab = () => {
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);

    const { key } = useContext(WalletTabsContext);
    const { user } = useApp();
    const { currentAccount, queryClient } = useCosmos();
    // debugger

    const tabData = useMemo(() => {
        return WalletTabs[key];
    }, [key]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const connected = useMemo(() => {
        return !!user?.hasWallet && !!currentAccount;
    }, [user?.hasWallet, currentAccount]);

    useEffect(() => {
        if (currentAccount?.address)
            queryClient?.nameservice
                .getNameByAddress(currentAccount?.address)
                .then((r) => setName(r.whoisByValue?.whoisIndex as string))
                .catch((e) => console.error(e));
    }, [currentAccount?.address]);

    if (!tabData) {
        return null;
    }

    return (
        <div className="flex flex-col gap-[30px] p-[30px_20px_30px_0] bp-1024:p-[30px] bp-480:p-[20px]">
            <div className="flex items-center justify-between gap-[10px] bp-1024:justify-between">
                <div className="flex items-center gap-[10px] bp-1024:justify-center">
                    <Image
                        src={`/images/wallet/icons/${tabData.icon}`}
                        alt={tabData.title}
                        width={50}
                        height={50}
                    />

                    <div className="text-[24px] font-[700] uppercase text-accent-green">
                        {tabData.title}
                    </div>
                </div>
                <WalletUserInfo
                    openChangeMenu={handleOpen}
                    refreshFlag={open}
                />
            </div>

            <div className="rounded-[10px] bg-white/[0.03] p-[60px] bp-1336:p-[40px] bp-1024:p-[30px_20px] bp-480:p-[30px_10px]">
                {tabData.element}
            </div>

            <div className="text-end text-[14px] text-[#AEB9D2] bp-1024:text-center">
                NUAH AGA (version 0.1)
            </div>

            {/* <ChangeNameModal open={open} onClose={handleClose} /> */}
            {!connected && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
                    <SignInUpForm />
                </div>
            )}
        </div>
    );
};

export default WalletTab;
