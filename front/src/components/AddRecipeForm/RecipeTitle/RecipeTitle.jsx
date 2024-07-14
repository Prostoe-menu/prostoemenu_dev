import styles from './RecipeTitle.module.scss';

const RecipeTitle = ({ children }) => {
  return (
    <>
      <h2 className={styles.title}>{children}</h2>
      <p className={styles.subTitle}>
        Поля, отмеченные *, обязательны для заполнения
      </p>
    </>
  );
};

export default RecipeTitle;
