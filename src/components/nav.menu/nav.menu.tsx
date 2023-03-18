import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavOption, navMenuOptions } from '../app.router/nav.menu.options';
import style from './nav.menu.style.module.scss';

export function NavMenu() {
  const navMenuOptionsArray: NavOption[] = navMenuOptions;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={style.navMenu}>
      <Link to={'/login'}>
        <img
          className={style.navMenuLogin}
          src="./images/login-logo.png"
          alt="login-logo"
        />
      </Link>

      <img
        className={style.navMenuBurger}
        src="./images/burger-menu.png"
        alt="burger-menu-logo"
        onClick={handleClick}
      />

      <ul
        className={isMenuOpen ? style.navMenuOptionsOpen : style.navMenuOptions}
      >
        {navMenuOptionsArray.map((option) => (
          <li key={option.label} onClick={handleClick}>
            <Link to={option.path}>{option.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
