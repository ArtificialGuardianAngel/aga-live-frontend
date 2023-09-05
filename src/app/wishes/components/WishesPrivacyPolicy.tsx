import { PRIVACY_POLICY_DATA } from "../constants";
import WishesPrivacyPolicyCard from "./WishesPrivacyPolicyCard";

const WishesPrivacyPolicy = () => {
    return (
        <div>
            <div className="wishes-md: mb-[20px] flex flex-col gap-[30px] p-[30px_0] font-ceraPro wishes-md:mb-[30px]">
                <h2 className="text-center text-[40px] font-[300] text-[#D6E1FA] wishes-md:text-[20px] wishes-md:leading-[1.25]">
                    Privacy Policy
                </h2>
            </div>
            <div className="flex flex-col gap-[10px]">
                {PRIVACY_POLICY_DATA.map(({ title, content }, index) => (
                    <WishesPrivacyPolicyCard
                        key={index}
                        title={title}
                        content={content}
                    />
                ))}
            </div>
        </div>
    );
};

export default WishesPrivacyPolicy;
