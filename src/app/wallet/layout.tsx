import { PropsWithChildren } from "react";
import { Navigation } from "./components/navigation";
import { WalletUserInfo } from "@/components/wallet/WalletUserInfo";
import { Heading } from "./components/heading";
import { WrappedCosmosProvider } from "@/components/WrappedCosmosContext";
import { AppProvider } from "@/context/AppContext";
import { AlertProvider } from "@/context/AlertContext";
import { SignInUpForm } from "@/components/SignInUpForm";

const WalletLayout = ({ children }: PropsWithChildren) => {
    // console.log(location)
    return (
        <AlertProvider>
            <WrappedCosmosProvider>
                <AppProvider>
                    <div className="flex bp-1024:flex-col">
                        <Navigation />
                        <div className="flex-1 overflow-y-auto">
                            <div className="flex flex-col gap-[30px] p-[30px_20px_30px_0] bp-1024:p-[30px] bp-480:p-[20px]">
                                <div className="flex items-center justify-between gap-[10px] bp-1024:justify-between">
                                    <div className="flex items-center gap-[10px] bp-1024:justify-center">
                                        <Heading />
                                    </div>
                                    <WalletUserInfo />
                                </div>

                                <div className="rounded-[10px] bg-white/[0.03] p-[60px] bp-1336:p-[40px] bp-1024:p-[30px_20px] bp-480:p-[30px_10px]">
                                    {children}
                                </div>

                                <div className="text-end text-[14px] text-[#AEB9D2] bp-1024:text-center">
                                    NUAH AGA (version 0.1)
                                </div>

                                {/* <ChangeNameModal open={open} onClose={handleClose} /> */}

                                <SignInUpForm />
                            </div>
                        </div>
                    </div>
                </AppProvider>
            </WrappedCosmosProvider>
        </AlertProvider>
    );
};

export default WalletLayout;
