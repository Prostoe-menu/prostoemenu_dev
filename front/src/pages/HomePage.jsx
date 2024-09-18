import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NewRecipes from 'components/NewRecipes/NewRecipes';
import RecipeSearch from 'components/RecipeSearch';
import SearchResults from 'components/SearchResults';
import { reset } from 'store/slices/search/searchSlice';
import ScrollUpButton from 'ui/ScrollUpButton';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <>
      <RecipeSearch />

      <SearchResults />

      <NewRecipes />

      <ScrollUpButton />
    </>
  );
};

export default HomePage;
