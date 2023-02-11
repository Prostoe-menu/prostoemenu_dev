import React from 'react';
import styles from './toast.module.scss';

const Toast = ({ children }) => (
  <div className={styles.container}>
    <p className={styles.text}>{children}</p>
    <button type="button" aria-label="close button" className={styles.close} />
  </div>
);

export default Toast;
