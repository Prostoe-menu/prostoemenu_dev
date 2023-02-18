import React, { useState } from 'react';
import styles from './mainInfo.module.scss';

const MainInfo = () => {
  const [nameCounter, setNameCounter] = useState(0);
  const [descCounter, setDescCounter] = useState(0);

  function nameChange(event) {
    setNameCounter(event.target.value.length);
  }

  function descChange(event) {
    setDescCounter(event.target.value.length);
  }

  return (
    <>
      <h2 className={styles.title}>Название рецепта</h2>
      <div className={styles.wrap}>
        {/* <form className={styles.form} name="recipe-name"> */}
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
        {/* <p className={styles.inputerror}>Error message</p> */}
        {/* </form> */}
      </div>
      <div className={styles.wrap_count}>
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
              className={`${styles.button} ${styles.buttonminus}`}
            >
              {' '}
            </button>
            <p className={styles.portion}>0</p>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonplus}`}
            >
              {' '}
            </button>
          </div>
        </div>
      </div>
      <p className={styles.title}>Время приготовления</p>
      <div className={styles.wrap_count}>
        <div className={styles.wrap_alltime}>
          <p className={styles.alltime}>Всего</p>
          <label htmlFor="allhours" className={styles.label}>
            <input
              type="text"
              id="allhours"
              placeholder="0"
              className={styles.time}
            />
            &nbsp;час(ов)
          </label>
          <label htmlFor="allminutes" className={styles.label}>
            <input
              type="text"
              id="allminutes"
              placeholder="0"
              className={styles.time}
            />
            &nbsp;минут
          </label>
        </div>
        <div className={styles.wrap_cooktime}>
          <p className={styles.cooktime}>Время &quot;У плиты&quot;</p>
          <label htmlFor="cookhours" className={styles.label}>
            <input
              type="text"
              id="cookhours"
              placeholder="0"
              className={styles.time}
            />
            &nbsp;час(ов)
          </label>
          <label htmlFor="cookminutes" className={styles.label}>
            <input
              type="text"
              id="cookminutes"
              placeholder="0"
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
        {/* <form className={styles.form} name="recipe-name"> */}
        <textarea
          className={styles.desc_input}
          onChange={descChange}
          rows="5"
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
        {/* <p className={styles.inputerror}>Error message</p> */}
        {/* </form> */}
      </div>
      <p className={styles.title}>Фото готового блюда</p>
      <p className={styles.foto}>Требования к фото:</p>
      <ul className={styles.reqlist}>
        <li>
          <span className={styles.reqlist_item}>
            Форматы JPEG, JPG, PNG или WEBP
          </span>
        </li>
        <li>
          <span className={styles.reqlist_item}>
            Размер файла не больше <span>5 мб</span>
          </span>
        </li>
      </ul>
    </>
  );
};
export default MainInfo;
