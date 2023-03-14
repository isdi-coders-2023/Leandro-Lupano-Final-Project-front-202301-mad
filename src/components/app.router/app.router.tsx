import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { linkOptions } from './link.options';
import { NavOption, navMenuOptions } from './nav.menu.options';

// Routes from the navigation menu:
const Home = lazy(() => import(''));
const Login = lazy(() => import(''));
const Products = lazy(() => import(''));
const MyGuitars = lazy(() => import(''));
const About = lazy(() => import(''));
const Users = lazy(() => import(''));
const Error = lazy(() => import(''));

// Routes from links:
const GuitarDetails = lazy(() => import(''));
const EditGuitar = lazy(() => import(''));
const CreateGuitar = lazy(() => import(''));
const DeleteGuitar = lazy(() => import(''));
const EditUser = lazy(() => import(''));
const DeleteUser = lazy(() => import(''));

export function AppRouter() {
  const navMenuOptionsArray: NavOption[] = navMenuOptions;
  const linkOptionsArray: NavOption[] = linkOptions;

  return (
    <Suspense>
      <Routes>
        <Route
          path={navMenuOptionsArray[0].path}
          element={<Home></Home>}
        ></Route>
        <Route
          path={navMenuOptionsArray[1].path}
          element={<Login></Login>}
        ></Route>
        <Route
          path={navMenuOptionsArray[2].path}
          element={<Products></Products>}
        ></Route>
        <Route
          path={navMenuOptionsArray[3].path}
          element={<MyGuitars></MyGuitars>}
        ></Route>
        <Route
          path={navMenuOptionsArray[4].path}
          element={<About></About>}
        ></Route>
        <Route
          path={navMenuOptionsArray[5].path}
          element={<Users></Users>}
        ></Route>
        <Route
          path={linkOptionsArray[0].path}
          element={<GuitarDetails></GuitarDetails>}
        ></Route>
        <Route
          path={linkOptionsArray[1].path}
          element={<EditGuitar></EditGuitar>}
        ></Route>
        <Route
          path={linkOptionsArray[2].path}
          element={<CreateGuitar></CreateGuitar>}
        ></Route>
        <Route
          path={linkOptionsArray[3].path}
          element={<DeleteGuitar></DeleteGuitar>}
        ></Route>
        <Route
          path={linkOptionsArray[4].path}
          element={<EditUser></EditUser>}
        ></Route>
        <Route
          path={linkOptionsArray[5].path}
          element={<DeleteUser></DeleteUser>}
        ></Route>
        <Route path={'*'} element={<Error></Error>}></Route>
      </Routes>
    </Suspense>
  );
}
