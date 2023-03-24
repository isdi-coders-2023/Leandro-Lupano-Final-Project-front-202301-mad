/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { useUsers } from '../../hooks/use.users';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { UsersApiRepo } from '../../services/repositories/users.api.repo';
import Login from './login';

jest.mock('../../hooks/use.users');
jest.mock('../products/products');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Given Login component', () => {
  beforeEach(async () => {
    await act(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        loginUser: jest.fn(),
        usersState: {
          userLogged: {
            token: 'tokenTest',
          },
        },
      });
      render(
        <Provider store={store}>
          <Router>
            <Login></Login>
          </Router>
        </Provider>
      );
    });
  });

  describe('When the component is rendered', () => {
    test('Then the heading <h2> should be in the document', () => {
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });

    test('Then the username <input> should be in the document', () => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toBeInTheDocument();
    });

    test('Then the password <input> should be in the document', () => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[1]).toBeInTheDocument();
    });

    test('Then the <button> should be in the document', () => {
      const element = screen.getByRole('button');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When the submit button is clicked', () => {
    test('Then, the handleSubmit function should be called', async () => {
      const usersMockRepo = {} as unknown as UsersApiRepo;
      const inputs = screen.getAllByRole('textbox');
      await userEvent.type(inputs[0], 'test');
      await userEvent.type(inputs[1], 'test');
      const button = screen.getByRole('button');
      await userEvent.click(button);
      expect(useUsers(usersMockRepo).loginUser).toHaveBeenCalledWith({
        username: 'test',
        password: 'test',
      });
    });
  });
});
