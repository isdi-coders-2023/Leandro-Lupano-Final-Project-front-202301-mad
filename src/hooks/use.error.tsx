import { useDispatch, useSelector } from 'react-redux';
import { errorDisable } from '../reducers/error.slice';
import { AppDispatch, RootState } from '../store/store';

export function useError() {
  const errorState = useSelector((state: RootState) => state.errors);

  const dispatch = useDispatch<AppDispatch>();

  const disableError = () => {
    dispatch(errorDisable());
  };

  return {
    errorState,
    disableError,
  };
}
