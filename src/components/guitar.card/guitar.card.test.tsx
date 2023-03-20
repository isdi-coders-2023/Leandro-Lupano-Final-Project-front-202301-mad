/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import GuitarCard from './guitar.card';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { GuitarStructure } from '../../models/guitar';
import userEvent from '@testing-library/user-event';
import { useUsers } from '../../hooks/use.users';
import { UsersApiRepo } from '../../services/repositories/users.api.repo';

jest.mock('../../hooks/use.users');

describe('Given the GuitarCard component', () => {
  const usersMockRepo = {} as unknown as UsersApiRepo;
  const preparationTest = (action: string) => {
    const guitarMock = {
      id: '1',
      brand: 'testBrand',
      modelGuitar: 'testModel',
      picture: 'testPicture',
      style: 'testStyle',
      material: 'testMaterial',
      price: 1,
      description: 'testDescription',
    } as unknown as GuitarStructure;

    (useUsers as jest.Mock).mockReturnValue({
      userCart: jest.fn(),
    });

    render(
      <Provider store={store}>
        <Router>
          <GuitarCard guitar={guitarMock} action={action}></GuitarCard>
        </Router>
      </Provider>
    );
  };

  describe('When the component is rendered with products action', () => {
    test('Then the AddGuitar button should be in the document and if the user clicked it, the userCart function should be called', async () => {
      preparationTest('products');
      const elements = screen.getAllByRole('button');
      await userEvent.click(elements[1]);
      expect(elements[1]).toBeInTheDocument();
      expect(useUsers(usersMockRepo).userCart).toHaveBeenCalled();
    });
  });

  describe('When the component is rendered with myguitars action', () => {
    test('Then the RemoveGuitar button should be in the document and if the user clicked it, the userCart function should be called', async () => {
      preparationTest('myguitars');
      const elements = screen.getAllByRole('button');
      await userEvent.click(elements[1]);
      expect(elements[1]).toBeInTheDocument();
      expect(useUsers(usersMockRepo).userCart).toHaveBeenCalled();
    });
  });
});
