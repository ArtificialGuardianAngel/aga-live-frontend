const INFO_DATA = [
    "Use the platform to perform searches and mine [AGA coins]",
    "Gain [0.01 AGA]. coin for each individual search you perform",
    "0.01 AGA coin has an initial value set at [1 USDn]",
    "1.00 AGA coin has an initial value set at [100 USDn]",
    "Limit of [10 coin-earning] searches per day",
    "From 2024, you’ll be able to trade AGA coins on [the NUAH financial markets] for other crypto coins",
    "Use this [free chance] to amass as many AGA coins as possible",
    "Just like Bitcoin and Ether, AGA coin value may rise or fall over time",
    "Capitalize on this early opportunity to mine a significant quantity of coins",
    "Don’t let this opportunity slip away!",
    "Each unique individual is permitted only one email account, subject to future ID verification.",
];

const AgaCoinsInfoPage = () => {
    return (
        <div>
            <h3 className="mb-[20px] p-[30px_0] text-center text-[18px] font-bold uppercase wishes-sm:p-[15px_0_25px] wishes-sm:text-[14px]">
                AGA coins
            </h3>

            <h2 className="max-[768px]:text-[25px] mb-[50px] text-center text-[40px] font-light leading-[26px] text-blue-5 wishes-sm:text-[20px]">
                Mine AGA coins for free
            </h2>

            <div className="flex flex-col gap-[5px]">
                {INFO_DATA.map((item, index) => (
                    <div
                        className="rounded-[10px] bg-white/[0.03] p-[30px] text-center text-white shadow-lg"
                        key={index}
                        dangerouslySetInnerHTML={{
                            __html: item
                                .replace(
                                    /\[/g,
                                    '<span class="text-accent-green">',
                                )
                                .replace(/]/g, "</span>"),
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default AgaCoinsInfoPage;
