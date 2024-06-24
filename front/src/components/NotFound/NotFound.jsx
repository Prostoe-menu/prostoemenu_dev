import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'ui/Button';
import styles from './NotFound.module.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.body}>
      <h1 className={styles.title}>
        К сожалению, такая страница не найдена...
      </h1>
      <img
        className={styles.image}
        src="src/assets/images/404.svg"
        alt="Ошибка 404"
      />
      <Button
        className={styles.btn}
        onClick={() => {
          navigate('/');
        }}
      >
        На главную
      </Button>
    </main>
  );
};

export default NotFound;
