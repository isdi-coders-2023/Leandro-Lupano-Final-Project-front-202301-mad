/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import GuitarForm from './guitar.form';
import '@testing-library/jest-dom';
import { useGuitars } from '../../hooks/use.guitars';
import { GuitarsApiRepo } from '../../services/repositories/guitars.api.repo';
import userEvent from '@testing-library/user-event';
import { GuitarStructure } from '../../models/guitar';

jest.mock('../../hooks/use.guitars');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: () => mockNavigate,
}));

describe('Given the GuitarForm component', () => {
  describe('When the component is rendered with the Edit action and the user complete the Edit Guitar form', () => {
    beforeEach(async () => {
      await act(async () => {
        (useGuitars as jest.Mock).mockReturnValue({
          updateGuitar: jest.fn(),
          createGuitar: jest.fn(),
        });

        const location = {
          state: {
            guitarProps: {
              id: '1',
              brand: 'testBrand',
              modelGuitar: 'testModel',
              picture: 'testPicture',
              style: 'testStyle',
              material: 'testMaterial',
              price: 1,
              description: 'testDescription',
            } as unknown as GuitarStructure,
            actionProps: 'edit',
          },
        };

        (useLocation as jest.Mock).mockReturnValue(location);

        render(
          <Provider store={store}>
            <Router>
              <GuitarForm></GuitarForm>
            </Router>
          </Provider>
        );
      });
    });

    test('Then the main title should be in the document', () => {
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });

    test('Then the Brand <input> should be in the document', () => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toBeInTheDocument();
    });

    test('Then the modelGuitar <input> should be in the document', () => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[1]).toBeInTheDocument();
    });

    test('Then the picture <input> should be in the document', () => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[2]).toBeInTheDocument();
    });

    test('Then the style <input> should be in the document', () => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[3]).toBeInTheDocument();
    });

    test('Then the material <input> should be in the document', () => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[4]).toBeInTheDocument();
    });

    test('Then the price <input> should be in the document', () => {
      const input = screen.getByRole('spinbutton');
      expect(input).toBeInTheDocument();
    });

    test('Then the description <input> should be in the document', () => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[5]).toBeInTheDocument();
    });

    test('Then the button should be in the document', () => {
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    test('Then if the submit button is clicked, the updateGuitar function should be called', async () => {
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;
      const inputs = screen.getAllByRole('textbox');
      await userEvent.type(inputs[0], 'brand-test');
      await userEvent.type(inputs[1], 'modelGuitar-test');
      await userEvent.type(inputs[2], 'picture-test');
      await userEvent.type(inputs[3], 'style-test');
      await userEvent.type(inputs[4], 'material-test');
      await userEvent.type(inputs[5], 'description-test');

      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '1000');

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(useGuitars(guitarsMockRepo).updateGuitar).toHaveBeenCalledWith(
        '1',
        {
          brand: 'brand-test',
          modelGuitar: 'modelGuitar-test',
          picture: '',
          style: 'style-test',
          material: 'material-test',
          price: 1000,
          description: 'description-test',
        }
      );
    });
  });

  describe('When the action is Create and the user complete the Create Guitar form', () => {
    beforeEach(async () => {
      await act(async () => {
        (useGuitars as jest.Mock).mockReturnValue({
          updateGuitar: jest.fn(),
          createGuitar: jest.fn(),
        });

        const location = {
          state: {
            guitarProps: {
              id: '1',
              brand: 'testBrand',
              modelGuitar: 'testModel',
              picture: 'testPicture',
              style: 'testStyle',
              material: 'testMaterial',
              price: 1,
              description: 'testDescription',
            } as unknown as GuitarStructure,
            actionProps: 'create',
          },
        };

        (useLocation as jest.Mock).mockReturnValue(location);

        render(
          <Provider store={store}>
            <Router>
              <GuitarForm></GuitarForm>
            </Router>
          </Provider>
        );
      });
    });

    test('Then if the submit button is clicked, the createGuitar function should be called', async () => {
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;
      const inputs = screen.getAllByRole('textbox');
      await userEvent.type(inputs[0], 'brand-create');
      await userEvent.type(inputs[1], 'modelGuitar-create');
      await userEvent.type(inputs[2], 'picture-create');
      await userEvent.type(inputs[3], 'style-create');
      await userEvent.type(inputs[4], 'material-create');
      await userEvent.type(inputs[5], 'description-create');

      const input = screen.getByRole('spinbutton');
      await userEvent.type(input, '2000');

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(useGuitars(guitarsMockRepo).createGuitar).toHaveBeenCalledWith({
        brand: 'brand-create',
        modelGuitar: 'modelGuitar-create',
        picture: '',
        style: 'style-create',
        material: 'material-create',
        price: 2000,
        description: 'description-create',
      });
    });
  });
});
