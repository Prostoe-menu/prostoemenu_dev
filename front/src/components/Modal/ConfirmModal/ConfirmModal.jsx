import React from 'react';
import Style from './ConfirmModal.module.scss';
import Button from '../../Button/Button';

const ConfirmModal = ({ onClickClose }) => (
  <div className={Style.modalContainer}>
    <h2 className={Style.title}>Спасибо!</h2>
    <p className={Style.text}>
      Ваш рецепт будет опубликован после модерации. Уведомление об этом пришлём
      вам на почту:
    </p>
    {/* to be updated */}
    <p className={Style.email}>mail@mail.ru</p>
    <div className={Style.buttonContainer}>
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
