/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { UserStructure } from '../models/user';
import { UsersApiRepo } from '../services/repositories/users.api.repo';
import { useUsers } from './use.users';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('Given the useUsers Custom Hook, a UserApiRepo mock and a TestComponent', () => {
  let mockPayload: UserStructure;
  let mockRepo: UsersApiRepo;

  beforeEach(async () => {
    mockPayload = {
      username: 'test',
      email: 'test',
    } as unknown as UserStructure;

    mockRepo = {
      create: jest.fn(),
    } as unknown as UsersApiRepo;

    const TestComponent = function () {
      const { registerUser, loginUser } = useUsers(mockRepo);

      return (
        <>
          <button onClick={() => registerUser(mockPayload)}>register</button>
          <button onClick={() => loginUser(mockPayload)}>login</button>
        </>
      );
    };

    await act(async () =>
      render(
        <Provider store={store}>
          <TestComponent></TestComponent>
        </Provider>
      )
    );
  });

  describe('When the TestComponent is rendered', () => {
    test('Then, the button should be in the document', async () => {
      const elements = await screen.findAllByRole('button');
      expect(elements[0]).toBeInTheDocument();
    });
  });

  describe('When the TestComponent is rendered and the register button is clicked', () => {
    test('Then, the registerUser function should be called', async () => {
      const elements = await screen.findAllByRole('button');
      await act(async () => userEvent.click(elements[0]));
      expect(mockRepo.create).toHaveBeenCalled();
    });
  });

  describe('When the TestComponent is rendered and the login button is clicked', () => {
    test('Then, the loginUser function should be called', async () => {
      const elements = await screen.findAllByRole('button');
      await act(async () => userEvent.click(elements[1]));
      expect(mockRepo.create).toHaveBeenCalled();
    });
  });
});
