import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeList from 'components/RecipeList/RecipeList';
import fetchRecipes from 'store/slices/recipe/recipeThunk';

const HomePage = () => {
  const recipes = useSelector((state) => state.recipe.recipes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  if (!recipes)
    return (
      <div className="loading">
        Пожалуйста, подождите, выполняется загрузка...
      </div>
    );

  return <RecipeList title="Каталог рецептов" recipes={recipes} />;
};

export default HomePage;
