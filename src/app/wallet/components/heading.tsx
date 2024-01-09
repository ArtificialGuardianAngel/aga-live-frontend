"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

const DATA: Record<string, { title: string; icon: string }> = {
    "/wallet": {
        title: "Wallet",
        icon: "wallet.svg",
    },
    "/wallet/native": {
        title: "Wallet",
        icon: "wallet.svg",
    },
    "/wallet/stable": {
        title: "Wallet",
        icon: "wallet.svg",
    },
    "/wallet/send": {
        title: "Send money",
        icon: "send-money.svg",
    },
    "/wallet/request": {
        title: "Request money",
        icon: "request-money.svg",
    },
    "/wallet/get": {
        title: "Get money",
        icon: "get-money.svg",
    },
    "/wallet/exchange": {
        title: "Exchange money",
        icon: "exchange-money.svg",
    },
    "/wallet/txns": {
        title: "Transactions",
        icon: "transactions.svg",
    },
    "/wallet/requests": {
        title: "Money requests",
        icon: "money-requests.svg",
    },
    "/wallet/requests/received": {
        title: "Money requests",
        icon: "money-requests.svg",
    },
    "/wallet/requests/sent": {
        title: "Money requests",
        icon: "money-requests.svg",
    },
    "/wallet/logins": {
        title: "Logins",
        icon: "logins.svg",
    },
    "/wallet/settings": {
        title: "Settings",
        icon: "logins.svg",
    },
};

export const Heading = () => {
    const pathname = usePathname();
    const data = DATA[pathname];
    return (
        <>
            <Image
                src={`/images/wallet/icons/${data.icon}`}
                alt={data.title}
                width={50}
                height={50}
            />

            <div className="text-[24px] font-[700] uppercase text-accent-green">
                {data.title}
            </div>
        </>
    );
};
