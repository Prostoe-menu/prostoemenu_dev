import { useCallback, useEffect, useState } from 'react';
import Button from 'ui/Button';
import SVGArrowUp from 'assets/images/arrow-up.svg?react';
import styles from './ScrollUpButton.module.scss';

const ScrollUpButton = () => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  const scrollHandler = () => {
    window.scrollY > 700 ? setIsShow(true) : setIsShow(false);
  };

  const clickHandler = useCallback((event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    isShow && (
      <Button
        view="tertiary"
        className={styles.btn}
        onClick={clickHandler}
        aria-label="Наверх"
      >
        <SVGArrowUp />
      </Button>
    )
  );
};

export default ScrollUpButton;
