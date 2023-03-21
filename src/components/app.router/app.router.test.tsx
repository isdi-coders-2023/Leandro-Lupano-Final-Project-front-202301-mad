import { MemoryRouter as Router, useLocation } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { AppRouter } from './app.router';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useUsers } from '../../hooks/use.users';

jest.mock('../../hooks/use.users');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('Given AppRouter component', () => {
  const prepareTestFunction = (number: number) => {
    (useUsers as jest.Mock).mockReturnValue({
      usersState: {
        userLogged: {
          myGuitars: [{ id: '1' }, { id: '2' }],
        },
      },
    });

    render(
      <Provider store={store}>
        <Router
          initialEntries={[
            '/',
            '/home',
            '/login',
            '/products',
            '/myguitars',
            '/about',
            '/details',
            '/edit/guitar',
            '/create/guitar',
            '/error',
          ]}
          initialIndex={number}
        >
          <AppRouter></AppRouter>
        </Router>
      </Provider>
    );
  };

  describe('When it is rendered and the path is "/"', () => {
    test('Then, the submit button of home page should be in the document', async () => {
      await waitFor(async () => prepareTestFunction(0));
      const element = await screen.findByRole('button');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When it is rendered and the path is "/home"', () => {
    test('Then, the submit button of home page should be in the document', async () => {
      await waitFor(async () => prepareTestFunction(1));
      const element = await screen.findByRole('button');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When it is rendered and the path is "/login"', () => {
    test('Then, the submit button of login page should be in the document', async () => {
      await waitFor(async () => prepareTestFunction(2));
      const element = await screen.findByRole('button');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When it is rendered and the path is "/products"', () => {
    test('Then, the main heading of Products page should be in the document', async () => {
      await waitFor(async () => prepareTestFunction(3));
      const elements = await screen.findAllByRole('heading');
      expect(elements[0]).toBeInTheDocument();
    });
  });

  describe('When it is rendered and the path is "/myguitars"', () => {
    test('Then, the main heading of MyGuitars page should be in the document', async () => {
      await waitFor(async () => prepareTestFunction(4));
      const element = await screen.findByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When it is rendered and the path is "/about"', () => {
    test('Then, the main heading of About page should be in the document', async () => {
      await waitFor(async () => prepareTestFunction(5));
      const elements = await screen.findAllByRole('heading');
      expect(elements[0]).toBeInTheDocument();
    });
  });

  describe('When it is rendered and the path is "/details"', () => {
    test('Then, the main heading of Details page should be in the document', async () => {
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
          },
        },
      };

      (useLocation as jest.Mock).mockReturnValue(location);

      await waitFor(async () => prepareTestFunction(6));
      const element = await screen.findByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When it is rendered and the path is "/edit/guitar"', () => {
    test('Then, the main heading of Edit Guitar should be in the document', async () => {
      await waitFor(async () => prepareTestFunction(7));
      const elements = await screen.findAllByRole('heading');
      expect(elements[0]).toBeInTheDocument();
    });
  });

  describe('When it is rendered and the path is "/create/guitar"', () => {
    test('Then, the main heading of Create Guitar should be in the document', async () => {
      await waitFor(async () => prepareTestFunction(8));
      const elements = await screen.findAllByRole('heading');
      expect(elements[0]).toBeInTheDocument();
    });
  });

  describe('When it is rendered and the path is any other', () => {
    test('Then, the image ErrorPage should be in the document', async () => {
      await waitFor(async () => prepareTestFunction(9));
      const element = await screen.findByRole('img');
      expect(element).toBeInTheDocument();
    });
  });
});
