import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeList from 'components/RecipeList/RecipeList';
import RecipeSearch from 'components/RecipeSearch/RecipeSearch';
import { ErrorMessage, Loader } from 'components/UI';
import fetchRecipes from 'store/slices/recipe/recipeThunk';

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
