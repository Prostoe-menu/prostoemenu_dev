import React from 'react';
import styles from './CloseButton.module.scss';

const CloseButton = ({ onClose, ariaLabelText }) => (
  <button
    className={styles.close}
    type="button"
    aria-label={ariaLabelText}
    onClick={onClose}
  />
);

export default CloseButton;
