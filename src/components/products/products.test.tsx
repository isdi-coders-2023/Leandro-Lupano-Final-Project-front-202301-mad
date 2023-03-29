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
  const preparationTest = (role: string, page: number) => {
    (useGuitars as jest.Mock).mockReturnValue({
      loadGuitars: jest.fn(),
      changePage: jest.fn(),
      guitarsState: {
        allGuitars: [{ id: '1' }, { id: '2' }],
        actualPage: page,
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
      preparationTest('User', 2);
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });

    test('Then if the user click the Prev-Button, the loadGuitars should be called', async () => {
      preparationTest('Admin', 2);
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;
      const buttons = screen.getAllByRole('button');
      await userEvent.click(buttons[0]);
      expect(useGuitars(guitarsMockRepo).changePage).toHaveBeenCalled();
    });

    test('Then if the user click the Next-Button, the loadGuitars should be called', async () => {
      preparationTest('Admin', 2);
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;
      const buttons = screen.getAllByRole('button');
      await userEvent.click(buttons[2]);
      expect(useGuitars(guitarsMockRepo).changePage).toHaveBeenCalled();
    });

    test('Then if the page is 1, the Prev-Button should not been in the document', async () => {
      preparationTest('Admin', 1);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(2);
    });

    test('Then if the page is more than 6, the Next-Button should not been in the document', async () => {
      preparationTest('Admin', 7);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(2);
    });
  });
});
