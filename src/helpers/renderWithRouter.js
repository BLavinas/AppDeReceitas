import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import LoginProvider from '../Context/LoginProvider';

function renderWithRouterAndContext(component, path = '/') {
  const history = createMemoryHistory({ initialEntries: [path] });

  return {
    ...render(
      <LoginProvider>
        <Router history={ history }>
          {component}
        </Router>
      </LoginProvider>,
    ),
    history,
  };
}

export default renderWithRouterAndContext;
