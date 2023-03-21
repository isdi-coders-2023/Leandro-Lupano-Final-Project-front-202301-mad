/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { MemoryRouter as Router, useLocation } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useGuitars } from '../../hooks/use.guitars';
import { GuitarsApiRepo } from '../../services/repositories/guitars.api.repo';
import DeleteGuitar from './delete.guitar';
import userEvent from '@testing-library/user-event';

jest.mock('../../hooks/use.guitars');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: () => mockNavigate,
}));

describe('Given the DeleteGuitar component', () => {
  const guitarMockRepo = {} as unknown as GuitarsApiRepo;

  beforeEach(async () => {
    await act(async () => {
      (useGuitars as jest.Mock).mockReturnValue({
        deleteOneGuitar: jest.fn(),
      });

      const location = {
        state: {
          guitarIdProps: { id: '1' },
        },
      };

      (useLocation as jest.Mock).mockReturnValue(location);

      render(
        <Provider store={store}>
          <Router>
            <DeleteGuitar></DeleteGuitar>
          </Router>
        </Provider>
      );
    });
  });

  describe('When the component is rendered', () => {
    test('Then the main heading should be in the document', async () => {
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When the component is rendered with guitarId and the user click in YES button', () => {
    test('Then the deleteOneGuitar function should be called', async () => {
      const elements = screen.getAllByRole('button');
      await userEvent.click(elements[0]);
      expect(useGuitars(guitarMockRepo).deleteOneGuitar).toHaveBeenCalled();
    });
  });

  describe('When the component is rendered with guitarId and the user click in CANCEL button', () => {
    test('Then the mockNavigate function should be called', async () => {
      const elements = screen.getAllByRole('button');
      await userEvent.click(elements[1]);
      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});
