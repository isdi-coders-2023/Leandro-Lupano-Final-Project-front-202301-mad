import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Given the Footer component', () => {
  describe('When the component is rendered', () => {
    test('Then the logo image should be in the document', () => {
      render(<Footer></Footer>);
      const elements = screen.getAllByRole('img');
      expect(elements[0]).toBeInTheDocument();
    });
  });
});
