import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import MyGuitars from './myguitars';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useUsers } from '../../hooks/use.users';

jest.mock('../guitar.card/guitar.card');
jest.mock('../../hooks/use.users');

describe('Given the MyGuitars component', () => {
  function testPreparation(guitarArrayTest: Array<any>) {
    (useUsers as jest.Mock).mockReturnValue({
      usersState: {
        userLogged: {
          myGuitars: guitarArrayTest,
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
  }

  describe('When the component is rendered', () => {
    test('Then if there is an Array in users MyGuitar, the main title should be in the document', () => {
      testPreparation([{ id: '1' }, { id: '2' }]);
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });

    test('Then if there is an empty Array, the main title should be in the document', () => {
      testPreparation([]);
      const element = screen.getByRole('button');
      expect(element).toBeInTheDocument();
    });
  });
});
