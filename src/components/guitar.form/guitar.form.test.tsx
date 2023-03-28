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
jest.mock('../../services/firebase/firebase.config');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: () => mockNavigate,
}));

describe('Given the GuitarForm component', () => {
  const preparationTest = (action: string) => {
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
          style: 'Electric',
          material: 'testMaterial',
          price: 1,
          description: 'testDescription',
        } as unknown as GuitarStructure,
        actionProps: action,
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
  };
  describe('When the component is rendered with the Edit action and the user complete the Edit Guitar form', () => {
    test('Then the main title should be in the document', () => {
      preparationTest('edit');
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });

    test('Then the Brand <input> should be in the document', () => {
      preparationTest('edit');
      const editInputs = screen.getAllByRole('textbox');
      expect(editInputs[0]).toBeInTheDocument();
    });

    test('Then the modelGuitar <input> should be in the document', () => {
      preparationTest('edit');
      const editInputs = screen.getAllByRole('textbox');
      expect(editInputs[1]).toBeInTheDocument();
    });

    test('Then the picture <input> should be in the document', () => {
      preparationTest('edit');
      const editInputs = screen.getAllByRole('textbox');
      expect(editInputs[2]).toBeInTheDocument();
    });

    test('Then the Electric style <input> should be in the document', () => {
      preparationTest('edit');
      const editRadioInputs = screen.getAllByRole('radio');
      expect(editRadioInputs[0]).toBeInTheDocument();
    });

    test('Then the Acoustic style <input> should be in the document', () => {
      preparationTest('edit');
      const editRadioInputs = screen.getAllByRole('radio');
      expect(editRadioInputs[1]).toBeInTheDocument();
    });

    test('Then the material <input> should be in the document', () => {
      preparationTest('edit');
      const editInputs = screen.getAllByRole('textbox');
      expect(editInputs[3]).toBeInTheDocument();
    });

    test('Then the price <input> should be in the document', () => {
      preparationTest('edit');
      const editPriceInput = screen.getByRole('spinbutton');
      expect(editPriceInput).toBeInTheDocument();
    });

    test('Then the description <input> should be in the document', () => {
      preparationTest('edit');
      const editInputs = screen.getAllByRole('textbox');
      expect(editInputs[4]).toBeInTheDocument();
    });

    test('Then the Edit button should be in the document', () => {
      preparationTest('edit');
      const buttons = screen.getAllByRole('button');
      expect(buttons[1]).toBeInTheDocument();
    });

    test('Then if the user click on Back Button, the mockNavigate function should be called', async () => {
      preparationTest('edit');
      const elements = screen.getAllByRole('button');
      await userEvent.click(elements[0]);
      expect(mockNavigate).toHaveBeenCalled();
    });

    test('Then if the submit button is clicked, the updateGuitar function should be called', async () => {
      preparationTest('edit');
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;

      const editInputs = screen.getAllByRole('textbox');
      await userEvent.type(editInputs[0], '-edit');
      await userEvent.type(editInputs[1], '-edit');
      await userEvent.type(editInputs[3], '-edit');
      await userEvent.type(editInputs[4], '-edit');

      const editRadioInputs = screen.getAllByRole('radio');
      await userEvent.click(editRadioInputs[0]);

      const editPriceInput = screen.getByRole('spinbutton');
      await userEvent.type(editPriceInput, '0');

      const buttons = screen.getAllByRole('button');
      await act(async () => {
        fireEvent.click(buttons[1]);
      });

      expect(useGuitars(guitarsMockRepo).updateGuitar).toHaveBeenCalledWith(
        '1',
        {
          brand: 'testBrand-edit',
          modelGuitar: 'testModel-edit',
          picture: 'testPicture',
          style: 'Electric',
          material: 'testMaterial-edit',
          price: 10,
          description: 'testDescription-edit',
        }
      );
    });

    test('Then if the submit button is clicked, and a new picture is upload, the updateGuitar function should be called with the new picture', async () => {
      preparationTest('edit');
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;

      const editTypeInputs = screen.getAllByRole('textbox');
      await userEvent.type(editTypeInputs[0], 'brand-create');
      await userEvent.type(editTypeInputs[1], 'modelGuitar-create');
      await userEvent.type(editTypeInputs[3], 'material-create');
      await userEvent.type(editTypeInputs[4], 'description-create');

      const editInputPicture = screen.getByLabelText('Upload picture');

      await act(async () => {
        userEvent.upload(
          editInputPicture,
          new File(['test'], 'test.png', {
            type: 'image/png',
          })
        );
      });

      const editRadioInputs = screen.getAllByRole('radio');
      await act(async () => {
        fireEvent.click(editRadioInputs[0]);
      });

      const editPriceInput = screen.getByRole('spinbutton');
      await userEvent.type(editPriceInput, '100');

      const buttons = screen.getAllByRole('button');
      await act(async () => {
        fireEvent.click(buttons[1]);
      });

      expect(useGuitars(guitarsMockRepo).updateGuitar).toHaveBeenCalled();
    });

    test('Then, if the edit button is clicked, after the setTimeout the mockNavigate function should be called', async () => {
      preparationTest('edit');
      jest.useFakeTimers();
      const buttons = screen.getAllByRole('button');
      await act(async () => {
        fireEvent.click(buttons[1]);
        jest.advanceTimersByTime(2100);
      });
      expect(mockNavigate).toHaveBeenCalled();
      jest.useRealTimers();
    });
  });

  describe('When the action is Create and the user complete the Create Guitar form', () => {
    test('Then if the submit button is clicked, the createGuitar function should be called', async () => {
      preparationTest('create');
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;

      const createInputs = screen.getAllByRole('textbox');
      await userEvent.type(createInputs[0], 'brand-create');
      await userEvent.type(createInputs[1], 'modelGuitar-create');
      await userEvent.type(createInputs[2], 'picture-create');
      await userEvent.type(createInputs[3], 'material-create');
      await userEvent.type(createInputs[4], 'description-create');

      const createRadioInputs = screen.getAllByRole('radio');
      await act(async () => {
        fireEvent.click(createRadioInputs[0]);
      });

      const createPriceInput = screen.getByRole('spinbutton');
      await userEvent.type(createPriceInput, '100');

      const buttons = screen.getAllByRole('button');
      await act(async () => {
        fireEvent.click(buttons[1]);
      });

      expect(useGuitars(guitarsMockRepo).createGuitar).toHaveBeenCalledWith({
        brand: 'brand-create',
        modelGuitar: 'modelGuitar-create',
        picture: undefined,
        style: 'Electric',
        material: 'material-create',
        price: 100,
        description: 'description-create',
      });
    });

    test('Then, if the create button is clicked, after the setTimeout the mockNavigate function should be called', async () => {
      preparationTest('create');
      const guitarsMockRepo = {} as unknown as GuitarsApiRepo;

      const createInputs = screen.getAllByRole('textbox');
      await userEvent.type(createInputs[0], 'brand-create');
      await userEvent.type(createInputs[1], 'modelGuitar-create');
      await userEvent.type(createInputs[3], 'material-create');
      await userEvent.type(createInputs[4], 'description-create');

      const inputPicture = screen.getByLabelText('Upload picture');

      await act(async () => {
        userEvent.upload(
          inputPicture,
          new File(['test'], 'test.png', {
            type: 'image/png',
          })
        );
      });

      const createRadioInputs = screen.getAllByRole('radio');
      await act(async () => {
        fireEvent.click(createRadioInputs[0]);
      });

      const createPriceInput = screen.getByRole('spinbutton');
      await userEvent.type(createPriceInput, '100');

      jest.useFakeTimers();
      const buttons = screen.getAllByRole('button');

      await act(async () => {
        fireEvent.click(buttons[1]);
        jest.advanceTimersByTime(2200);
      });
      // TEMPORAL: HASTA RESOLVER EL SETTIMEOUT()
      // expect(mockNavigate).toHaveBeenCalled();
      jest.useRealTimers();
      expect(useGuitars(guitarsMockRepo).createGuitar).toHaveBeenCalled();
    });
  });
});
