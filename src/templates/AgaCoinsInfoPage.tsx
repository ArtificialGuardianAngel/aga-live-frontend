const INFO_DATA = [
  'Use the platform to perform searches and mine [A.G.A. coins]',
  'Gain [0.01 A.G.A]. coin for each individual search you perform',
  '0.01 A.G.A. coin has an initial value set at [1 USDn]',
  '1.00 A.G.A. coin has an initial value set at [100 USDn]',
  'Limit of [10 coin-earning] searches per day',
  'From 2024, you’ll be able to trade A.G.A. coins on [the NUAH financial markets] for other crypto coins',
  'Use this [free chance] to amass as many A.G.A. coins as possible',
  'Just like Bitcoin and Ether, A.G.A coin value may rise or fall over time',
  'Capitalize on this early opportunity to mine a significant quantity of coins',
  'Don’t let this opportunity slip away!',
  'Each unique individual is permitted only one email account, subject to future ID verification.',
];

const AgaCoinsInfoPage = () => {
  return (
    <div>
      <h3 className="p-[30px_0] text-center text-[18px] font-bold uppercase mb-[20px] max-[480px]:text-[14px] max-[480px]:p-[15px_0_25px]">
        A.G.A. coins
      </h3>

      <h2 className="text-center mb-[50px] font-light text-blue-5 text-[40px] leading-[26px] max-[480px]:text-[20px] max-[768px]:text-[25px]">
        Mine A.G.A. coins for free
      </h2>

      <div className="flex flex-col gap-[5px]">
        {INFO_DATA.map((item, index) => (
          <div
            className="p-[30px] bg-white/[0.03] shadow-lg rounded-[10px] text-white text-center"
            key={index}
            dangerouslySetInnerHTML={{
              __html: item
                .replace(/\[/g, '<span class="text-accent-green">')
                .replace(/]/g, '</span>'),
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AgaCoinsInfoPage;
