import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import RecipeList from 'components/RecipeList';
import { fetchRecipes } from 'store/slices/recipe/recipeThunk';
import { ErrorMessage, Loader } from 'ui';

const NewRecipes = () => {
  const dispatch = useDispatch();

  const { recipes, isLoading, isError, errorMessage } = useSelector(
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
        <RecipeList title="Каталог рецептов" recipes={recipes.results} />
      )}
    </>
  );
};

export default NewRecipes;
