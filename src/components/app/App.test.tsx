import { render } from '@testing-library/react';
import { AppRouter } from '../app.router/app.router';

import App from './App';

jest.mock('../app.router/app.router');

describe('Given App component', () => {
  describe('When it is render', () => {
    test('Then it should call UsersList component', () => {
      render(<App />);

      expect(AppRouter).toHaveBeenCalled();
    });
  });
});
