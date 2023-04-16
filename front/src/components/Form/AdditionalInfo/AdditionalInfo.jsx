import { useDispatch } from 'react-redux';
import React from 'react';
import styles from './AdditionalInfo.module.scss';
import Button from '../../UI/Button/Button';
import { buttons } from '../../../utils/constants';

import arrowLeft from '../../../images/arrow-left.svg';
import { changeCurrentStage } from '../../../store/slices/form/formSlice';

const AdditionalInfo = () => {
  const [description, setDescription] = React.useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  const onGoBack = () => {
    dispatch(changeCurrentStage(3));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <section className={styles.additionalInfo}>
        <div className={styles.additionalInfo__comment}>
          <div className={styles.description}>
            <h3 className={styles.description__subtitle}>Примечание </h3>
            <p className={styles.description__text}>
              В этом поле вы можете написать дополнительную информацию о
              рецепте: как подавать блюдо, чем его можно украсить и с чем
              сочетать.
            </p>
          </div>
          <div className={styles.additionalInfo__textArea}>
            <textarea
              className={styles.additionalInfo__textAreaText}
              placeholder="Примечание"
              name="add-info"
              cols="30"
              rows="10"
              onChange={handleDescription}
            />
            <span className={styles.additionalInfo__textAreaCounter}>
              {`${description.length}/500`}
            </span>
          </div>
        </div>
        <div className={styles.description}>
          <h3 className={styles.description__subtitle}>Имя автора </h3>
          <p className={styles.description__text}> будет указано в рецепте</p>
          <input
            className={styles.description__input}
            type="text"
            placeholder="Ваше имя*"
            required
          />
        </div>
      </section>
      <div className={styles.controls}>
        <Button
          btnClassName={buttons.withBorder.yellow}
          isSubmit={false}
          onClickBtn={onGoBack}
        >
          <img src={arrowLeft} alt="стрелка влево" /> назад
        </Button>
        <Button btnClassName={buttons.withBg.yellow} isSubmit>
          добавить рецепт
        </Button>
      </div>
    </form>
  );
};

export default AdditionalInfo;
