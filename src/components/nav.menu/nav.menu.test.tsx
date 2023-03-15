import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { navMenuOptions } from '../app.router/nav.menu.options';
import { NavMenu } from './nav.menu';

describe('Given NavMenu component', () => {
  describe('When the component is rendered', () => {
    test('Then, one of the navMenuOptions should be in the document', () => {
      render(
        <Router>
          <NavMenu></NavMenu>
        </Router>
      );

      const element = screen.getByText(navMenuOptions[0].label);
      expect(element).toBeInTheDocument();
    });
  });
});
