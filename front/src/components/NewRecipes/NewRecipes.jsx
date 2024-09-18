import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeList from 'components/RecipeList';
import { fetchRecipes } from 'store/slices/recipe/recipeThunk';
import { ErrorMessage, Loader } from 'ui';
import MoreRecipesButton from './MoreRecipesButton';

const NewRecipes = () => {
  const dispatch = useDispatch();

  const { recipes, next, isLoading, isError, errorMessage } = useSelector(
    (state) => state.recipe
  );

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}

      {isError && <ErrorMessage message={errorMessage} />}

      {!isLoading && !isError && recipes && (
        <RecipeList title="Каталог рецептов" recipes={recipes} />
      )}

      <MoreRecipesButton moreUrl={next} />
    </>
  );
};

export default NewRecipes;
