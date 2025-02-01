import Button from 'ui/Button';
import styles from './ConfirmModal.module.scss';

// Компонент будет дорабатываться, когда будет имплементирован в логику кода

type TConfirmModalProps = {
  onClickClose: () => void;
};

const ConfirmModal = ({ onClickClose }: TConfirmModalProps) => (
  <div className={styles.modalContainer}>
    <h2 className={styles.title}>Спасибо!</h2>
    <p className={styles.text}>
      Ваш рецепт будет опубликован после модерации. Уведомление об этом пришлём
      вам на почту:
    </p>
    {/* TO DO: to be updated */}
    <p className={styles.email}>mail@mail.ru</p>
    <div className={styles.buttonContainer}>
      {/* TO DO:
      After Main Page component is created, implement this requirement:
      "После закрытия модального окна происходит переход на главную страницу." */}
      <Button
        view="secondary"
        className="button_bg_yellow"
        aria-label="Закрыть модальное окно"
        onClick={onClickClose}
      >
        Хорошо
      </Button>
    </div>
  </div>
);

export default ConfirmModal;
