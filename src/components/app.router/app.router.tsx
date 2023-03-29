import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { linkOptions } from './link.options';
import { NavOption, navMenuOptions } from './nav.menu.options';

// Routes from the navigation menu:
const Register = lazy(() => import('../register/register'));
const Login = lazy(() => import('../login/login'));
const Products = lazy(() => import('../products/products'));
const MyGuitars = lazy(() => import('../myguitars/myguitars'));
const About = lazy(() => import('../about/about'));
// EXTRA TEMP. FUTURE ROUTE:const Users = lazy(() => import('../login/login'));
const ErrorPage = lazy(() => import('../error.page/error.page'));

// Routes from links:
const GuitarDetails = lazy(() => import('../guitar.details/guitar.details'));
const GuitarForm = lazy(() => import('../guitar.form/guitar.form'));
const DeleteGuitar = lazy(() => import('../delete.guitar/delete.guitar'));
// EXTRA TEMP. FUTURE ROUTE: const EditUser = lazy(() => import('../login/login'));
// EXTRA TEMP. FUTURE ROUTE: const DeleteUser = lazy(() => import('../login/login'));

export function AppRouter() {
  const navMenuOptionsArray: NavOption[] = navMenuOptions;
  const linkOptionsArray: NavOption[] = linkOptions;

  return (
    <Suspense>
      <Routes>
        <Route path={'/'} element={<Login></Login>}></Route>
        <Route path={'/register'} element={<Register></Register>}></Route>
        <Route path={'/login'} element={<Login></Login>}></Route>
        <Route
          path={navMenuOptionsArray[0].path}
          element={<Products></Products>}
        ></Route>
        <Route
          path={navMenuOptionsArray[1].path}
          element={<MyGuitars></MyGuitars>}
        ></Route>
        <Route
          path={navMenuOptionsArray[2].path}
          element={<About></About>}
        ></Route>
        {/* EXTRA TEMP. FUTURE ROUTE: <Route
          path={'/users'}
          element={<Users></Users>}
        ></Route> */}
        <Route
          path={linkOptionsArray[0].path}
          element={<GuitarDetails></GuitarDetails>}
        ></Route>
        <Route
          path={linkOptionsArray[1].path}
          element={<GuitarForm></GuitarForm>}
        ></Route>
        <Route
          path={linkOptionsArray[2].path}
          element={<DeleteGuitar></DeleteGuitar>}
        ></Route>
        {/* EXTRA TEMP. FUTURE ROUTE: <Route
          path={linkOptionsArray[3].path}
          element={<EditUser></EditUser>}
        ></Route>
        EXTRA TEMP. FUTURE ROUTE: <Route
          path={linkOptionsArray[4].path}
          element={<DeleteUser></DeleteUser>}
        ></Route>  */}
        <Route path={'*'} element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </Suspense>
  );
}
