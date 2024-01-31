import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/UI/Button/Button';
import styles from './NotFound.module.scss';

const NotFound = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  };

  return (
    <main className={styles.body}>
      <h1 className={styles.header}>
        К сожалению, такая страница не найдена...
      </h1>
      <img
        className={styles.image}
        src="src/assets/images/404.svg"
        alt="Ошибка 404"
      />
      <Button className={styles.btn} onClick={onClick}>
        На главную
      </Button>
    </main>
  );
};

export default NotFound;
