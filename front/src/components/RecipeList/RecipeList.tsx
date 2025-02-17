import { IRecipe } from 'shared/types/recipe';
import RecipeCard from './RecipeCard/RecipeCard';
import styles from './RecipeList.module.scss';

type TRecipeListProps = {
  title: string;
  recipes: Array<IRecipe>;
};

const RecipeList: React.FC<TRecipeListProps> = ({ title, recipes }) => {
  if (!recipes) return;

  return (
    <section>
      {title && <h2 className={styles.title}>{title}</h2>}

      {recipes.length > 0 && (
        <ul className={styles.recipeList}>
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={`${recipe.id}-[${title}]`} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecipeList;
