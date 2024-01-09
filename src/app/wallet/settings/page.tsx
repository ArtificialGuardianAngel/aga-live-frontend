import { ChangeNameModal } from "@/components/wallet/ChangeNameForm";
import LoginsTable from "@/components/wallet/LoginsTable";

const SettingsPage = () => (
    <div>
        <ChangeNameModal />

        <h2 className="text-xl mb-[20px]">Last login history</h2>
        <LoginsTable />
    </div>
);
export default SettingsPage;
