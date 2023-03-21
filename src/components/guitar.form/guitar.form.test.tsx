/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import GuitarForm from './guitar.form';

describe('Given the GuitarForm component', () => {
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <Router>
          <GuitarForm></GuitarForm>
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
