import { useSelector } from 'react-redux';
import RecipeList from 'components/RecipeList';
import { ErrorMessage, Loader } from 'ui';
import styles from './SearchResults.module.scss';

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

      {!count && (
        <>
          <h2 className={styles.title}>
            К сожалению, нет подходящих рецептов.
          </h2>
          <p className={styles.subTitle}>
            Попробуйте изменить список продуктов или начать поиск заново.
          </p>
        </>
      )}

      {count > 0 && (
        <RecipeList title={`Найдено рецептов: ${count}`} recipes={results} />
      )}
    </>
  );
};

export default SearchResults;
