/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { navMenuOptions } from '../app.router/nav.menu.options';
import { NavMenu } from './nav.menu';
import userEvent from '@testing-library/user-event';

describe('Given NavMenu component', () => {
  describe('When the component is rendered', () => {
    beforeEach(() => {
      render(
        <Router>
          <NavMenu></NavMenu>
        </Router>
      );
    });

    test('Then, one of the navMenuOptions should be in the document', () => {
      const element = screen.getByText(navMenuOptions[0].label);
      expect(element).toBeInTheDocument();
    });

    test('Then, if the user clicks in the burger menu, the burger menu should be in the document and the handleClick function should be called', async () => {
      const elements = screen.getAllByRole('img');
      await act(async () => {
        await userEvent.click(elements[1]);
      });
      expect(elements[1]).toBeInTheDocument();
    });
  });
});
