import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { goToStep } from 'store/slices/form/formSlice';
import styles from './ProgressBar.module.scss';

type TProgressBarProps = {
  currentIndex: number;
  steps: Array<{ title: string; path: string }>;
};

const ProgressBar = ({ currentIndex, steps }: TProgressBarProps) => {
  const dispatch = useDispatch();

  const clickHandler = (
    event: MouseEvent<HTMLLIElement>,
    stepIndex: number
  ) => {
    event.preventDefault();

    dispatch(goToStep(stepIndex));
  };

  return (
    <aside>
      <div className={styles.progress}>
        <ul className={styles.list}>
          {steps.map(({ title, path }, i) => {
            if (i + 1 <= currentIndex) {
              return (
                <li
                  className={cn(styles.item, styles.active)}
                  key={path}
                  onClick={(event) => clickHandler(event, i + 1)}
                >
                  {title}
                </li>
              );
            }
            return (
              <li className={styles.item} key={path}>
                {title}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default ProgressBar;
