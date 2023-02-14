import React from 'react';
import Toast from '../Toast/Toast';
import PageTitle from '../PageTitle/PageTitle';
import Style from './App.module.scss';

const App = () => (
  <div className={Style.app}>
    <PageTitle>Добавить новый рецепт</PageTitle>
    <Toast>Какая-то ошибка</Toast>
  </div>
);

export default App;
