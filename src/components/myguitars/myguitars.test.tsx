/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import MyGuitars from './myguitars';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useUsers } from '../../hooks/use.users';

jest.mock('../guitar.card/guitar.card');
jest.mock('../../hooks/use.users');

describe('Given the MyGuitars component', () => {
  beforeEach(async () => {
    await act(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        usersState: {
          userLogged: {
            myGuitars: [{ id: '1' }, { id: '2' }],
          },
        },
      });

      render(
        <Provider store={store}>
          <Router>
            <MyGuitars></MyGuitars>
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
  });
});
