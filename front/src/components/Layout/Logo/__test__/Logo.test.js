/* eslint-disable   */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '../Logo';
import testUtils from '../../../../test-utils/test-with-store';

describe('Логотип', () => {
  test('должен отображаться на странице', () => {
    testUtils.renderWithContext(<Logo />);

    const logo = screen.getByAltText(/логотип приложения/i);

    expect(logo).toBeInTheDocument();
  });
});
