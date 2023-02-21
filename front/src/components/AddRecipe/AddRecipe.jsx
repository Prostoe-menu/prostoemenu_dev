import React from 'react';
import Style from './AddRecipe.module.scss';

import PageTitle from '../PageTitle/PageTitle';
import ProgressBar from '../ProgressBar/ProgressBar';

const AddRecipe = () => (
  <main className={Style.content}>
    <PageTitle>Добавить новый рецепт</PageTitle>
    <ProgressBar activeStep={2} />
  </main>
);

export default AddRecipe;
