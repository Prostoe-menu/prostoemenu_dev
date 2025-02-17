import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

export const selectMainInfo = (state: RootState) => state.form.mainInfo;

export const selectStepIndex = (state: RootState) => state.form.step;

export const selectCoverPhoto = createSelector(
  [selectMainInfo],
  (data) => data.cover_path
);

export const selectIngredients = (state: RootState) => state.form.ingredients;

export const selectMeasureOptions = (state: RootState) =>
  state.form.measureOptions;
