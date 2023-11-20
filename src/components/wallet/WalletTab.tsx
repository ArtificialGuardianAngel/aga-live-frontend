"use client";

import Image from "next/image";
import { useContext, useMemo } from "react";
import WalletTabsContext from "@/context/WalletTabsContext";
import { WalletTabs } from "@/utils/wallet";

const WalletTab = () => {
    const { key } = useContext(WalletTabsContext);

    const tabData = useMemo(() => {
        return WalletTabs[key];
    }, [key]);

    if (!tabData) {
        return null;
    }

    return (
        <div className="bp-480:p-[20px] bp-1024:p-[30px] flex flex-col gap-[30px] p-[30px_20px_30px_0]">
            <div className="bp-1024:justify-center flex items-center gap-[10px]">
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

            <div className="bp-480:p-[30px_10px] bp-1024:p-[30px_20px] bp-1336:p-[40px] rounded-[10px] bg-white/[0.03] p-[60px]">
                {tabData.element}
            </div>

            <div className="bp-1024:text-center text-end text-[14px] text-[#AEB9D2]">
                NUAH AGA (version 0.1)
            </div>
        </div>
    );
};

export default WalletTab;
