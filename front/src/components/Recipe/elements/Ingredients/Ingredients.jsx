import styles from './Ingredients.module.scss';

export const Ingredients = ({ list }) => {
  return (
    <section className={styles.ingredientsWrapper}>
      <h2 className={styles.title}>Вам понадобится</h2>
      <ul className={styles.inrgedients}>
        {list.map((item) => (
          <li key={item.id} className={styles.ingredient}>
            <span>{item.name}</span>
            <span className={styles.line}></span>
            <span className={styles.volume}>
              {item.volume} {item.measure_unit}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
