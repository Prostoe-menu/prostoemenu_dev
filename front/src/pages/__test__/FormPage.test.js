/* eslint-disable   */
import React from 'react';
import { screen } from '@testing-library/react';
import FormPage from '../FormPage';
import testUtils from '../../test-utils/test-with-store';
import { filledTestFormState } from '../../test-utils/store-test-state';

describe('страница добавления рецепта', () => {
  test('должна отображать форму ОСНОВНАЯ ИНФОРМАЦИЯ на первом этапе', () => {
    const state = testUtils.getStateWithItems('form', {
      ...filledTestFormState,
      currentFormStage: 1,
    });
    testUtils.renderWithContext(<FormPage />, state);

    const formName = screen.getByRole('heading', {
      name: /основная информация/i,
    });

    expect(formName).toBeInTheDocument();
  });
  test('должна отображать форму ИНГРЕДИЕНТЫ на втором этапе', () => {
    const state = testUtils.getStateWithItems('form', {
      ...filledTestFormState,
      currentFormStage: 2,
    });
    testUtils.renderWithContext(<FormPage />, state);

    const formName = screen.getByRole('heading', {
      name: /ингредиенты/i,
    });

    expect(formName).toBeInTheDocument();
  });
  test('должна отображать форму ЭТАПЫ ГОТОВКИ на третьем этапе', () => {
    const state = testUtils.getStateWithItems('form', {
      ...filledTestFormState,
      currentFormStage: 3,
    });
    testUtils.renderWithContext(<FormPage />, state);

    const formName = screen.getByRole('heading', {
      name: /этапы готовки/i,
    });

    expect(formName).toBeInTheDocument();
  });
  test('должна отображать форму ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ на четвертом этапе', () => {
    const state = testUtils.getStateWithItems('form', {
      ...filledTestFormState,
      currentFormStage: 4,
    });
    testUtils.renderWithContext(<FormPage />, state);

    const formName = screen.getByRole('heading', {
      name: /дополнительная информация/i,
    });

    expect(formName).toBeInTheDocument();
  });
});
