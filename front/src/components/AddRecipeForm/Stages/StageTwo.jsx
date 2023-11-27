import Ingredients from 'components/AddRecipeForm/Ingredients/Ingredients';
import RecipeBox from 'components/AddRecipeForm/RecipeBox/RecipeBox';
import RecipeTitle from 'components/AddRecipeForm/RecipeTitle/RecipeTitle';

const StageTwo = () => (
  <RecipeBox>
    <RecipeTitle>Ингредиенты</RecipeTitle>
    <Ingredients />
  </RecipeBox>
);

export default StageTwo;
