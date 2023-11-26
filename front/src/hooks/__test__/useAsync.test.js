/* eslint-disable   */
import { renderHook, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';
import React from 'react';
import useAsync from '../useAsync';

beforeEach(() => {
  jest.useFakeTimers();
});

const mockOnSuccess = async (query) => {
  const promise = new Promise((res, rej) => {
    res('success' + ' ' + query);
  });

  return promise;
};
const mockOnError = async (query) => {
  const promise = new Promise((res, rej) => {
    rej('something went wrong');
  });

  return promise;
};

describe('useAsync', () => {
  test('должен вернуть данные при успешном запросе', async () => {
    const { result } = renderHook(() => useAsync(mockOnSuccess, 'request'));

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.value).toBe('success request'), {
      timeout: 500,
    });
    expect(result.current.loading).toBe(false);
  });

  test('должен пробросить ошибку при наличии проблем с запросом', async () => {
    const { result } = renderHook(() => useAsync(mockOnError, 'request'));

    await waitFor(
      () => expect(result.current.error).toBe('something went wrong'),
      {
        timeout: 500,
      }
    );
    expect(result.current.value).toHaveLength(0);
    expect(result.current.loading).toBe(false);
  });
  test('должен сделать запрос только по истечении таймера', async () => {
    const { result, rerender } = renderHook(() =>
      useAsync(mockOnSuccess, 'request', true, 1000)
    );

    await waitFor(() =>
      expect(result.current.value).not.toBe('success request')
    );

    await waitFor(
      () => expect(result.current.value).not.toBe('success request'),
      {
        timeout: 500,
      }
    );
    rerender();
    await waitFor(
      () => expect(result.current.value).not.toBe('success request'),
      {
        timeout: 900,
      }
    );
    rerender();
    await waitFor(() => expect(result.current.value).toBe('success request'), {
      timeout: 2000,
    });
  });
});
