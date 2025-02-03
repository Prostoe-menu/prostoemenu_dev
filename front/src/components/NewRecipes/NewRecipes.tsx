import { useEffect } from 'react';
import RecipeList from 'components/RecipeList';
import { fetchRecipes } from 'store/slices/recipe/recipeThunk';
import ErrorMessage from 'ui/ErrorMessage';
import Loader from 'ui/Loader';
import MoreRecipesButton from './MoreRecipesButton';
import { useAppDispatch, useAppSelector } from 'store/hooks';

const NewRecipes = () => {
  const dispatch = useAppDispatch();

  const { recipes, next, isLoading, isError, errorMessage } = useAppSelector(
    (state) => state.recipe
  );

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}

      {isError && errorMessage && <ErrorMessage message={errorMessage} />}

      {!isLoading && !isError && recipes && (
        <RecipeList title="Вам может понравиться" recipes={recipes} />
      )}

      <MoreRecipesButton moreUrl={next} />
    </>
  );
};

export default NewRecipes;
