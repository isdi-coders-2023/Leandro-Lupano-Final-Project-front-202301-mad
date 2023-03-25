import { useDispatch, useSelector } from 'react-redux';
import { GuitarStructure } from '../models/guitar';
import { UserStructure } from '../models/user';
import { login, logout, register, update } from '../reducers/user.slice';
import { UsersApiRepo } from '../services/repositories/users.api.repo';
import { AppDispatch, RootState } from '../store/store';

export function useUsers(repo: UsersApiRepo) {
  const usersState = useSelector((state: RootState) => state.users);

  const usersDispatch = useDispatch<AppDispatch>();

  const registerUser = async (userInfo: Partial<UserStructure>) => {
    try {
      const infoUser = await repo.create(userInfo, 'register');

      usersDispatch(register(infoUser.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const loginUser = async (userInfo: Partial<UserStructure>) => {
    try {
      const infoUser = await repo.create(userInfo, 'login');
      usersDispatch(login(infoUser.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const logoutUser = async () => {
    try {
      usersDispatch(logout());
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const userCart = async (idGuitar: GuitarStructure['id'], action: string) => {
    try {
      const userToken = usersState.userLogged.token;

      if (!userToken) throw new Error('Not authorized');

      const userInfo = await repo.update(idGuitar, userToken, action);

      usersDispatch(update(userInfo.results[0]));
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
