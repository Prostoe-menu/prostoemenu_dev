import React from 'react';
import { useSelector } from 'react-redux';
import PageTitle from 'components/PageTitle/PageTitle';
import StageOne from 'components/AddRecipeForm/Stages/StageOne';
import StageTwo from 'components/AddRecipeForm/Stages/StageTwo';
import StageThree from 'components/AddRecipeForm/Stages/StageThree';
import StageFour from 'components/AddRecipeForm/Stages/StageFour';
import ProgressBar from 'components/AddRecipeForm/ProgressBar/ProgressBar';
import Style from './AddRecipeForm.module.scss';

const AddRecipeForm = () => {
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

export default AddRecipeForm;
