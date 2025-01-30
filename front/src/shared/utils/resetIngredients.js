import { resetSelected } from 'store/slices/ingredients/ingredientsSlice';
import { reset } from 'store/slices/search/searchSlice';

const resetIngredients = (dispatch) => {
  dispatch(reset());
  dispatch(resetSelected());
};

export default resetIngredients;
