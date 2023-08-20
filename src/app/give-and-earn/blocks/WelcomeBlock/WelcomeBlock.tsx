import { Button } from '../../components';
import scrollToElement from '../../utils/scrollToElement';
import styles from './WelcomeBlock.module.scss';

const WelcomeBlock = () => {
  return (
    <section className={styles.wrapper}>
      <iframe
        className={styles.video}
        width='100%'
        height='100%'
        src='https://www.youtube.com/embed/OOvsOCjjJtI?autoplay=1&controls=0&rel=0&showinfo=0'
      />
      <h1 className={styles.title}>Give & Earn</h1>
      <h4 className={styles.subtitle}>Make a mark on earth</h4>

      <div className={styles.buttons}>
        <Button
          className={styles.button}
          onClick={() => scrollToElement('form')}
        >
          Take action
        </Button>
        <Button
          className={styles.button}
          variant='outline'
          onClick={() => scrollToElement('video')}
        >
          Watch video
        </Button>
      </div>
    </section>
  );
};

export default WelcomeBlock;
