import { createPortal } from 'react-dom';
import { useAppSelector } from 'store/hooks';
import Toast from './Toast';
import styles from './ToastNotifications.module.scss';

const ToastNotifications = () => {
  const { notifications } = useAppSelector((state) => state.toast);

  const portalElement = document.getElementById('toast');

  return (
    <>
      {createPortal(
        <div className={styles.toastsWrapper}>
          {notifications.map((item) => (
            <Toast key={item.id} id={item.id}>
              {item.message}
            </Toast>
          ))}
        </div>,
        portalElement as Element
      )}
    </>
  );
};

export default ToastNotifications;
