import { useCosmos } from "@nuahorg/aga";
import { useEffect, useState } from "react";

type WalletUserInfoProps = {
    openChangeMenu: () => void;
    refreshFlag?: boolean
};
export const WalletUserInfo = ({ openChangeMenu, refreshFlag }: WalletUserInfoProps) => {
    const [name, setName] = useState("");

    const { currentAccount, queryClient } = useCosmos();

    useEffect(() => {
        if (currentAccount?.address)
            queryClient?.nameservice
                .getNameByAddress(currentAccount?.address)
                .then((r) => setName(r.whoisByValue?.whoisIndex as string))
                .catch((e) => console.error(e));
    }, [currentAccount?.address, refreshFlag]);

    return (
        <>
            <div className="grid grid-cols-2 items-center gap-[10px] bg-white/[0.03] p-[20px] rounded-[10px]">
                <button
                    className="w-full text-accent-green"
                    onClick={openChangeMenu}
                >
                    {name || currentAccount?.address}
                </button>

                <button className="text-xs text-blue-5 underline">
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
