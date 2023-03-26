import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Products from './products';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useGuitars } from '../../hooks/use.guitars';
import userEvent from '@testing-library/user-event';
import { GuitarsApiRepo } from '../../services/repositories/guitars.api.repo';
import { useUsers } from '../../hooks/use.users';

jest.mock('../guitar.card/guitar.card');
jest.mock('../filter.guitar/filter.guitar');
jest.mock('../../hooks/use.guitars');
jest.mock('../../hooks/use.users');

describe('Given the Products component', () => {
  const preparationTest = (role: string) => {
    (useGuitars as jest.Mock).mockReturnValue({
      loadGuitars: jest.fn(),
      changePage: jest.fn(),
      guitarsState: {
        allGuitars: [{ id: '1' }, { id: '2' }],
        actualPage: 1,
        actualStyle: 'All',
      },
    });

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
          <Products></Products>
        </Router>
      </Provider>
    );
  };

  describe('When the component is rendered with Admin role', () => {
    test('Then the main title should be in the document', () => {
      preparationTest('User');
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });

    test('Then if the user click the Prev-Button, the loadGuitars should be called', async () => {
      preparationTest('Admin');
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;
      const buttons = screen.getAllByRole('button');
      await userEvent.click(buttons[0]);
      expect(useGuitars(guitarsMockRepo).changePage).toHaveBeenCalled();
    });

    test('Then if the user click the Next-Button, the loadGuitars should be called', async () => {
      preparationTest('Admin');
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;
      const buttons = screen.getAllByRole('button');
      await userEvent.click(buttons[2]);
      expect(useGuitars(guitarsMockRepo).changePage).toHaveBeenCalled();
    });
  });
});
