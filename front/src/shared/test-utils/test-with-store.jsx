import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { getStoreWithState } from '../../store/store';

const renderWithContext = (element, state) => {
  const store = getStoreWithState(state);

  const utils = render(
    <Provider store={store}>
      <Router>{element}</Router>
    </Provider>
  );

  return { store, ...utils };
};

const getStateWithItems = (keyName, stateObj) => {
  const state = {
    [keyName]: stateObj,
  };

  return state;
};

const testUtils = { renderWithContext, getStateWithItems };

export default testUtils;
