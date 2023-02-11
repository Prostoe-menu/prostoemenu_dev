import React from 'react';
import Toast from '../Toast/Toast';
import PageTitle from '../PageTitle/PageTitle';
import Style from './App.module.scss';
import RecipeBox from '../RecipeBox/RecipeBox';

const App = () => (
  <div className={Style.app}>
    <PageTitle />
    <RecipeBox>
      <input type="text" placeholder="some text here" />
      <input type="text" placeholder="some text here" />
      <input type="text" placeholder="some text here" />
    </RecipeBox>
    <h1 className={Style.header1}>Сырники из творога Как готовить?</h1>
    <h1 className={Style.header2}>Сырники из творога Как готовить?</h1>
    <p className={Style.paragraph1}>
      Главный секрет идеальных сырников, а точнее творожников, творог нужно
      протереть через мелкое сито и отжать от влаги. Жирность предпочтительна не
      больше и не меньше 9%. Тесто должно получиться эластичным, чтобы при
      надавливании сырник не треснул на сковородке, а сохранил форму.
    </p>
    <p className={Style.paragraph2}>
      Главный секрет идеальных сырников, а точнее творожников, творог нужно
      протереть через мелкое сито и отжать от влаги. Жирность предпочтительна не
      больше и не меньше 9%. Тесто должно получиться эластичным, чтобы при
      надавливании сырник не треснул на сковородке, а сохранил форму.
    </p>
    <p className={Style.paragraph3}>
      Главный секрет идеальных сырников, а точнее творожников, творог нужно
      протереть через мелкое сито и отжать от влаги. Жирность предпочтительна не
      больше и не меньше 9%. Тесто должно получиться эластичным, чтобы при
      надавливании сырник не треснул на сковородке, а сохранил форму.
    </p>
    <Toast>Текст уведомления</Toast>
  </div>
);

export default App;
