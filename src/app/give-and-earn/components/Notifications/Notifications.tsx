import useNotifications from '../../hooks/useNotifications';
import styles from './Notifications.module.scss';

const Notifications = () => {
  const { notifications } = useNotifications();

  return (
    <div className={styles.wrapper}>
      {notifications.map((notification, idx) => (
        <div className={styles.notification} key={`${notification}${idx}`}>
          {notification}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
