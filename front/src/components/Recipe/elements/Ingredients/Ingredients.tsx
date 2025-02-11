import { formatMeasureUnit } from 'helpers/utils';
import { TRecipeIngredient } from 'shared/types/recipe';
import styles from './Ingredients.module.scss';

type TIngredientsProps = {
  list: Array<TRecipeIngredient>;
};

export const Ingredients = ({ list }: TIngredientsProps) => {
  return (
    <section className={styles.ingredientsWrapper}>
      <h2 className={styles.title}>Вам понадобится</h2>
      <ul className={styles.ingredients}>
        {list.map((item) => (
          <li key={item.id} className={styles.ingredient}>
            <span>{item.name}</span>
            <span className={styles.divider}></span>
            <span className={styles.volume}>
              {item.volume} {formatMeasureUnit(item.measure.label)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
