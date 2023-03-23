/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Products from './products';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useGuitars } from '../../hooks/use.guitars';
import userEvent from '@testing-library/user-event';
import { GuitarsApiRepo } from '../../services/repositories/guitars.api.repo';

jest.mock('../guitar.card/guitar.card');
jest.mock('../filter.guitar/filter.guitar');
jest.mock('../../hooks/use.guitars');

describe('Given the Products component', () => {
  beforeEach(async () => {
    await act(async () => {
      (useGuitars as jest.Mock).mockReturnValue({
        loadGuitars: jest.fn(),
        guitarsState: {
          allGuitars: [{ id: '1' }, { id: '2' }],
        },
      });

      render(
        <Provider store={store}>
          <Router>
            <Products></Products>
          </Router>
        </Provider>
      );
    });
  });

  describe('When the component is rendered', () => {
    test('Then the main title should be in the document', () => {
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });

    test('Then if the user click the Prev-Button, the loadGuitars should be called', async () => {
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;
      const buttons = screen.getAllByRole('button');
      await userEvent.click(buttons[0]);
      expect(useGuitars(guitarsMockRepo).loadGuitars).toHaveBeenCalled();
    });

    test('Then if the user click the Next-Button, the loadGuitars should be called', async () => {
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;
      const buttons = screen.getAllByRole('button');
      await userEvent.click(buttons[2]);
      expect(useGuitars(guitarsMockRepo).loadGuitars).toHaveBeenCalled();
    });
  });
});
