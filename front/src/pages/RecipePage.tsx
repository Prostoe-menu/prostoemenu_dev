//import { useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
//import Recipe from 'components/Recipe';
//import { fetchRecipeByID } from 'store/slices/recipe/recipeThunk';
//import { ErrorMessage, Loader } from 'ui';
//import ScrollUpButton from 'ui/ScrollUpButton';

export const RecipePage = () => {
  const { id } = useParams();
  //const dispatch = useDispatch();
  // const { recipe, isLoading, isError, errorMessage } = useSelector(
  //   (state) => state.recipe
  // );

  // useEffect(() => {
  //   dispatch(fetchRecipeByID(id));
  // }, [dispatch, id]);

  return (
    <>
      loading...
      {/* {isError && <ErrorMessage message={errorMessage} />}

      {isLoading && <Loader />}

      {!isLoading && !isError && recipe && <Recipe item={recipe} />}

      <ScrollUpButton /> */}
    </>
  );
};
