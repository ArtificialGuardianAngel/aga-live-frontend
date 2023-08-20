import cn from 'classnames';
import { Button } from '../../components';
import scrollToElement from '../../utils/scrollToElement';
import styles from './VideoPresentationBlock.module.scss';

const VideoPresentationBlock = () => {
  return (
    <section className={styles.wrapper} id='video'>
      <div className={cn('max-w-[940px] m-[0_auto] p-[0_20px]', styles.container)}>
        <div className={styles.block}>
          <div className={styles.videoPlaceholder}>
            <iframe
              width='100%'
              height='100%'
              src='https://www.youtube.com/embed/okddSQ9BdkE?autoplay=1&controls=0&rel=0&showinfo=0'
            ></iframe>
          </div>

          <Button
            className={styles.button}
            onClick={() => scrollToElement('form')}
          >
            Take action
          </Button>
        </div>

        <div className={styles.block}>
          <div className={styles.videoPlaceholder}>
            <iframe
              width='100%'
              height='100%'
              src='https://www.youtube.com/embed/xbbtthvoYGg?autoplay=1&controls=0&rel=0&showinfo=0'
            ></iframe>
          </div>

          <Button
            className={styles.button}
            onClick={() => scrollToElement('form')}
          >
            Take action
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VideoPresentationBlock;
