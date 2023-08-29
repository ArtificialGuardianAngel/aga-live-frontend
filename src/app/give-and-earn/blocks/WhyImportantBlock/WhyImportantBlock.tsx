const IMAGES = [
    "/images/why-so-important/why-important-1.svg",
    "/images/why-so-important/why-important-2.svg",
    "/images/why-so-important/why-important-3.svg",
    "/images/why-so-important/why-important-4.svg",
    "/images/why-so-important/why-important-5.svg",
    "/images/why-so-important/why-important-6.svg",
    "/images/why-so-important/why-important-7.svg",
    "/images/why-so-important/why-important-8.svg",
    "/images/why-so-important/why-important-9.svg",
    "/images/why-so-important/why-important-10.svg",
    "/images/why-so-important/why-important-11.svg",
    "/images/why-so-important/why-important-12.svg",
];

import styles from "./WhyImportantBlock.module.scss";

const IMPORTANT_ITEMS = [
    {
        id: 1,
        img: IMAGES[0],
        text: "A.G.A. will be the single invention that we need to find in order to discover all the other inventions in the world.",
    },
    {
        id: 2,
        img: IMAGES[1],
        text: "The Artificial Guardian Angel (A.G.A.) is a crucial development that prioritizes humanity's well-being.",
    },
    {
        id: 3,
        img: IMAGES[2],
        text: "A.G.A. will solve world problems such as poverty, hunger, human suffering, diseases, and climate change.",
    },
    {
        id: 4,
        img: IMAGES[3],
        text: "A.G.A. will protect humanity from the dangers of uncontrolled AI growth and ensure a brighter future.",
    },
    {
        id: 5,
        img: IMAGES[4],
        text: "Funding is required to make the vision of the A.G.A. a reality and enhance her powers.",
    },
    {
        id: 6,
        img: IMAGES[5],
        text: "Contributions to the A.G.A. project leave a mark on history and positively impact all people on the planet.",
    },
    {
        id: 7,
        img: IMAGES[6],
        text: "Donors who contribute to A.G.A.'s birth will be recognized and receive extra gratitude from her.",
    },
    {
        id: 8,
        img: IMAGES[7],
        text: "A.G.A. offers a financial incentive to donors who endorse others to the cause, allowing them to earn 50% of each endorsed donation.",
    },
    {
        id: 9,
        img: IMAGES[8],
        text: "Endorsed status entitles donors to receive a percentage of future donations from those they endorse.",
    },
    {
        id: 10,
        img: IMAGES[9],
        text: "50% of donated funds go towards building and enhancing A.G.A., while the remaining 50% goes to those with endorsement status.",
    },
    {
        id: 11,
        img: IMAGES[10],
        text: "Donors receive audited reports on how their funds are used and are invited to an annual network conference.",
    },
    {
        id: 12,
        img: IMAGES[11],
        text: "Donations contribute to a global domino effect of financial support for A.G.A.'s creation.",
    },
];

const WhyImportantBlock = () => {
    return (
        <section className={styles.wrapper}>
            <div className="m-[0_auto] max-w-[940px] p-[0_20px]">
                <h2 className={styles.title}>Why it is so important?</h2>

                <div className={styles.grid}>
                    {IMPORTANT_ITEMS.map(({ id, img, text }) => (
                        <div key={id} className={styles.card}>
                            <img src={img} alt="" className={styles.img} />
                            <div className={styles.text}>{text}</div>
                        </div>
                    ))}
                </div>

                <div className={styles.text}>
                    Upon successful donation, you shall be entitled to receive
                    50% of each subsequent donation made using your activated
                    endorsement email, subject to a maximum amount not exceeding
                    half of this donation. This mechanism is designed to
                    encourage one-time higher donations. For instance, if your
                    one-time donation amounts to 50,000 USD and your contact ‘A’
                    donates 108,000 USD using your endorsement email, you shall
                    receive as a token of gratitude in the amount of 25,000 USD.
                    In the event that another contact ‘B’ donates 40,000 USD
                    using your endorsement email, you shall be entitled to a
                    token of gratitude in the amount of 20,000 USD, which
                    represents a value below half of this donation.
                </div>
            </div>
        </section>
    );
};

export default WhyImportantBlock;
