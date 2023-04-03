import React, { useState } from 'react';
import Style from './Modal.module.scss';
import CloseButton from '../UI/CloseButton/CloseButton';
import ConfirmModal from './ConfirmModal/ConfirmModal';

const Modal = () => {
  // will be updated (depending on the case)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className={`${Style.modal} ${isModalOpen && Style.openModal}`}>
      <div
        className={Style.overlay}
        role="button"
        tabIndex="0"
        aria-label="Закрыть модальное окно"
        onClick={closeModal}
        onKeyDown={closeModal}
      />
      <div className={Style.content}>
        <div className={Style.closeButtonContainer}>
          <CloseButton sx={{ cursor: 'pointer' }} onClose={closeModal} />
        </div>
        <ConfirmModal onClickClose={closeModal} />
      </div>
    </section>
  );
};

export default Modal;
