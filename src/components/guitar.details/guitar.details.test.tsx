import { MemoryRouter as Router, useLocation } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import userEvent from '@testing-library/user-event';
import GuitarDetails from './guitar.details';
import { useUsers } from '../../hooks/use.users';

jest.mock('../../hooks/use.users');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: () => mockNavigate,
}));

describe('Given the GuitarDetails component', () => {
  const preparationTest = (role: string) => {
    const location = {
      state: {
        guitarProps: { id: '1' },
      },
    };

    (useLocation as jest.Mock).mockReturnValue(location);

    (useUsers as jest.Mock).mockReturnValue({
      usersState: {
        userLogged: {
          role: role,
        },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <GuitarDetails></GuitarDetails>
        </Router>
      </Provider>
    );
  };

  describe('When the component is rendered', () => {
    test('Then the main heading should be in the document', async () => {
      preparationTest('User');
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When the component is rendered with guitarProps and the user click in Go Back button', () => {
    test('Then the mockNavigate function should be called', async () => {
      preparationTest('Admin');
      const elements = screen.getAllByRole('button');
      await userEvent.click(elements[0]);
      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});
