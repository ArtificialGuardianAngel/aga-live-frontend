import styles from './PreviewBlock.module.scss';

const PreviewBlock = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.img}></div>
      <h3 className={styles.title}>
        For a full and distortion-free experience, Make sure your device sound
        is
        <br /> turned on and turn off any other sounds or music.
        <br /> click arrow or scroll to explore
      </h3>
      <div className={styles.button}></div>
    </div>
  );
};

export default PreviewBlock;
