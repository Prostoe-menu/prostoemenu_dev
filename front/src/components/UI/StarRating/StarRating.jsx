import StarSVG from 'images/star.svg?react';
import classnames from 'classnames';
import { STARS_TOTAL } from 'utils/constants';
import styles from './StarRating.module.scss';

const StarRating = ({ label, rating }) => {
  const stars = [...Array(STARS_TOTAL)].map((_, idx) => {
    return (
      <StarSVG
        className={classnames({ [styles.active]: rating > idx })}
        key={crypto.randomUUID()}
      />
    );
  });

  return (
    <div className={styles.stars}>
      <span className={styles.label}>{label}:</span>
      {stars}
    </div>
  );
};

export default StarRating;
