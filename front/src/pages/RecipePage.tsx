import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Recipe from 'components/Recipe';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchRecipeByID } from 'store/slices/recipe/recipeThunk';
import ErrorMessage from 'ui/ErrorMessage';
import Loader from 'ui/Loader';
import ScrollUpButton from 'ui/ScrollUpButton';

export const RecipePage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { recipe, isLoading, isError, errorMessage } = useAppSelector(
    (state) => state.recipe
  );

  useEffect(() => {
    if (id) dispatch(fetchRecipeByID(id));
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
