import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Products from './products';

describe('Given the Products component', () => {
  describe('When the component is rendered', () => {
    test('Then the main title should be in the document', () => {
      render(
        <Router>
          <Products></Products>
        </Router>
      );
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });
});
