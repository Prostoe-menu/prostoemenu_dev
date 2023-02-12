import React from 'react';
import styles from './CloseButton.module.scss';

const CloseButton = () => (
  <button className={styles.close} type="button" aria-label="Close button" />
);

export default CloseButton;
