import React, { useState } from 'react';
import styles from './mainInfo.module.scss';

const MainInfo = () => {
  const [nameCounter, setNameCounter] = useState(0);
  const [descCounter, setDescCounter] = useState(0);
  const [portion, setPortion] = useState(0);

  function nameChange(event) {
    setNameCounter(event.target.value.length);
  }

  function descChange(event) {
    setDescCounter(event.target.value.length);
  }

  function incrementPortion() {
    setPortion(portion + 1);
  }

  function decrementPortion() {
    setPortion(portion - 1);
  }

  return (
    <>
      <h3 className={styles.title}>Название рецепта</h3>
      <div className={styles.wrap}>
        <input
          className={styles.name_input}
          onChange={nameChange}
          type="text"
          name="recipe"
          id="recipe"
          placeholder="Название вашего блюда"
          minLength="2"
          maxLength="100"
          pattern="^[а-яА-Яa-zA-Z-_ ]+$"
          data-error-message="Разрешены только латинские буквы, кириллические буквы, знаки дефиса и пробелы."
          required
        />
        <p className={styles.counter}>{nameCounter} / 100</p>
      </div>
      <div className={styles.wrap_complexity}>
        <div className={styles.complexity}>
          <p className={styles.title}>Сложность</p>
          <ul className={styles.stars}>
            <li className={styles.star} />
            <li className={styles.star} />
            <li className={styles.star} />
          </ul>
        </div>
        <div>
          <p className={styles.title}>Количество порций</p>
          <div className={styles.wrap_counter}>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonMinus}`}
              onClick={decrementPortion}
              disabled={portion === 0 && true}
              aria-label="Минус"
            >
              {' '}
            </button>
            <p
              className={
                portion === 0
                  ? styles.portion
                  : `${styles.portion} ${styles.portion_active}`
              }
            >
              {portion}
            </p>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPlus}`}
              onClick={incrementPortion}
              aria-label="Плюс"
            >
              {' '}
            </button>
          </div>
        </div>
      </div>
      <p className={styles.title}>Время приготовления</p>
      <div className={styles.wrap_count}>
        <div className={styles.wrap_totalTime}>
          <h4 className={styles.totalTime}>Всего</h4>
          <label htmlFor="allhours" className={styles.label}>
            <input
              type="text"
              id="allhours"
              placeholder="0"
              pattern="[0-23]"
              className={styles.time}
            />
            &nbsp;час(ов)
          </label>
          <label htmlFor="allminutes" className={styles.label}>
            <input
              type="text"
              id="allminutes"
              placeholder="0"
              pattern="[0-59]"
              className={styles.time}
            />
            &nbsp;минут
          </label>
        </div>
        <div className={styles.wrap_cookTime}>
          <p className={styles.cookTime}>Время &quot;У плиты&quot;</p>
          <label htmlFor="cookhours" className={styles.label}>
            <input
              type="text"
              id="cookhours"
              placeholder="0"
              pattern="[0-23]"
              className={styles.time}
            />
            &nbsp;час(ов)
          </label>
          <label htmlFor="cookminutes" className={styles.label}>
            <input
              type="text"
              id="cookminutes"
              placeholder="0"
              pattern="[0-59]"
              className={styles.time}
            />
            &nbsp;минут
          </label>
        </div>
      </div>
      <p className={styles.title}>Описание</p>
      <div className={styles.wrap_description}>
        <p className={styles.description}>Кратко расскажите о вашем рецепте.</p>
        <p className={styles.description}>
          Например, какой у него вкус, особенности, или как вы о нём узнали.
        </p>
      </div>
      <div className={styles.descinput_wrap}>
        <textarea
          className={styles.desc_input}
          onChange={descChange}
          name="recipedesc"
          id="recipedesc"
          placeholder="Описание рецепта"
          minLength="2"
          maxLength="500"
          pattern="^[а-яА-Яa-zA-Z-_ ]+$"
          data-error-message="Разрешены только латинские буквы, кириллические буквы, знаки дефиса и пробелы."
          required
        />
        <p className={`${styles.counter} ${styles.desc_counter}`}>
          {descCounter} / 500
        </p>
      </div>
      <p className={styles.title}>Фото готового блюда</p>
      <p className={styles.fotoReqs}>Требования к фото:</p>
      <ul className={styles.reqlist}>
        <li className={styles.reqlist_item}>Форматы JPEG, JPG, PNG или WEBP</li>
        <li className={styles.reqlist_item}>
          Размер файла не больше&nbsp;
          <span className={styles.reqlist_accent}>5 мб</span>
        </li>
      </ul>
    </>
  );
};
export default MainInfo;
