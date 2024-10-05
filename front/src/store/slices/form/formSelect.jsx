import { createSelector } from '@reduxjs/toolkit';

export const selectMainInfo = (state) => state.form.mainInfo;

export const selectStepIndex = (state) => state.form.step;

export const selectCoverPhoto = createSelector(
  [selectMainInfo],
  (data) => data.cover_path
);
