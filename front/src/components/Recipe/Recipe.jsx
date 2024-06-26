import { Ingredients, MainInfo, Steps } from './elements';

const Recipe = ({ item }) => {
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
