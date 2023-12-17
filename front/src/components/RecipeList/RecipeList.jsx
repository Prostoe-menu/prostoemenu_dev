import RecipeCard from './RecipeCard/RecipeCard';
import styles from './RecipeList.module.scss';

const RecipeList = ({ title, recipes }) => (
  <>
    {title && <h2 className={styles.title}>{title}</h2>}

    {recipes.length && (
      <ul className={styles.recipeList}>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    )}
  </>
);

export default RecipeList;
