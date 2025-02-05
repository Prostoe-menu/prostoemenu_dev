import { IRecipe } from 'shared/types/recipe';
import { Ingredients, MainInfo, Steps } from './elements';

type TRecipeProps = {
  item: IRecipe;
};

const Recipe = ({ item }: TRecipeProps) => {
  const { ingredients, steps } = item;

  return (
    <article>
      <MainInfo recipe={item} />

      {ingredients?.length > 0 && <Ingredients list={ingredients} />}

      {steps?.length > 0 && <Steps list={steps} />}
    </article>
  );
};

export default Recipe;
