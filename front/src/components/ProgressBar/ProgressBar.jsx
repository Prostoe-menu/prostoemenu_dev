/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { progressBarSteps } from '../../utils/constants';

import styles from './ProgressBar.module.scss';

const ProgressBar = ({ activeStep }) => (
  <aside className={styles.progress}>
    <ul className={styles.progress__list}>
      {progressBarSteps.map((item, i) => (
        <li
          className={`${styles.progress__item} ${
            i === activeStep ? styles.progress__item_active : ''
          }`}
        >
          <div className={styles.progress__round} />
          <Link to={item.path} className={styles.progress__text}>
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  </aside>
);

export default ProgressBar;
