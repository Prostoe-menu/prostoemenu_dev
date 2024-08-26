/* eslint-disable   */
import { screen } from '@testing-library/react';
import React from 'react';
import testUtils from 'test-utils/test-with-store';
import Logo from '../Logo';

describe('Логотип', () => {
  test('должен отображаться на странице', () => {
    testUtils.renderWithContext(<Logo />);

    const logo = screen.getByAltText(/логотип приложения/i);

    expect(logo).toBeInTheDocument();
  });
});
