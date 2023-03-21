/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { MemoryRouter as Router, useLocation } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import userEvent from '@testing-library/user-event';
import GuitarDetails from './guitar.details';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: () => mockNavigate,
}));

describe('Given the GuitarDetails component', () => {
  beforeEach(async () => {
    await act(async () => {
      const location = {
        state: {
          guitarProps: { id: '1' },
        },
      };

      (useLocation as jest.Mock).mockReturnValue(location);

      render(
        <Provider store={store}>
          <Router>
            <GuitarDetails></GuitarDetails>
          </Router>
        </Provider>
      );
    });
  });

  describe('When the component is rendered', () => {
    test('Then the main heading should be in the document', async () => {
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When the component is rendered with guitarProps and the user click in Go Back button', () => {
    test('Then the deleteOneGuitar function should be called', async () => {
      const elements = screen.getAllByRole('button');
      await userEvent.click(elements[0]);
      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});
