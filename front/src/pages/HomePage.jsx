import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeList from 'components/RecipeList';
import RecipeSearch from 'components/RecipeSearch';
import fetchRecipes from 'store/slices/recipe/recipeThunk';
import { ErrorMessage, Loader } from 'ui';

const HomePage = () => {
  const dispatch = useDispatch();
  const { recipes, isLoading, isError, errorMessage } = useSelector(
    (state) => state.recipe
  );

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <>
      <RecipeSearch />

      {isLoading && <Loader />}

      {isError && <ErrorMessage message={errorMessage} />}

      {!isLoading && !isError && recipes?.length > 0 && (
        <RecipeList title="Каталог рецептов" recipes={recipes} />
      )}
    </>
  );
};

export default HomePage;
