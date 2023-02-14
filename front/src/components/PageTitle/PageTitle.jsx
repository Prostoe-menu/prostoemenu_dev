import React from 'react';
import styles from './pageTitle.module.scss';

const PageTitle = ({ children }) => (
  <h1 className={styles.title}>{children}</h1>
);

export default PageTitle;
