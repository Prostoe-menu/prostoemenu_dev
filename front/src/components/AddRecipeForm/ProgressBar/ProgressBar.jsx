import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import { changeCurrentStage } from 'store/slices/form/formSlice';
import { progressBarSteps } from 'utils/constants';
import styles from './ProgressBar.module.scss';

const ProgressBar = ({ activeStep }) => {
  const dispatch = useDispatch();

  return (
    <aside className={styles.progress}>
      <ul className={styles.list}>
        {progressBarSteps.map((item, i) => (
          <li
            className={classnames(styles.item, {
              [styles.item_active]: i + 1 === activeStep,
            })}
            key={item.id}
            onClick={() => {
              dispatch(changeCurrentStage(i + 1));
            }}
          >
            <div className={styles.round} />
            <div className={styles.text}>{item.text}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ProgressBar;
