/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { navMenuOptions } from '../app.router/nav.menu.options';
import { NavMenu } from './nav.menu';
import userEvent from '@testing-library/user-event';
import { useUsers } from '../../hooks/use.users';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { UsersApiRepo } from '../../services/repositories/users.api.repo';

jest.mock('../../hooks/use.users');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Given NavMenu component', () => {
  describe('When the component is rendered with token and Admin role', () => {
    beforeEach(() => {
      (useUsers as jest.Mock).mockReturnValue({
        logoutUser: jest.fn(),
        usersState: {
          userLogged: {
            token: 'testToken',
            role: 'Admin',
          },
        },
      });

      render(
        <Provider store={store}>
          <Router>
            <NavMenu></NavMenu>
          </Router>
        </Provider>
      );
    });

    test('Then, one of the navMenuOptions should be in the document', () => {
      const element = screen.getByText(navMenuOptions[0].label);
      expect(element).toBeInTheDocument();
    });

    test('Then, if the user clicks in the burger menu, the burger menu should be in the document and the handleClick function should be called', async () => {
      const elements = screen.getAllByRole('img');
      await act(async () => {
        await userEvent.click(elements[1]);
      });
      expect(elements[1]).toBeInTheDocument();
    });
  });

  describe('When the component is rendered without token and User role', () => {
    beforeEach(() => {
      (useUsers as jest.Mock).mockReturnValue({
        logoutUser: jest.fn(),
        usersState: {
          userLogged: {
            token: undefined,
            role: 'User',
          },
        },
      });

      render(
        <Provider store={store}>
          <Router>
            <NavMenu></NavMenu>
          </Router>
        </Provider>
      );
    });

    test('Then, the login logo should be in the document', () => {
      const element = screen.getByRole('img');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When the component is rendered with token and User role', () => {
    beforeEach(() => {
      (useUsers as jest.Mock).mockReturnValue({
        logoutUser: jest.fn(),
        usersState: {
          userLogged: {
            token: 'testToken',
            role: 'User',
          },
        },
      });

      render(
        <Provider store={store}>
          <Router>
            <NavMenu></NavMenu>
          </Router>
        </Provider>
      );
    });

    test('Then, if there is token but the role is User, the login logo should be in the document', () => {
      const elements = screen.getAllByRole('img');
      expect(elements[0]).toBeInTheDocument();
    });

    test('Then, if there is token but the role is User, and the logout img is click, the logoutUser function should be called', async () => {
      const usersMockRepo = {} as unknown as UsersApiRepo;
      const elements = screen.getAllByRole('img');
      await userEvent.click(elements[0]);
      expect(useUsers(usersMockRepo).logoutUser).toHaveBeenCalled();
    });
  });
});
