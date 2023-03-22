/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, fireEvent, render, screen } from '@testing-library/react';
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

        const locationEditForm = {
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

        (useLocation as jest.Mock).mockReturnValue(locationEditForm);

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
      const editInputs = screen.getAllByRole('textbox');
      expect(editInputs[0]).toBeInTheDocument();
    });

    test('Then the modelGuitar <input> should be in the document', () => {
      const editInputs = screen.getAllByRole('textbox');
      expect(editInputs[1]).toBeInTheDocument();
    });

    test('Then the picture <input> should be in the document', () => {
      const editInputs = screen.getAllByRole('textbox');
      expect(editInputs[2]).toBeInTheDocument();
    });

    test('Then the Electric style <input> should be in the document', () => {
      const editRadioInputs = screen.getAllByRole('radio');
      expect(editRadioInputs[0]).toBeInTheDocument();
    });

    test('Then the Acoustic style <input> should be in the document', () => {
      const editRadioInputs = screen.getAllByRole('radio');
      expect(editRadioInputs[1]).toBeInTheDocument();
    });

    test('Then the material <input> should be in the document', () => {
      const editInputs = screen.getAllByRole('textbox');
      expect(editInputs[3]).toBeInTheDocument();
    });

    test('Then the price <input> should be in the document', () => {
      const editPriceInput = screen.getByRole('spinbutton');
      expect(editPriceInput).toBeInTheDocument();
    });

    test('Then the description <input> should be in the document', () => {
      const editInputs = screen.getAllByRole('textbox');
      expect(editInputs[4]).toBeInTheDocument();
    });

    test('Then the button should be in the document', () => {
      const editButton = screen.getByRole('button');
      expect(editButton).toBeInTheDocument();
    });

    test('Then if the submit button is clicked, the updateGuitar function should be called', async () => {
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;
      const editInputs = screen.getAllByRole('textbox');
      await userEvent.type(editInputs[0], 'brand-test');
      await userEvent.type(editInputs[1], 'modelGuitar-test');
      await userEvent.type(editInputs[2], 'picture-test');
      await userEvent.type(editInputs[3], 'material-test');
      await userEvent.type(editInputs[4], 'description-test');

      const editRadioInputs = screen.getAllByRole('radio');
      await userEvent.click(editRadioInputs[0]);

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
          style: 'Electric',
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

        const locationCreateForm = {
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

        (useLocation as jest.Mock).mockReturnValue(locationCreateForm);

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
      const createInputs = screen.getAllByRole('textbox');
      await userEvent.type(createInputs[0], 'brand-create');
      await userEvent.type(createInputs[1], 'modelGuitar-create');
      await userEvent.type(createInputs[2], 'picture-create');
      await userEvent.type(createInputs[3], 'material-create');
      await userEvent.type(createInputs[4], 'description-create');

      const createRadioInputs = screen.getAllByRole('radio');
      await fireEvent.click(createRadioInputs[0]);

      const createPriceInput = screen.getByRole('spinbutton');
      await userEvent.type(createPriceInput, '2000');

      const createButton = screen.getByRole('button');
      await userEvent.click(createButton);

      expect(useGuitars(guitarsMockRepo).createGuitar).toHaveBeenCalledWith({
        brand: 'brand-create',
        modelGuitar: 'modelGuitar-create',
        picture: '',
        style: 'Electric',
        material: 'material-create',
        price: 2000,
        description: 'description-create',
      });
    });
  });
});
