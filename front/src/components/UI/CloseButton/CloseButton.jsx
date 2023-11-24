import React from 'react';
import classnames from 'classnames';
import styles from './CloseButton.module.scss';

const CloseButton = ({ isHidden, onClose, className }) => (
  <button
    className={classnames(
      styles.button,
      { [styles.hidden]: isHidden },
      className
    )}
    type="button"
    aria-label="Кнопка закрыть"
    onClick={onClose}
  />
);

export default CloseButton;
