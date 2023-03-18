import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import ErrorPage from './error.page';

describe('Given the ErrorPage component', () => {
  describe('When the component is rendered', () => {
    test('Then the error image should be in the document', () => {
      render(
        <Router>
          <ErrorPage></ErrorPage>
        </Router>
      );
      const element = screen.getByRole('img');
      expect(element).toBeInTheDocument();
    });
  });
});
