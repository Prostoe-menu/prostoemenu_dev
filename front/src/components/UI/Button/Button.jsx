import classnames from 'classnames';
import styles from './Button.module.scss';

/**
 * Компонент кнопки (с иконкой и без).
 * Адаптация стилей и логики происходит через пропсы. Содержимое кнопки передается через пропс children.
 * По умолчанию имеет type 'button'
 * */

const Button = ({
  btnClassName,
  isSubmit,
  children,
  disabled,
  onClickBtn,
  ariaLabelText,
}) => {
  const handleClickBtn = (evt) => {
    evt.preventDefault();
    onClickBtn();
  };

  return (
    <button
      className={classnames(styles.button, styles[btnClassName])}
      type={isSubmit ? 'submit' : 'button'}
      disabled={disabled}
      onClick={isSubmit ? null : handleClickBtn}
      aria-label={ariaLabelText}
    >
      {children}
    </button>
  );
};

export default Button;
