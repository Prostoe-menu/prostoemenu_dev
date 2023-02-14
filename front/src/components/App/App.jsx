import React from 'react';
import PageTitle from '../PageTitle/PageTitle';
import Button from '../Button/Button';
import Style from './App.module.scss';
import { buttons } from '../../utils/constants';

import addIcon from '../../img/add.svg';
import arrowRight from '../../img/arrow-right.svg';
import arrowLeft from '../../img/arrow-left.svg';

const App = () => (
  <div className={Style.app}>
    <PageTitle>Добавить новый рецепт</PageTitle>
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

    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
      }}
    >
      <Button
        isSubmit={false}
        btnClassName={buttons.withBorder.yellow}
        isDisabled={false}
      >
        Далее
        <img src={arrowRight} alt="" />
      </Button>

      <Button
        isSubmit={false}
        btnClassName={buttons.withBorder.yellow}
        isDisabled
      >
        <img src={arrowLeft} alt="" />
        Назад
      </Button>

      <Button
        isSubmit={false}
        btnClassName={buttons.withBorder.grey}
        isDisabled
      >
        <img src={addIcon} alt="" />
        Добавить ингредиент
      </Button>

      <Button
        isSubmit={false}
        btnClassName={buttons.withBorder.grey}
        isDisabled={false}
      >
        <img src={addIcon} alt="" />
        Добавить шаг
      </Button>

      <Button
        isSubmit={false}
        btnClassName={buttons.withBg.yellow}
        isDisabled={false}
      >
        Хорошо
      </Button>

      <Button isSubmit btnClassName={buttons.withBg.yellow} isDisabled>
        Добавить рецепт
      </Button>
    </div>
  </div>
);

export default App;
