import styles from './RecipeTitle.module.scss';

const RecipeTitle = ({ children }) => (
  <h2 className={styles.title}>{children}</h2>
);

export default RecipeTitle;
