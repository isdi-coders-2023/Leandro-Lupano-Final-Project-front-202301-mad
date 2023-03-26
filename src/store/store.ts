import { configureStore } from '@reduxjs/toolkit';
import { errorReducer } from '../reducers/error.slice';
import { guitarReducer } from '../reducers/guitar.slice';
import { userReducer } from '../reducers/user.slice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    guitars: guitarReducer,
    errors: errorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
