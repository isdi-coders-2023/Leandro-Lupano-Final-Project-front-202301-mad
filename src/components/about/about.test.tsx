import { render, screen } from '@testing-library/react';
import About from './about';

describe('Given the About component', () => {
  describe('When the component is rendered', () => {
    test('Then the main title should be in the document', () => {
      render(<About></About>);
      const elements = screen.getAllByRole('heading');
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
