import RecipeCard from './RecipeCard/RecipeCard';
import styles from './RecipeList.module.scss';

const RecipeList = ({ title, recipes }) => (
  <>
    {title && <h2 className={styles.title}>{title}</h2>}

    {recipes.length && (
      <ul className={styles.recipeList}>
        {recipes.map((recipe, idx) => (
          <RecipeCard recipe={recipe} key={`${recipe.id}-${idx}`} />
        ))}
      </ul>
    )}
  </>
);

export default RecipeList;
