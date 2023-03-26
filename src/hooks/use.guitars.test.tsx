/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { GuitarStructure } from '../models/guitar';
import { UserServerResponse, UserStructure } from '../models/user';
import { GuitarsApiRepo } from '../services/repositories/guitars.api.repo';
import { UsersApiRepo } from '../services/repositories/users.api.repo';
import { store } from '../store/store';
import { useGuitars } from './use.guitars';
import { useUsers } from './use.users';

describe('Given the useGuitars Custom Hook, a GuitarApiRepo mock and a TestGuitarComponent', () => {
  let mockGuitarRepo: GuitarsApiRepo;
  let mockGuitarPayload: GuitarStructure;

  let mockUserRepo: UsersApiRepo;
  let mockUserPayload: UserStructure;
  let mockUserResponse: UserServerResponse;
  let mockUserResponseFalse: UserServerResponse;

  let falseToken: () => void;
  let trueToken: () => void;

  let actualPageTest: number;
  let actualStyleTest: string;

  beforeEach(async () => {
    mockGuitarRepo = {
      read: jest.fn(),
      readId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as GuitarsApiRepo;

    mockGuitarPayload = {
      brand: 'test',
      modelGuitar: 'test',
      picture: 'test',
      style: 'Electric',
      material: 'test',
      price: 1,
      description: 'test',
    } as unknown as GuitarStructure;

    mockUserPayload = {
      username: 'test',
      email: 'test',
      id: '1',
      token: 'test',
    } as unknown as UserStructure;

    mockUserResponse = {
      results: [mockUserPayload],
    } as unknown as UserServerResponse;

    mockUserResponseFalse = {
      results: [
        {
          username: 'test',
          email: 'test',
          id: '1',
        },
      ],
    } as unknown as UserServerResponse;

    mockUserRepo = {
      create: jest.fn(),
    } as unknown as UsersApiRepo;

    trueToken = () => {
      (mockUserRepo.create as jest.Mock).mockResolvedValueOnce(
        mockUserResponse
      );
    };

    falseToken = () => {
      (mockUserRepo.create as jest.Mock).mockResolvedValueOnce(
        mockUserResponseFalse
      );
    };

    const TestGuitarComponent = function () {
      const { loginUser } = useUsers(mockUserRepo);
      const {
        loadGuitars,
        loadOneGuitar,
        createGuitar,
        updateGuitar,
        deleteOneGuitar,
        changePage,
        changeStyle,
        guitarsState,
      } = useGuitars(mockGuitarRepo);

      actualPageTest = guitarsState.actualPage;
      actualStyleTest = guitarsState.actualStyle;

      return (
        <>
          <button onClick={() => loginUser(mockUserPayload)}>login</button>
          <button onClick={() => loadGuitars(1, 'All')}>loadGuitars</button>
          <button onClick={() => loadOneGuitar('mockIdGuitar')}>
            loadOneGuitar
          </button>
          <button onClick={() => createGuitar(mockGuitarPayload)}>
            createGuitar
          </button>
          <button
            onClick={() => updateGuitar('mockIdGuitar', mockGuitarPayload)}
          >
            updateGuitar
          </button>
          <button onClick={() => deleteOneGuitar('mockIdGuitar')}>
            deleteOneGuitar
          </button>
          <button onClick={() => changePage(0)}>changePage</button>
          <button onClick={() => changePage(-1)}>changePage</button>
          <button onClick={() => changeStyle('All')}>changeStyle</button>
        </>
      );
    };

    await act(async () =>
      render(
        <Provider store={store}>
          <TestGuitarComponent></TestGuitarComponent>
        </Provider>
      )
    );
  });

  describe('When the TestGuitarComponent is rendered', () => {
    test('Then, the button should be in the document', async () => {
      const elements = await screen.findAllByRole('button');
      expect(elements[0]).toBeInTheDocument();
    });
  });

  describe('When the TestGuitarComponent is rendered and the loadGuitars button is clicked', () => {
    test('Then, if there is userToken, the read guitar repo method should be called', async () => {
      const elements = await screen.findAllByRole('button');
      trueToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[1]));

      expect(mockGuitarRepo.read).toHaveBeenCalled();
    });

    test('Then, if there is no userToken, the read guitar repo should NOT been called', async () => {
      const elements = await screen.findAllByRole('button');
      falseToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[1]));

      expect(mockGuitarRepo.read).not.toHaveBeenCalled();
    });
  });

  describe('When the TestGuitarComponent is rendered and the loadOneGuitars button is clicked', () => {
    test('Then, if there is userToken, the readId guitar repo method should be called', async () => {
      const elements = await screen.findAllByRole('button');
      trueToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[2]));

      expect(mockGuitarRepo.readId).toHaveBeenCalled();
    });

    test('Then, if there is no userToken, the readId guitar repo should NOT been called', async () => {
      const elements = await screen.findAllByRole('button');
      falseToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[2]));

      expect(mockGuitarRepo.readId).not.toHaveBeenCalled();
    });
  });

  describe('When the TestGuitarComponent is rendered and the createGuitar button is clicked', () => {
    test('Then, if there is userToken, the create guitar repo method should be called', async () => {
      const elements = await screen.findAllByRole('button');
      trueToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[3]));

      expect(mockGuitarRepo.create).toHaveBeenCalled();
    });

    test('Then, if there is no userToken, the create guitar repo should NOT been called', async () => {
      const elements = await screen.findAllByRole('button');
      falseToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[3]));

      expect(mockGuitarRepo.create).not.toHaveBeenCalled();
    });
  });

  describe('When the TestGuitarComponent is rendered and the updateGuitar button is clicked', () => {
    test('Then, if there is userToken, the update guitar repo method should be called', async () => {
      const elements = await screen.findAllByRole('button');
      trueToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[4]));

      expect(mockGuitarRepo.update).toHaveBeenCalled();
    });

    test('Then, if there is no userToken, the update guitar repo should NOT been called', async () => {
      const elements = await screen.findAllByRole('button');
      falseToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[4]));

      expect(mockGuitarRepo.update).not.toHaveBeenCalled();
    });
  });

  describe('When the TestGuitarComponent is rendered and the deleteOneGuitar button is clicked', () => {
    test('Then, if there is userToken, the delete guitar repo method should be called', async () => {
      const elements = await screen.findAllByRole('button');
      trueToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[5]));

      expect(mockGuitarRepo.delete).toHaveBeenCalled();
    });

    test('Then, if there is no userToken, the delete guitar repo should NOT been called', async () => {
      const elements = await screen.findAllByRole('button');
      falseToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[5]));

      expect(mockGuitarRepo.delete).not.toHaveBeenCalled();
    });
  });

  describe('When the TestGuitarComponent is rendered and the changePage button is clicked', () => {
    test('Then, if there is userToken and the pageChange is 0, the actualPage should be 1', async () => {
      const elements = await screen.findAllByRole('button');
      trueToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[6]));

      expect(actualPageTest).toBe(1);
    });

    test('Then, if there is userToken and the pageChange is -1, the actualPage should be 1', async () => {
      const elements = await screen.findAllByRole('button');
      trueToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[7]));

      expect(actualPageTest).toBe(1);
    });

    test('Then, if there is no userToken, the actualPage should not change', async () => {
      const elements = await screen.findAllByRole('button');
      falseToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[6]));

      expect(actualPageTest).toBe(1);
    });
  });

  describe('When the TestGuitarComponent is rendered and the changeStyle button is clicked', () => {
    test('Then, if there is userToken and the styleChange is Electric, the actualStyle should be Electric', async () => {
      const elements = await screen.findAllByRole('button');
      trueToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[8]));

      expect(actualStyleTest).toBe('All');
    });

    test('Then, if there is no userToken, the actualStyle should not change', async () => {
      const elements = await screen.findAllByRole('button');
      falseToken();
      await act(async () => userEvent.click(elements[0]));
      await act(async () => userEvent.click(elements[8]));

      expect(actualStyleTest).toBe('All');
    });
  });
});
