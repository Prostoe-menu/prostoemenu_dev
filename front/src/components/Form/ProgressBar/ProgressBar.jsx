/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch } from 'react-redux';
import { changeCurrentStage } from '../../../store/slices/form/formSlice';
import { progressBarSteps } from '../../../utils/constants';

import styles from './ProgressBar.module.scss';

const ProgressBar = ({ activeStep }) => {
  const dispatch = useDispatch();

  return (
    <aside className={styles.progress}>
      <ul className={styles.progress__list}>
        {progressBarSteps.map((item, i) => (
          <li
            onClick={() => {
              dispatch(changeCurrentStage(i + 1));
            }}
            className={`${styles.progress__item} ${
              i + 1 === activeStep ? styles.progress__item_active : ''
            }`}
          >
            <div className={styles.progress__round} />

            <div className={styles.progress__text}>{item.text}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ProgressBar;
