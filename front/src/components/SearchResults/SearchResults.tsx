import RecipeList from 'components/RecipeList';
import { useAppSelector } from 'store/hooks';
import ErrorMessage from 'ui/ErrorMessage';
import Loader from 'ui/Loader';
import styles from './SearchResults.module.scss';

const SearchResults = () => {
  const { recipes, isSearch, isLoading, errorMessage } = useAppSelector(
    (state) => state.search
  );

  if (!recipes || !isSearch) return;

  const { results, count } = recipes;

  return (
    <>
      {isLoading && <Loader />}

      {errorMessage && <ErrorMessage message={errorMessage} />}

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
