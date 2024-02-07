import { Ingredients, Steps } from './elements';

// import styles from './Recipe.module.scss';

export const Recipe = ({ item }) => {
  const {
    name,
    description,
    complexity,
    cooking_time,
    oven_time,
    ingredients,
    steps,
  } = item;
  return (
    <article>
      {name}
      <p>{description}</p>
      complexity: {complexity}
      cooking_time: {cooking_time}
      oven_time: {oven_time}
      {ingredients?.length > 0 && <Ingredients list={ingredients} />}
      {steps?.length > 0 && <Steps list={steps} />}
    </article>
  );
};
