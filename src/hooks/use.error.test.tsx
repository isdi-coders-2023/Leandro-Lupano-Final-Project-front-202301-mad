/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useError } from './use.error';

describe('Given the useError Custom Hook and a TestUserComponent', () => {
  let errorMessageTest: string | undefined;
  let errorStatusTest: boolean | undefined;

  beforeEach(async () => {
    const TestComponent = function () {
      const { errorState, disableError } = useError();

      errorMessageTest = errorState.errorMessage;
      errorStatusTest = errorState.errorStatus;

      return <button onClick={() => disableError()}>Disable Error</button>;
    };

    await act(async () =>
      render(
        <Provider store={store}>
          <TestComponent></TestComponent>
        </Provider>
      )
    );
  });

  describe('When the TestComponent is rendered', () => {
    test('Then, if the disable error button is clicked, the errorMessage should be an empty string and errorStatus should be false', async () => {
      const element = await screen.findByRole('button');
      await act(async () => userEvent.click(element));
      expect(errorMessageTest).toBe('');
      expect(errorStatusTest).toBe(false);
    });
  });
});
