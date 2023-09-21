"use client";
import React, { useCallback, useContext, useState } from "react";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";
import { Button, Input } from "@/components";
import AgaFace from "./chat/AgaFace";
import { ArrowIcon } from "@/components/Icons";
import OverlayPageContext from "@/context/OverlayPageContext";
import {
    AgaCoinsInfoTemplate,
    ContactsTemplate,
    FaqTemplate,
    TermsAndConditionsTemplate,
} from "@/templates";
import { useApp } from "@/hooks/use-app";
import { UserTypeEnum } from "@/types/user";
import { useWindowSize } from "usehooks-ts";
import Link from "next/link";

const LeftBar = () => {
    const { open, setContent } = useContext(OverlayPageContext);
    const { authorize, verify, user, wallet } = useApp();
    const { width } = useWindowSize();

    const [collapsed, setCollapsed] = useState(true);
    const [showPasswordField, setShowPasswordField] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const openOverlayPageWithContent = (content: React.ReactNode) => {
        setContent(content);
        open();
    };

    const handleAuthorize = useCallback(() => {
        authorize(email);
        setShowPasswordField(true);
    }, [authorize, email]);
    const handleVerify = useCallback(() => {
        verify(password, email);
    }, [password, email, verify]);

    return (
        <>
            {collapsed && width <= 767 && (
                <div
                    className={cn(
                        "fixed left-0 top-[90px] z-50 h-[40px] w-[60px] cursor-pointer rounded-r-[35px] bg-accent-green sm:w-[70px] md:hidden",
                    )}
                    onClick={() => setCollapsed(false)}
                >
                    <span className="absolute right-[16px] top-[50%] translate-y-[-50%]">
                        <ArrowIcon color="#22304D" />
                    </span>
                </div>
            )}

            <CSSTransition
                in={width <= 767 ? !collapsed : true}
                timeout={300}
                unmountOnExit
                classNames={"left-bar"}
            >
                <div className="left-bar-background flex h-full w-full flex-col gap-[10px] overflow-y-auto md:max-h-[calc(100dvh_-_40px)] md:scrollbar wishes-md:fixed wishes-md:left-0 wishes-md:top-0 wishes-md:z-40 wishes-md:p-[20px]">
                    {width <= 767 && (
                        <div className="mb-[20px] md:hidden">
                            <button
                                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-accent-green"
                                onClick={() => setCollapsed(true)}
                            >
                                <span className="rotate-180">
                                    <ArrowIcon color="#22304D" />
                                </span>
                            </button>
                        </div>
                    )}

                    <div className="h-[300px] rounded-[10px] bg-white/[0.03] wishes-md:hidden">
                        <AgaFace />
                    </div>

                    <div className="flex flex-col gap-[20px] rounded-[10px] bg-white/[0.03] p-[40px_20px] wishes-xl:p-[30px_15px]">
                        <h2 className="flex items-center justify-center gap-[20px] text-[18px] font-bold uppercase leading-[12px] text-accent-green wishes-xl:gap-[10px] wishes-xl:text-[14px]">
                            <span>
                                {user && user.type === UserTypeEnum.authed
                                    ? wallet?.balance
                                    : "GET"}{" "}
                                A.G.A. COINS
                            </span>
                            <img
                                onClick={() =>
                                    openOverlayPageWithContent(
                                        <AgaCoinsInfoTemplate />,
                                    )
                                }
                                className="cursor-pointer"
                                src="/icons/info.svg"
                                alt=""
                            />
                        </h2>
                        {!(user && user.type === UserTypeEnum.authed) && (
                            <div className="text-center text-sm font-medium leading-[14px] text-blue-4 wishes-xl:text-[13px]">
                                Use your email address and receive rewards for
                                using A.G.A.
                            </div>
                        )}
                        {user ? (
                            <>
                                <div className="text-center text-sm">
                                    Signed as{" "}
                                    <span className="text-accent-green">
                                        {user.email}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <>
                                <Input
                                    placeholder="example@nuah.org"
                                    buttonContent={
                                        !showPasswordField && (
                                            <ArrowIcon color="#3D4B72" />
                                        )
                                    }
                                    buttonProps={{
                                        onClick: handleAuthorize,
                                        className: "flex-shrink-0 flex-grow-0",
                                    }}
                                    value={email}
                                    onChange={setEmail}
                                />
                                {showPasswordField && ( //TODO add transitions
                                    <>
                                        <Input
                                            placeholder="Enter one time password"
                                            buttonContent={
                                                <ArrowIcon color="#3D4B72" />
                                            }
                                            buttonProps={{
                                                onClick: handleVerify,
                                                className:
                                                    "flex-shrink-0 flex-grow-0",
                                            }}
                                            value={password}
                                            onChange={setPassword}
                                        />
                                        <div className="text-center text-accent-green">
                                            You will receive a one time password
                                            via email
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    <div className="flex hidden flex-col items-center gap-[20px] rounded-[10px] bg-white/[0.03] p-[40px_20px] wishes-xl:p-[30px_15px]">
                        <h2 className="text-center text-[18px] font-bold uppercase leading-[12px] text-accent-green wishes-xl:text-[14px]">
                            Giving program
                        </h2>
                        <div className="text-center text-sm font-medium leading-[14px] text-blue-4 wishes-xl:text-[13px]">
                            Give and earn in the same time to build the A.G.A.
                        </div>
                        <Link href="/give-and-earn">
                            <Button type="secondary" size="sm">
                                Take action <ArrowIcon color="#D6E1FA" />
                            </Button>
                        </Link>
                    </div>

                    <div className="text-14 rounded-[10px] bg-white/[0.03] p-[40px_20px] leading-[9px] wishes-xl:p-[30px_15px] wishes-xl:text-[13px]">
                        {/* <div className="border-b-2 border-white/10 pb-[12px]">
                            <Link href="/about">About</Link>
                        </div> */}
                        <div className="border-b-2 border-white/10 p-[12px_0]">
                            <span
                                className="cursor-pointer"
                                onClick={() =>
                                    openOverlayPageWithContent(<FaqTemplate />)
                                }
                            >
                                FAQ
                            </span>
                        </div>
                        {/* <div className="p-[12px_0] border-b-2 border-white/10"> //removed tmp
              <span
                className="cursor-pointer"
                onClick={() => openOverlayPageWithContent(<TeamPage />)}
              >
                Movements Team
              </span>
            </div> */}
                        <div className="border-b-2 border-white/10 p-[12px_0]">
                            <span
                                className="cursor-pointer"
                                onClick={() =>
                                    openOverlayPageWithContent(
                                        <TermsAndConditionsTemplate />,
                                    )
                                }
                            >
                                Terms & Conditions
                            </span>
                        </div>
                        <div className="pt-[12px]">
                            <span
                                className="cursor-pointer"
                                onClick={() =>
                                    openOverlayPageWithContent(
                                        <ContactsTemplate />,
                                    )
                                }
                            >
                                Contact
                            </span>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
};

export default LeftBar;
