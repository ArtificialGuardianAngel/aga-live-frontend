import WalletNavbar from "./WalletNavbar";
import WalletTab from "./WalletTab";

const WalletLayout = () => {
    return (
        <div className="bp-1024:flex-col flex">
            <WalletNavbar />
            <div className="flex-1 overflow-y-auto">
                <WalletTab />
            </div>
        </div>
    );
};

export default WalletLayout;
