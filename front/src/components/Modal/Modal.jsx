import React from 'react';
import Style from './Modal.module.scss';
import CloseButton from '../CloseButton/CloseButton';
import ConfirmModal from './ConfirmModal/ConfirmModal';

const Modal = () => (
  <section className={Style.modal}>
    <div
      className={Style.overlay}
      role="button"
      tabIndex="0"
      aria-label="Закрыть модальное окно"
    />
    <div className={Style.content}>
      <div className={Style.closeButtonContainer}>
        <CloseButton sx={{ cursor: 'pointer' }} />
      </div>
      <ConfirmModal />
    </div>
  </section>
);

export default Modal;
