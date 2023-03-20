import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import MyGuitars from './myguitars';

describe('Given the MyGuitars component', () => {
  describe('When the component is rendered', () => {
    test('Then the main title should be in the document', () => {
      render(
        <Router>
          <MyGuitars></MyGuitars>
        </Router>
      );
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });
});
