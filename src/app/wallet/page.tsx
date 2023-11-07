import WalletLayout from "@/components/wallet/WalletLayout";
import { WalletTabsContextProvider } from "@/context/WalletTabsContext";

const WalletPage = () => {
    return (
        <WalletTabsContextProvider>
            <WalletLayout />
        </WalletTabsContextProvider>
    );
};

export default WalletPage;
