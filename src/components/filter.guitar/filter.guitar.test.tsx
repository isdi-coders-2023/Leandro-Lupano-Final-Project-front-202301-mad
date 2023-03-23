/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import '@testing-library/jest-dom';
import { useGuitars } from '../../hooks/use.guitars';
import { GuitarsApiRepo } from '../../services/repositories/guitars.api.repo';
import userEvent from '@testing-library/user-event';
import { FilterGuitar } from './filter.guitar';

jest.mock('../../hooks/use.guitars');

describe('Given the FilterGuitar component', () => {
  describe('When the component is rendered', () => {
    beforeEach(async () => {
      await act(async () => {
        (useGuitars as jest.Mock).mockReturnValue({
          loadGuitars: jest.fn(),
        });

        render(
          <Provider store={store}>
            <Router>
              <FilterGuitar></FilterGuitar>
            </Router>
          </Provider>
        );
      });
    });

    test('Then if the user click on All Filter Button, the loadGuitar function should be called', async () => {
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;

      const elements = screen.getAllByRole('button');
      await act(async () => userEvent.click(elements[0]));
      expect(useGuitars(guitarsMockRepo).loadGuitars).toHaveBeenCalled();
    });

    test('Then if the user click on Electric Filter Button, the loadGuitar function should be called', async () => {
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;

      const elements = screen.getAllByRole('button');
      await act(async () => userEvent.click(elements[1]));
      expect(useGuitars(guitarsMockRepo).loadGuitars).toHaveBeenCalled();
    });

    test('Then if the user click on Acoustic Filter Button, the loadGuitar function should be called', async () => {
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;

      const elements = screen.getAllByRole('button');
      await act(async () => userEvent.click(elements[2]));
      expect(useGuitars(guitarsMockRepo).loadGuitars).toHaveBeenCalled();
    });
  });
});
