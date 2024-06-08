import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Recipe } from 'components/Recipe/Recipe';
import { ErrorMessage, Loader } from 'components/UI';
import { fetchRecipeByID } from 'store/slices/recipe/recipeThunk';

const RecipePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { recipe, isLoading, isError, errorMessage } = useSelector(
    (state) => state.recipe
  );

  useEffect(() => {
    dispatch(fetchRecipeByID(id));
  }, [dispatch, id]);

  return (
    <>
      {isError && <ErrorMessage message={errorMessage} />}

      {isLoading && <Loader />}

      {!isLoading && !isError && recipe && <Recipe item={recipe} />}
    </>
  );
};

export default RecipePage;
