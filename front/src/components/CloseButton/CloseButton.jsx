import React from 'react';
import styles from './CloseButton.module.scss';

const CloseButton = ({ onClose }) => (
  <button
    className={styles.close}
    type="button"
    aria-label="Close button"
    onClick={onClose}
  />
);

export default CloseButton;
