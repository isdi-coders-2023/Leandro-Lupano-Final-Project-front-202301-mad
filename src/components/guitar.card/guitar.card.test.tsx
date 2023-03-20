import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import GuitarCard from './guitar.card';

describe('Given the GuitarCard component', () => {
  describe('When the component is rendered', () => {
    test('Then the More details button should be in the document', () => {
      render(
        <Router>
          <GuitarCard></GuitarCard>
        </Router>
      );
      const element = screen.getByRole('button');
      expect(element).toBeInTheDocument();
    });
  });
});
