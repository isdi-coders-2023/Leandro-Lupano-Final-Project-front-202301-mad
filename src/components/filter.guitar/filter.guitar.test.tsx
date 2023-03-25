/* eslint-disable testing-library/no-unnecessary-act */
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
    const testPreparation = (style: string) => {
      (useGuitars as jest.Mock).mockReturnValue({
        changeStyle: jest.fn(),
        guitarsState: {
          actualStyle: style,
        },
      });

      render(
        <Provider store={store}>
          <Router>
            <FilterGuitar></FilterGuitar>
          </Router>
        </Provider>
      );
    };

    test('Then if the user click on All Filter Button, the changeStyle function should be called', async () => {
      testPreparation('All');
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;
      const elements = screen.getAllByRole('button');
      await act(async () => userEvent.click(elements[0]));
      expect(useGuitars(guitarsMockRepo).changeStyle).toHaveBeenCalled();
    });

    test('Then if the user click on Electric Filter Button, the changeStyle function should be called', async () => {
      testPreparation('Electric');
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;
      const elements = screen.getAllByRole('button');
      await act(async () => userEvent.click(elements[1]));
      expect(useGuitars(guitarsMockRepo).changeStyle).toHaveBeenCalled();
    });

    test('Then if the user click on Acoustic Filter Button, the changeStyle function should be called', async () => {
      testPreparation('Acoustic');
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;
      const elements = screen.getAllByRole('button');
      await act(async () => userEvent.click(elements[2]));
      expect(useGuitars(guitarsMockRepo).changeStyle).toHaveBeenCalled();
    });
  });
});
