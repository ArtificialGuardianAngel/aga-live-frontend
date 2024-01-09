import { NavigationLink } from "./navigation-link";

const MENU = [
    {
        title: "Wallet",
        href: "/wallet",
        items: [
            {
                title: "All",
                href: "/wallet",
            },
            {
                title: "Stable",
                href: "/wallet/stable",
            },
            {
                title: "Native",
                href: "/wallet/native",
            },
        ],
    },
    {
        href: "/wallet/exchange",
        title: "Exchange money",
    },
    {
        href: "/wallet/send",
        title: "Send money",
    },
    {
        href: "/wallet/request",
        title: "Request money",
    },
    {
        href: "/wallet/get",
        title: "Get money",
    },
    {
        href: "/wallet/txns",
        title: "Transactions",
    },
    {
        href: "/wallet/requests",
        title: "Money requests",
        items: [
            {
                title: "Received",
                href: "/wallet/requests",
            },
        ],
    },
    {
        href: "/wallet/settings",
        title: "Settings",
    },
];

export const Navigation = () => {
    return (
        <div className="relative p-[70px_20px_20px] bp-1336:p-[70px_10px_20px_10px] bp-1024:p-[30px_30px_0] bp-480:p-[20px_20px_0]">
            <div className="hidden cursor-pointer rounded-[5px] bg-[#3D4B72] p-[20px] text-[15px] font-[500] uppercase text-accent-green bp-1024:block">
                Tab name
            </div>
            <nav>
                <ul className="z-50 flex w-[300px] flex-col gap-[5px] overflow-hidden text-[12px] font-[700] uppercase leading-[calc(8/12)] bp-1336:w-[230px] bp-1024:absolute bp-1024:left-[30px] bp-1024:w-[calc(100%-60px)] bp-1024:gap-0 bp-1024:rounded-[3px] bp-480:left-[20px] bp-480:w-[calc(100%-40px)]">
                    {MENU.map((item, i) => (
                        <li key={i}>
                            <NavigationLink {...item} />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
