import { useState } from 'react';
import cn from 'classnames';
import StarSVG from 'assets/images/star.svg?react';
import styles from './Rating.module.scss';

type TRatingProps = {
  starsCount: number;
  voteHandler: (val: number) => void;
};

export const Rating = ({
  starsCount,
  voteHandler,
  ...params
}: TRatingProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const stars = [...Array(starsCount)].map((_, idx) => {
    return (
      <StarSVG
        className={cn(styles.star, {
          [styles.active]: activeIndex != null && activeIndex >= idx,
        })}
        key={crypto.randomUUID()}
        onClick={() => {
          if (idx === activeIndex) {
            voteHandler(0);
            setActiveIndex(null);
          } else {
            voteHandler(idx + 1);
            setActiveIndex(idx);
          }
        }}
      />
    );
  });

  return (
    <span className={styles.stars} {...params}>
      {stars}
    </span>
  );
};
