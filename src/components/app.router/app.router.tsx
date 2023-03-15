import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { linkOptions } from './link.options';
import { NavOption, navMenuOptions } from './nav.menu.options';

// Routes from the navigation menu:
const Home = lazy(() => import('../home/home'));
const Login = lazy(() => import('../login/login'));
// TEMP. FUTURE ROUTE: const Products = lazy(() => import('../home/home'));
// TEMP. FUTURE ROUTE:const MyGuitars = lazy(() => import('../home/home'));
// TEMP. FUTURE ROUTE:const About = lazy(() => import('../home/home'));
// TEMP. FUTURE ROUTE:const Users = lazy(() => import('../home/home'));
// TEMP. FUTURE ROUTE:const Error = lazy(() => import('../home/home'));

// Routes from links:
const GuitarDetails = lazy(() => import('../home/home'));
// TEMP. FUTURE ROUTE: const EditGuitar = lazy(() => import('../home/home'));
// TEMP. FUTURE ROUTE: const CreateGuitar = lazy(() => import('../home/home'));
// TEMP. FUTURE ROUTE: const DeleteGuitar = lazy(() => import('../home/home'));
// TEMP. FUTURE ROUTE: const EditUser = lazy(() => import('../home/home'));
// TEMP. FUTURE ROUTE: const DeleteUser = lazy(() => import('../home/home'));

export function AppRouter() {
  const navMenuOptionsArray: NavOption[] = navMenuOptions;
  const linkOptionsArray: NavOption[] = linkOptions;

  return (
    <Suspense>
      <Routes>
        <Route path={'/'} element={<Home></Home>}></Route>
        <Route
          path={navMenuOptionsArray[0].path}
          element={<Home></Home>}
        ></Route>
        <Route
          path={navMenuOptionsArray[1].path}
          element={<Login></Login>}
        ></Route>
        {/* TEMP. FUTURE ROUTE: <Route
          path={navMenuOptionsArray[2].path}
          element={<Products></Products>}
        ></Route>
        TEMP. FUTURE ROUTE: <Route
          path={navMenuOptionsArray[3].path}
          element={<MyGuitars></MyGuitars>}
        ></Route>
        TEMP. FUTURE ROUTE: <Route
          path={navMenuOptionsArray[4].path}
          element={<About></About>}
        ></Route>
        TEMP. FUTURE ROUTE: <Route
          path={navMenuOptionsArray[5].path}
          element={<Users></Users>}
        ></Route> */}
        <Route
          path={linkOptionsArray[0].path}
          element={<GuitarDetails></GuitarDetails>}
        ></Route>
        {/*TEMP. FUTURE ROUTE: <Route
          path={linkOptionsArray[1].path}
          element={<EditGuitar></EditGuitar>}
        ></Route>
        TEMP. FUTURE ROUTE: <Route
          path={linkOptionsArray[2].path}
          element={<CreateGuitar></CreateGuitar>}
        ></Route>
        TEMP. FUTURE ROUTE: <Route
          path={linkOptionsArray[3].path}
          element={<DeleteGuitar></DeleteGuitar>}
        ></Route>
        TEMP. FUTURE ROUTE: <Route
          path={linkOptionsArray[4].path}
          element={<EditUser></EditUser>}
        ></Route>
        TEMP. FUTURE ROUTE: <Route
          path={linkOptionsArray[5].path}
          element={<DeleteUser></DeleteUser>}
        ></Route>
        TEMP. FUTURE ROUTE: <Route path={'*'} element={<Error></Error>}></Route> */}
      </Routes>
    </Suspense>
  );
}
