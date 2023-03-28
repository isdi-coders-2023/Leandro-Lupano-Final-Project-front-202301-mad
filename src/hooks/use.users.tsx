import { useDispatch, useSelector } from 'react-redux';
import { GuitarStructure } from '../models/guitar';
import { UserStructure } from '../models/user';
import { errorActive, errorDisable } from '../reducers/error.slice';
import { pageUpdate, styleUpdate } from '../reducers/guitar.slice';
import { login, logout, register, updateUser } from '../reducers/user.slice';
import { UsersApiRepo } from '../services/repositories/users.api.repo';
import { AppDispatch, RootState } from '../store/store';

export function useUsers(repo: UsersApiRepo) {
  const usersState = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch<AppDispatch>();

  const registerUser = async (userInfo: Partial<UserStructure>) => {
    try {
      const infoUser = await repo.create(userInfo, 'register');

      dispatch(register(infoUser.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const loginUser = async (userInfo: Partial<UserStructure>) => {
    try {
      const infoUser = await repo.create(userInfo, 'login');
      dispatch(login(infoUser.results[0]));
      dispatch(errorDisable());
    } catch (error) {
      console.log((error as Error).message);
      dispatch(errorActive((error as Error).message));
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    dispatch(pageUpdate(1));
    dispatch(styleUpdate('All'));
  };

  const userCart = async (idGuitar: GuitarStructure['id'], action: string) => {
    try {
      const userToken = usersState.userLogged.token;

      if (!userToken) throw new Error('Not authorized');

      const userInfo = await repo.update(idGuitar, userToken, action);

      dispatch(updateUser(userInfo.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    usersState,
    registerUser,
    loginUser,
    logoutUser,
    userCart,
  };
}
