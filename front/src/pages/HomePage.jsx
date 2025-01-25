import NewRecipes from 'components/NewRecipes/NewRecipes';
import RecipeSearch from 'components/RecipeSearch';
import SearchResults from 'components/SearchResults';
import ScrollUpButton from 'ui/ScrollUpButton';

const HomePage = () => {
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
