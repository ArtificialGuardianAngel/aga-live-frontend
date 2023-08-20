import styles from "./JoinUsBlock.module.scss";

const JoinUsBlock = () => {
    return (
        <section className={styles.wrapper}>
            <div className="m-[0_auto] max-w-[940px] p-[0_20px]">
                <div className={styles.content}>
                    Give to progress, earn a future. Your contribution today is
                    humanity&apos;s leap forward tomorrow!
                </div>
            </div>
        </section>
    );
};

export default JoinUsBlock;
