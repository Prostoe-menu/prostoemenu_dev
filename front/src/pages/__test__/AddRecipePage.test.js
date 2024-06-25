/* eslint-disable   */
import { screen } from '@testing-library/react';
import React from 'react';
import { filledTestFormState } from 'test-utils/store-test-state';
import testUtils from 'test-utils/test-with-store';
import AddRecipePage from 'pages/AddRecipePage';

describe('страница добавления рецепта', () => {
  test('должна отображать форму ОСНОВНАЯ ИНФОРМАЦИЯ на первом этапе', () => {
    const state = testUtils.getStateWithItems('form', {
      ...filledTestFormState,
      currentFormStage: 1,
    });
    testUtils.renderWithContext(<AddRecipePage />, state);

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
    testUtils.renderWithContext(<AddRecipePage />, state);

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
    testUtils.renderWithContext(<AddRecipePage />, state);

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
    testUtils.renderWithContext(<AddRecipePage />, state);

    const formName = screen.getByRole('heading', {
      name: /дополнительная информация/i,
    });

    expect(formName).toBeInTheDocument();
  });
});
