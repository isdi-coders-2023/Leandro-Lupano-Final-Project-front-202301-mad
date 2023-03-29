/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useUsers } from '../../hooks/use.users';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { UsersApiRepo } from '../../services/repositories/users.api.repo';
import Register from './register';

jest.mock('../../hooks/use.users');
jest.mock('../login/login');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Given Register component', () => {
  beforeEach(async () => {
    await act(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        registerUser: jest.fn(),
      });
      render(
        <Provider store={store}>
          <Router>
            <Register></Register>
          </Router>
        </Provider>
      );
    });
  });

  describe('When the component is rendered', () => {
    test('Then the heading <h2> should be in the document', () => {
      const elements = screen.getAllByRole('heading');
      expect(elements[0]).toBeInTheDocument();
    });

    test('Then the username <input> should be in the document', () => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toBeInTheDocument();
    });

    test('Then the email <input> should be in the document', () => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[1]).toBeInTheDocument();
    });

    test('Then the password <input> should be in the document', () => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[2]).toBeInTheDocument();
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
      await userEvent.type(inputs[2], 'test');
      const button = screen.getByRole('button');
      await act(async () => userEvent.click(button));
      expect(useUsers(usersMockRepo).registerUser).toHaveBeenCalledWith({
        username: 'test',
        email: 'test',
        password: 'test',
      });
    });
  });

  describe('When the submit button is clicked and it is wait the setTimeout time', () => {
    test('Then, the handleSubmit function should be called', async () => {
      jest.useFakeTimers();
      const button = screen.getByRole('button');
      act(() => {
        fireEvent.click(button);
        jest.advanceTimersByTime(2200);
      });
      expect(mockNavigate).toHaveBeenCalled();
      jest.useRealTimers();
    });
  });
});
