import React from 'react';
import styles from './CloseButton.module.scss';

const CloseButton = ({ numIngredients, onClose }) => (
  <button
    className={`${styles.close} ${numIngredients === 1 && styles.close_hidden}`}
    type="button"
    aria-label="Кнопка закрыть"
    onClick={onClose}
  />
);

export default CloseButton;
