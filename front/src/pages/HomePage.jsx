import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeList from 'components/RecipeList/RecipeList';
import Loader from 'components/UI/Loader/Loader';
import fetchRecipes from 'store/slices/recipe/recipeThunk';

const HomePage = () => {
  const { recipes, isLoading } = useSelector((state) => state.recipe);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <RecipeList title="Каталог рецептов" recipes={recipes} />
  );
};

export default HomePage;
