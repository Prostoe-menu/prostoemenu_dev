import React from 'react';
import Button from 'components/UI/Button/Button';
import Style from './ConfirmModal.module.scss';

const ConfirmModal = ({ onClickClose }) => (
  <div className={Style.modalContainer}>
    <h2 className={Style.title}>Спасибо!</h2>
    <p className={Style.text}>
      Ваш рецепт будет опубликован после модерации. Уведомление об этом пришлём
      вам на почту:
    </p>
    {/* TO DO: to be updated */}
    <p className={Style.email}>mail@mail.ru</p>
    <div className={Style.buttonContainer}>
      {/* TO DO:
      After Main Page component is created, implement this requirement:
      "После закрытия модального окна происходит переход на главную страницу." */}
      <Button
        btnClassName="button_bg_yellow"
        isSubmit={false}
        isDisabled={false}
        ariaLabelText="Закрыть модальное окно"
        onClickBtn={onClickClose}
      >
        Хорошо
      </Button>
    </div>
  </div>
);

export default ConfirmModal;
