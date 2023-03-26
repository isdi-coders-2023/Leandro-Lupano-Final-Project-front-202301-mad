import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { UsersApiRepo } from '../../services/repositories/users.api.repo';
import { NavOption, navMenuOptions } from '../app.router/nav.menu.options';
import style from './nav.menu.style.module.scss';

export function NavMenu() {
  const userRepo = useMemo(() => new UsersApiRepo(), []);

  const { usersState, logoutUser } = useUsers(userRepo);

  const isLogged: boolean =
    usersState.userLogged.token !== undefined ? true : false;

  const isAdmin: boolean =
    usersState.userLogged.role === 'Admin' ? true : false;

  const navMenuOptionsArray: NavOption[] = navMenuOptions;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className={style.navMenu}>
      {!isLogged ? (
        <Link to={'/login'}>
          <img
            className={style.navMenuLogin}
            src="./images/login-logo.png"
            alt="login-logo"
          />
        </Link>
      ) : (
        <></>
      )}

      {isLogged ? (
        <>
          <img
            className={style.navMenuLogin}
            src="./images/logout-button.png"
            alt="login-logo"
            onClick={handleLogout}
          />

          <img
            className={style.navMenuBurger}
            src="./images/burger-menu.png"
            alt="burger-menu-logo"
            onClick={handleClick}
          />

          <ul
            className={
              isMenuOpen ? style.navMenuOptionsOpen : style.navMenuOptions
            }
          >
            {navMenuOptionsArray.map((option) => (
              <li key={option.label} onClick={handleClick}>
                <Link to={option.path}>{option.label}</Link>
              </li>
            ))}

            {isAdmin ? (
              <li key="Users" onClick={handleClick}>
                <Link to="/users">Users</Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </>
      ) : (
        <div></div>
      )}
    </nav>
  );
}
