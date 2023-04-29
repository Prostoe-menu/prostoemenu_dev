import React from 'react';
import { useDispatch } from 'react-redux';
import useTimeout from '../../hooks/useTimeout';
import { deleteNotification } from '../../store/slices/toast/toastSlice';
import styles from './toast.module.scss';

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
        <button type="button" aria-label="close button" onClick={closeToast} />
      </div>
    </div>
  );
};

export default Toast;
