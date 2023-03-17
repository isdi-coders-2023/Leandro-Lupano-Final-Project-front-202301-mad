import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Given the Header component', () => {
  describe('When the component is rendered', () => {
    test('Then the logo image should be in the document', () => {
      render(<Header></Header>);
      const element = screen.getByRole('img');
      expect(element).toBeInTheDocument();
    });
  });
});
