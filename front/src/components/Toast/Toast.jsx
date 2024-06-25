import { useDispatch } from 'react-redux';
import { deleteNotification } from 'store/slices/toast/toastSlice';
import useTimeout from 'hooks/useTimeout';
import styles from './Toast.module.scss';

const Toast = ({ children, id }) => {
  const dispatch = useDispatch();

  const closeToast = () => {
    dispatch(deleteNotification(id));
  };

  useTimeout(closeToast, 7000);

  return (
    <div className={styles.container}>
      <p className={styles.text}>{children}</p>
      <div className={styles.close}>
        <button
          type="button"
          aria-label="закрыть всплывающее окно"
          onClick={closeToast}
        />
      </div>
    </div>
  );
};

export default Toast;
