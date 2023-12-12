import RecipeCard from './RecipeCard/RecipeCard';
import styles from './RecipeList.module.scss';

const RecipeList = ({ title, recipes }) => (
  <>
    {title && <h2 className={styles.title}>{title}</h2>}

    {recipes.length && (
      <section className={styles.recipeList}>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </section>
    )}
  </>
);

export default RecipeList;
