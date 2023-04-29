import React from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import Toast from './Toast';
import styles from './toastNotifications.module.scss';

const ToastNotifications = () => {
  const { notifications } = useSelector((state) => state.toast);

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
        portalElement
      )}
    </>
  );
};

export default ToastNotifications;
