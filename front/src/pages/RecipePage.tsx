import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'ui/Loader';
import Recipe from 'components/Recipe';
import ErrorMessage from 'ui/ErrorMessage';
import ScrollUpButton from 'ui/ScrollUpButton';
import { fetchRecipeByID } from 'store/slices/recipe/recipeThunk';
import { useAppDispatch, useAppSelector } from 'store/hooks';

export const RecipePage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { recipe, isLoading, isError, errorMessage } = useAppSelector(
    (state) => state.recipe
  );

  useEffect(() => {
    id && dispatch(fetchRecipeByID(id));
  }, [dispatch, id]);

  return (
    <>
      {isError && errorMessage && <ErrorMessage message={errorMessage} />}

      {isLoading && <Loader />}

      {!isLoading && !isError && recipe && <Recipe item={recipe} />}

      <ScrollUpButton />
    </>
  );
};
