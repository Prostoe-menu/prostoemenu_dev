import { ScrollUpButton } from 'ui/ScrollUpButton';
import RecipeCard from './RecipeCard/RecipeCard';
import styles from './RecipeList.module.scss';

const RecipeList = ({ title, recipes }) => (
  <section>
    {title && <h2 className={styles.title}>{title}</h2>}

    {recipes.length && (
      <ul className={styles.recipeList}>
        {recipes.map((recipe, idx) => (
          <RecipeCard recipe={recipe} key={`${recipe.id}-${idx}`} />
        ))}
      </ul>
    )}

    <ScrollUpButton />
  </section>
);

export default RecipeList;
