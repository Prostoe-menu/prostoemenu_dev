import React from 'react';
import { useSelector } from 'react-redux';

import PageTitle from '../PageTitle/PageTitle';

import StageOne from '../Stages/StageOne';
import Style from './AddRecipe.module.scss';
import StageTwo from '../Stages/StageTwo';
import StageThree from '../Stages/StageThree';
import StageFour from '../Stages/StageFour';
import ProgressBar from '../ProgressBar/ProgressBar';

const AddRecipe = () => {
  const currentStage = useSelector((state) => state.form.currentFormStage);

  return (
    <main className={Style.content}>
      <PageTitle>Добавить новый рецепт</PageTitle>

      <div className={Style.container}>
        <ProgressBar activeStep={currentStage} />
        {currentStage === 1 && <StageOne />}
        {currentStage === 2 && <StageTwo />}
        {currentStage === 3 && <StageThree />}
        {currentStage === 4 && <StageFour />}
      </div>
    </main>
  );
};

export default AddRecipe;
