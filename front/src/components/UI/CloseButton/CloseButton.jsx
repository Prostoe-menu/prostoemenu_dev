import classnames from 'classnames';
import styles from './CloseButton.module.scss';

const CloseButton = ({ isHidden, onClose }) => (
  <button
    className={classnames(styles.button, { [styles.hidden]: isHidden })}
    type="button"
    aria-label="Кнопка закрыть"
    onClick={onClose}
  />
);

export default CloseButton;
