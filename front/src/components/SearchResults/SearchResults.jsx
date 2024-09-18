import { useSelector } from 'react-redux';
import RecipeList from 'components/RecipeList';
import { ErrorMessage, Loader } from 'ui';

const SearchResults = () => {
  const { recipes, isSearch, isLoading, isError, errorMessage } = useSelector(
    (state) => state.search
  );

  if (!recipes || !isSearch) return;

  const { results, count } = recipes;

  return (
    <>
      {isLoading && <Loader />}

      {isError && <ErrorMessage message={errorMessage} />}

      {<RecipeList title={`Найдено рецептов: ${count}`} recipes={results} />}
    </>
  );
};

export default SearchResults;
