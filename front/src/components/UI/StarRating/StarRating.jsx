import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import StarActiveSVG from 'images/star-filled.svg';
import StarSVG from 'images/star.svg';
import { STARS_TOTAL } from 'utils/constants';
import styles from './StarRating.module.scss';

const StarRating = ({ label, amount }) => {
  const stars = [...Array(STARS_TOTAL)].map((_, id) => {
    const imgSrc = id + 1 <= amount ? StarActiveSVG : StarSVG;

    return (
      <img
        src={imgSrc}
        key={uuidV4()}
        alt={`Сложность рецепта ${amount}`}
        width="22"
        height="22"
      />
      // <StarSVG
      //   className={cn({ [styles.active]: id + 1 <= amount })}
      //   key={uuidV4()}
      // />
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
