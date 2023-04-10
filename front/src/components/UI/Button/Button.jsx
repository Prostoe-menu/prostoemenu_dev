import React from 'react';
import styles from './Button.module.scss';

const Button = ({
  btnClassName,
  isSubmit,
  children,
  isDisabled,
  // onClickBtn,
  ariaLabelText,
}) => (
  // const handleClickBtn = (evt) => {
  //   evt.preventDefault();
  //   onClickBtn();
  // };

  <button
    className={`${styles.button} ${styles[btnClassName]}`}
    type={isSubmit ? 'submit' : 'button'}
    disabled={isDisabled}
    // onClick={(evt) => handleClickBtn(evt)}
    aria-label={ariaLabelText}
  >
    {
      // При создании кнопки сюда пишем текст и если нужно добавляем тег img с иконкой
      children
    }
  </button>
);

export default Button;
