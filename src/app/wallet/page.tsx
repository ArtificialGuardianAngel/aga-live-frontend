import { WrappedCosmosProvider } from "@/components/WrappedCosmosContext";
import WalletLayout from "@/components/wallet/WalletLayout";
import { AppProvider } from "@/context/AppContext";
import { WalletTabsContextProvider } from "@/context/WalletTabsContext";

const WalletPage = () => {
    return (
        <WrappedCosmosProvider>
            <AppProvider>
                <WalletTabsContextProvider>
                    <WalletLayout />
                </WalletTabsContextProvider>
            </AppProvider>
        </WrappedCosmosProvider>
    );
};

export default WalletPage;
