import React from 'react';
import styles from './CloseButton.module.scss';

const CloseButton = ({ hideButton, onClose }) => (
  <button
    className={`${styles.close} ${hideButton && styles.close_hidden}`}
    type="button"
    aria-label="Кнопка закрыть"
    onClick={onClose}
  />
);

export default CloseButton;
