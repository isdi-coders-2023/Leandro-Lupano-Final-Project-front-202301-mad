/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { UserServerResponse, UserStructure } from '../models/user';
import { UsersApiRepo } from '../services/repositories/users.api.repo';
import { useUsers } from './use.users';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('Given the useUsers Custom Hook, a UserApiRepo mock and a TestUserComponent', () => {
  let mockPayload: UserStructure;
  let mockRepo: UsersApiRepo;
  let mockResponse: UserServerResponse;
  let mockResponseFalse: UserServerResponse;
  let actualToken: string | undefined;

  beforeEach(async () => {
    mockPayload = {
      username: 'test',
      email: 'test',
      id: '1',
      token: 'test',
    } as unknown as UserStructure;

    mockResponse = {
      results: [mockPayload],
    } as unknown as UserServerResponse;

    mockResponseFalse = {
      results: [
        {
          username: 'test',
          email: 'test',
          id: '1',
        },
      ],
    } as unknown as UserServerResponse;

    mockRepo = {
      create: jest.fn(),
      readId: jest.fn(),
      update: jest.fn(),
    } as unknown as UsersApiRepo;

    const TestUserComponent = function () {
      const { registerUser, loginUser, logoutUser, userCart, usersState } =
        useUsers(mockRepo);

      actualToken = usersState.userLogged.token;

      return (
        <>
          <button onClick={() => registerUser(mockPayload)}>register</button>
          <button onClick={() => loginUser(mockPayload)}>login</button>
          <button onClick={() => userCart('1', 'test')}>userCart</button>
          <button onClick={() => logoutUser()}>Logout</button>
        </>
      );
    };

    await act(async () =>
      render(
        <Provider store={store}>
          <TestUserComponent></TestUserComponent>
        </Provider>
      )
    );
  });

  describe('When the TestUserComponent is rendered', () => {
    test('Then, the button should be in the document', async () => {
      const elements = await screen.findAllByRole('button');
      expect(elements[0]).toBeInTheDocument();
    });
  });

  describe('When the TestUserComponent is rendered and the register button is clicked', () => {
    test('Then, the registerUser function should be called', async () => {
      const elements = await screen.findAllByRole('button');
      await act(async () => userEvent.click(elements[0]));
      expect(mockRepo.create).toHaveBeenCalled();
    });
  });

  describe('When the TestUserComponent is rendered and the login button is clicked', () => {
    test('Then, the loginUser function should be called', async () => {
      const elements = await screen.findAllByRole('button');
      await act(async () => userEvent.click(elements[1]));
      expect(mockRepo.create).toHaveBeenCalled();
    });
  });

  describe('When the TestUserComponent is rendered and the userCart button is clicked', () => {
    test('Then, the userCart function should be called', async () => {
      const elements = await screen.findAllByRole('button');
      (mockRepo.create as jest.Mock).mockResolvedValueOnce(mockResponse);
      await act(async () => userEvent.click(elements[1]));
      await act(async () => userEvent.click(elements[2]));
      expect(mockRepo.update).toHaveBeenCalled();
    });
  });

  describe('When the TestUserComponent is rendered and the userCart button is clicked without token', () => {
    test('Then, the update function should not been called', async () => {
      const elements = await screen.findAllByRole('button');
      (mockRepo.create as jest.Mock).mockResolvedValueOnce(mockResponseFalse);
      await act(async () => userEvent.click(elements[1]));
      await act(async () => userEvent.click(elements[2]));
      expect(mockRepo.update).not.toBeCalled();
    });
  });

  describe('When the TestUserComponent is rendered and the Logout button is clicked', () => {
    test('Then, the usersState.userLogged.token should be undefined', async () => {
      const elements = await screen.findAllByRole('button');
      (mockRepo.create as jest.Mock).mockResolvedValueOnce(mockResponse);
      await act(async () => userEvent.click(elements[1]));
      await act(async () => userEvent.click(elements[3]));
      expect(actualToken).toBe(undefined);
    });
  });
});
