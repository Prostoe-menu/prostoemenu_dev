import React from 'react';
import styles from './AdditionalInfo.module.scss';

const AdditionalInfo = () => {
  const [description, setDescription] = React.useState('');

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  return (
    <section className={styles.additionalInfo}>
      <h2 className={styles.additionalInfo__header}>
        Дополнительная информация
      </h2>
      <div className={styles.additionalInfo__comment}>
        <div className={styles.description}>
          <h3 className={styles.description__subtitle}>Примечание </h3>
          <p className={styles.description__text}>
            В этом поле вы можете написать дополнительную информацию о рецепте:
            как подавать блюдо, чем его можно украсить и с чем сочетать.
          </p>
        </div>
        <div className={styles.additionalInfo__textArea}>
          <textarea
            className={styles.additionalInfo__textAreaText}
            placeholder={styles.Примечание}
            name={styles.info}
            id=""
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
  );
};

export default AdditionalInfo;
