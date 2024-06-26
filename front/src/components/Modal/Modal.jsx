import { useEffect } from 'react';
import cn from 'classnames';
import ReactPortal from 'components/ReactPortal/ReactPortal';
import Button from 'ui/Button';
// import ConfirmModal from './ConfirmModal/ConfirmModal';
import styles from './Modal.module.scss';

// Компонент будет дорабатываться, когда будет имплементирован в логику кода

const Modal = ({ children, closeModal, isModalOpen }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const closeModal = () => setIsModalOpen(false);

  const modalClass = cn(styles.modal, {
    [styles.visible]: isModalOpen,
  });

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === 'Escape' ? closeModal() : null);

    document.body.addEventListener('keydown', closeOnEscapeKey);

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [closeModal]);

  if (!isModalOpen) return null;

  return (
    <ReactPortal wrapperId="modal-container">
      <section className={modalClass}>
        <div
          className={styles.overlay}
          role="button"
          tabIndex="0"
          aria-label="Закрыть модальное окно"
          onClick={closeModal}
          onKeyDown={closeModal}
        />
        <div className={styles.content}>
          <div className={styles.closeButtonContainer}>
            <Button
              view="cross"
              className={styles.button}
              aria-label="Закрыть окно"
              onClick={closeModal}
            />
          </div>
          {children}
          {/* Confirm Modal will be provided as a child when api post-request for creating a new recipe is successful */}
          {/* <ConfirmModal onClickClose={closeModal} /> */}
        </div>
      </section>
    </ReactPortal>
  );
};

export default Modal;
