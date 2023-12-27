import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeList from 'components/RecipeList/RecipeList';
import Loader from 'components/UI/Loader/Loader';
import fetchRecipes from 'store/slices/recipe/recipeThunk';
import RecipeSearch from 'components/RecipeSearch/RecipeSearch';

const HomePage = () => {
  const { recipes, isLoading, isError, errorMessage } = useSelector(
    (state) => state.recipe
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <>
      <RecipeSearch />

      {isLoading && <Loader />}

      {isError && <div className="error-message">{errorMessage}</div>}

      {!isLoading && !isError && recipes && (
        <RecipeList title="Каталог рецептов" recipes={recipes} />
      )}
    </>
  );
};

export default HomePage;
