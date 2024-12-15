import { createSelector } from '@reduxjs/toolkit';

export const selectMainInfo = (state) => state.form.mainInfo;

export const selectStepIndex = (state) => state.form.step;

export const selectCoverPhoto = createSelector(
  [selectMainInfo],
  (data) => data.cover_path
);

export const selectIngredients = (state) => state.form.ingredients;

export const selectMeasureOptions = (state) => state.form.measureOptions;
