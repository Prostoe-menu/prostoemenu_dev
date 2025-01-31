import cn from 'classnames';
import { STARS_TOTAL } from 'utils/constants';
import StarSVG from 'assets/images/star.svg?react';
import styles from './StarRating.module.scss';

type TStarRatingProps = {
  label: string;
  rating: number;
};

const StarRating = ({ label, rating }: TStarRatingProps) => {
  const stars = [...Array(STARS_TOTAL)].map((_, idx) => {
    return (
      <StarSVG
        className={cn({ [styles.active]: rating > idx })}
        key={crypto.randomUUID()}
      />
    );
  });

  return (
    <span className={styles.stars}>
      <span className={styles.label}>{label}:</span>
      {stars}
    </span>
  );
};

export default StarRating;
