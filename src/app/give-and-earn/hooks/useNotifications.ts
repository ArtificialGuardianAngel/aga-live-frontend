import { useContext } from 'react';
import NotificationsContext from '../context/NotificationsContext';

const useNotifications = () => {
  const { notifications, addNotification } = useContext(NotificationsContext);

  return { notifications, addNotification };
};

export default useNotifications;
