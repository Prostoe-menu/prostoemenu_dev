/* eslint-disable   */
import React from 'react';
import { screen } from '@testing-library/react';
import MainInfo from '../MainInfo';
import testUtils from '../../../../test-utils/test-with-store';
import {
  initialTestFormState,
  filledTestFormState,
} from '../../../../test-utils/store-test-state';
import '../../../../setupTests';
import userEvent from '@testing-library/user-event';

const text =
  'abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ-0123456789-абвгдеёжзийклмнопрстуфхцчшщъыьэюя'; // length = 98

describe('первый этап формы', () => {
  test('все инпуты первоначально должны быть пустыми', () => {
    const { container } = testUtils.renderWithContext(<MainInfo />);
    const recipeNameInput = screen.getByPlaceholderText(
      /название вашего блюда/i
    );
    const allHoursInput = container.querySelector('#allhours');
    const allMinutesInput = container.querySelector('#allminutes');
    const cookHours = container.querySelector('#cookhours');
    const cookMinutes = container.querySelector('#cookminutes');
    const recipeDescriptionInput =
      screen.getByPlaceholderText(/описание рецепта/i);
    const photoInput = container.querySelector('input[type="file"]');

    expect(recipeNameInput.value).toBe('');
    expect(allHoursInput.value).toBe('');
    expect(allMinutesInput.value).toBe('');
    expect(cookHours.value).toBe('');
    expect(cookMinutes.value).toBe('');
    expect(recipeDescriptionInput.value).toBe('');
    expect(photoInput.files.length).toBe(0);
  });

  describe('инпут "НАЗВАНИЕ РЕЦЕПТА"', () => {
    test('инпут доступен, в нем можно печатать', async () => {
      const user = userEvent.setup();

      testUtils.renderWithContext(<MainInfo />);
      const recipeNameInput = screen.getByPlaceholderText(
        /название вашего блюда/i
      );

      expect(recipeNameInput.value).toBe('');
      await user.type(recipeNameInput, 'рецепт борща');
      expect(recipeNameInput.value).toBe('рецепт борща');
    });
    test('инпут можеть быть очищен', async () => {
      const user = userEvent.setup();

      testUtils.renderWithContext(<MainInfo />);
      const recipeNameInput = screen.getByPlaceholderText(
        /название вашего блюда/i
      );

      expect(recipeNameInput.value).toBe('');
      await user.type(recipeNameInput, 'рецепт борща');
      expect(recipeNameInput.value).toBe('рецепт борща');
      await user.clear(recipeNameInput);
      expect(recipeNameInput.value).toBe('');
    });

    test('инпут должен содержать не более 100 символов', async () => {
      const user = userEvent.setup();

      testUtils.renderWithContext(<MainInfo />);
      const recipeNameInput = screen.getByPlaceholderText(
        /название вашего блюда/i
      );

      expect(recipeNameInput.value).toBe('');
      await user.type(recipeNameInput, text);
      expect(recipeNameInput.value.length).toBe(98);
      await user.type(recipeNameInput, 'еще несколько символов');
      expect(recipeNameInput.value.length).toBe(100);
      expect(recipeNameInput.value).toBe(text + 'ещ');
      await user.type(recipeNameInput, 'и еще');
      expect(recipeNameInput.value.length).toBe(100);
    });

    test('инпут должен получать данные из redux стора', async () => {
      const state = testUtils.getStateWithItems('form', filledTestFormState);
      testUtils.renderWithContext(<MainInfo />, state);
      const recipeNameInput = screen.getByPlaceholderText(
        /название вашего блюда/i
      );

      expect(recipeNameInput.value).toBe('рецепт борща');
    });
  });
});
