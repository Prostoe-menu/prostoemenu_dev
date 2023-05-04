import React, { useState } from 'react';
import ReactPortal from '../ReactPortal/ReactPortal';
import Style from './Modal.module.scss';
import CloseButton from '../UI/CloseButton/CloseButton';
import ConfirmModal from './ConfirmModal/ConfirmModal';

const Modal = ({ children }) => {
  // add closing on escape key
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = () => setIsModalOpen(false);

  if (!isModalOpen) return null;

  return (
    <ReactPortal wrapperId="modal-container">
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
          {children}
          {/* Confirm Modal will be provided as a child when api post-request for creating a new recipe is successful */}
          <ConfirmModal onClickClose={closeModal} />
        </div>
      </section>
    </ReactPortal>
  );
};

export default Modal;
