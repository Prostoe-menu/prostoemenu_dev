import React from 'react';
import styles from './toast.module.scss';

const Toast = () => (
  <div className={styles.container}>
    <p className={styles.text}>Текст уведомления</p>
    <button type="button" aria-label="close button" className={styles.close} />
  </div>
);

export default Toast;
