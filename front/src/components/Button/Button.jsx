import React from 'react';
import Style from './Button.module.scss';

const Button = ({
  btnClassName,
  isSubmit,
  children,
  isDisabled,
  onClickBtn,
}) => {
  const handleClickBtn = (evt) => {
    evt.preventDefault();
    onClickBtn();
  };

  return (
    <button
      className={`${Style.button} ${Style[btnClassName]}`}
      type={isSubmit ? 'submit' : 'button'}
      disabled={isDisabled}
      onClick={(evt) => handleClickBtn(evt)}
    >
      {
        // При создании кнопки сюда пишем текст и если нужно добавляем тег img с иконкой
        children
      }
    </button>
  );
};

export default Button;
