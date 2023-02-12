import React from 'react';
import styles from './toast.module.scss';

const Toast = () => (
  <div className={styles.container}>
    <p className={styles.text}>Текст уведомления</p>
    <div className={styles.close}>
      <button type="button" aria-label="close button" />
    </div>
  </div>
);

export default Toast;
