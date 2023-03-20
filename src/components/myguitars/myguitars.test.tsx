import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import MyGuitars from './myguitars';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../guitar.card/guitar.card');

describe('Given the MyGuitars component', () => {
  describe('When the component is rendered', () => {
    test('Then the main title should be in the document', () => {
      render(
        <Provider store={store}>
          <Router>
            <MyGuitars></MyGuitars>
          </Router>
        </Provider>
      );
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });
});
