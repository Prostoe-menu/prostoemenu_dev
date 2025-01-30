import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { resetSelected } from 'store/slices/ingredients/ingredientsSlice';
import { reset } from 'store/slices/search/searchSlice';

const useResetIngredients = () => {
  const dispatch = useDispatch();

  const resetIngredients = useCallback(() => {
    dispatch(reset());
    dispatch(resetSelected());
  }, [dispatch]);

  return resetIngredients;
};

export default useResetIngredients;
