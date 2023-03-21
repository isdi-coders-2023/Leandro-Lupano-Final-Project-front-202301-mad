/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import EditGuitar from './edit.guitar';

describe('Given the EditGuitar component', () => {
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <Router>
          <EditGuitar></EditGuitar>
        </Router>
      </Provider>
    );
  });

  describe('When the component is rendered', () => {
    test('Then the main title should be in the document', () => {
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });
});
