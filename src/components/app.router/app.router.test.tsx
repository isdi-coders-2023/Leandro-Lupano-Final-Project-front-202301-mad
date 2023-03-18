import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { AppRouter } from './app.router';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Given AppRouter component', () => {
  const prepareTestFunction = (number: number) => {
    render(
      <Provider store={store}>
        <Router
          initialEntries={['/', '/home', '/login', '/about', '/details']}
          initialIndex={number}
        >
          <AppRouter></AppRouter>
        </Router>
      </Provider>
    );
  };

  describe('When it is render and the path is "/"', () => {
    test('Then, the "username" input should be in the document', async () => {
      await waitFor(async () => prepareTestFunction(0));
      const element = await screen.findByRole('button');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When it is render and the path is "/home"', () => {
    test('Then, the "username" input should be in the document', async () => {
      await waitFor(async () => prepareTestFunction(1));
      const element = await screen.findByRole('button');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When it is render and the path is "/login"', () => {
    test('Then, the "username" input should be in the document', async () => {
      await waitFor(async () => prepareTestFunction(2));
      const element = await screen.findByRole('button');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When it is render and the path is "/about"', () => {
    test('Then, the "username" input should be in the document', async () => {
      await waitFor(async () => prepareTestFunction(3));
      const elements = await screen.findAllByRole('heading');
      expect(elements[0]).toBeInTheDocument();
    });
  });

  describe('When it is render and the path is "/details"', () => {
    test('Then, the "username" input should be in the document', async () => {
      await waitFor(async () => prepareTestFunction(4));
      const element = await screen.findByRole('button');
      expect(element).toBeInTheDocument();
    });
  });
});
