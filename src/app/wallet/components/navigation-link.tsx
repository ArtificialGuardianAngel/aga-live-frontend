"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type NavigationLinkProps = {
    href: string;
    title: string;
    items?: {
        title: string;
        href: string;
    }[];
};
export const NavigationLink = ({ href, title, items }: NavigationLinkProps) => {
    const pathname = usePathname();
    const isActive =
        pathname === href || items?.some((el) => el.href === pathname);
    return (
        <>
            <div className="rounded-[10px] bg-white/[0.03] p-[15px_20px] bp-1024:rounded-none bp-1024:border-b-[1px] bp-1024:border-t-[1px] bp-1024:border-white/5 bp-1024:bg-[#334168] bp-1024:p-[20px]">
                <Link
                    href={href}
                    className={cn("active:text-accent-green", {
                        "text-accent-green": isActive,
                    })}
                >
                    {title}
                </Link>
            </div>
            {isActive && items && (
                <div className="p-[10px] bp-1024:bg-[#334168] bp-1024:p-[0_20px_0_40px]">
                    {items?.map((item, index) => (
                        <div key={index}>
                            <Link
                                className={cn(
                                    "block p-[10px_40px] text-[12px] font-[700] uppercase leading-[calc(8/12)] bp-1024:border-b-[1px] bp-1024:border-t-[1px] bp-1024:border-white/5 bp-1024:p-[20px_0]",
                                    {
                                        "text-accent-green":
                                            pathname === item.href,
                                    },
                                )}
                                href={item.href}
                            >
                                {item.title}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
