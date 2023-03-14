/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import Home from './home';
import userEvent from '@testing-library/user-event';

describe('Given Home component', () => {
  const handleSubmit = jest.fn();

  describe('When the component is rendered', () => {
    test('Then the heading <h2> should be in the document', async () => {
      render(<Home></Home>);
      const element = await screen.findByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });
  describe('When the submit button is clicked', () => {
    test('Then, the handleSubmit function should be called', async () => {
      const element = await screen.findByRole('button');
      await (async () => userEvent.click(element));
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
