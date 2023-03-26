import { AppDispatch, RootState } from '../store/store';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarStructure } from '../models/guitar';
import { GuitarsApiRepo } from '../services/repositories/guitars.api.repo';
import {
  read,
  readId,
  create,
  updateGuitarSlice,
  deleteGuitar,
  pageUpdate,
  styleUpdate,
} from '../reducers/guitar.slice';

export function useGuitars(repo: GuitarsApiRepo) {
  const usersState = useSelector((state: RootState) => state.users);
  const guitarsState = useSelector((state: RootState) => state.guitars);

  const dispatch = useDispatch<AppDispatch>();

  const loadGuitars = useCallback(
    async (pageLoad: number, styleLoad: string) => {
      try {
        const userToken = usersState.userLogged.token;
        if (!userToken) throw new Error('Not authorized');

        const guitarsInfo = await repo.read(userToken, pageLoad, styleLoad);

        dispatch(read(guitarsInfo.results));
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    [dispatch, repo, usersState.userLogged.token]
  );

  const changePage = (pageChange: number) => {
    try {
      const userToken = usersState.userLogged.token;
      if (!userToken) throw new Error('Not authorized');

      let newPage = guitarsState.actualPage + pageChange;

      if (newPage === 0) newPage = 1;

      dispatch(pageUpdate(newPage));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const changeStyle = (styleChange: string) => {
    try {
      const userToken = usersState.userLogged.token;
      if (!userToken) throw new Error('Not authorized');

      dispatch(pageUpdate(1));
      dispatch(styleUpdate(styleChange));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const loadOneGuitar = async (idGuitar: GuitarStructure['id']) => {
    try {
      const userToken = usersState.userLogged.token;
      if (!userToken) throw new Error('Not authorized');

      const guitarInfo = await repo.readId(userToken, idGuitar);

      dispatch(readId(guitarInfo.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const createGuitar = async (infoGuitar: Partial<GuitarStructure>) => {
    try {
      const userToken = usersState.userLogged.token;
      if (!userToken) throw new Error('Not authorized');

      const guitarInfo = await repo.create(userToken, infoGuitar);

      dispatch(create(guitarInfo.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const updateGuitar = async (
    idGuitar: GuitarStructure['id'],
    infoGuitar: Partial<GuitarStructure>
  ) => {
    try {
      const userToken = usersState.userLogged.token;
      if (!userToken) throw new Error('Not authorized');

      const guitarInfo = await repo.update(userToken, idGuitar, infoGuitar);

      dispatch(updateGuitarSlice(guitarInfo.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const deleteOneGuitar = async (idGuitar: GuitarStructure['id']) => {
    try {
      const userToken = usersState.userLogged.token;
      if (!userToken) throw new Error('Not authorized');

      const guitarId: string = idGuitar;

      await repo.delete(userToken, guitarId);

      dispatch(deleteGuitar(guitarId));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    guitarsState,
    loadGuitars,
    loadOneGuitar,
    createGuitar,
    updateGuitar,
    deleteOneGuitar,
    changePage,
    changeStyle,
  };
}
