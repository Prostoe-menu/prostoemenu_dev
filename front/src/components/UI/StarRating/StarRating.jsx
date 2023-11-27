import StarSVG from 'images/star.svg?react';
import cn from 'classnames';
import { v4 as uuidV4 } from 'uuid';
import { STARS_TOTAL } from 'utils/constants';
import styles from './StarRating.module.scss';

const StarRating = ({ label, amount }) => {
  const stars = [...Array(STARS_TOTAL)].map((_, id) => (
    <StarSVG
      className={cn({ [styles.active]: id + 1 <= amount })}
      key={uuidV4()}
    />
  ));

  return (
    <div className={styles.stars}>
      <span className={styles.label}>{label}:</span>
      {stars}
    </div>
  );
};

export default StarRating;
