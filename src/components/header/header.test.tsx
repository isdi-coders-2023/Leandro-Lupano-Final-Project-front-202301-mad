import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { NavMenu } from '../nav.menu/nav.menu';
import Header from './header';

jest.mock('../nav.menu/nav.menu');

describe('Given the Header component', () => {
  describe('When the component is rendered', () => {
    test('Then the logo image should be in the document', () => {
      render(
        <Router>
          <Header></Header>
        </Router>
      );
      const element = screen.getByRole('img');
      expect(element).toBeInTheDocument();
      expect(NavMenu).toHaveBeenCalled();
    });
  });
});
