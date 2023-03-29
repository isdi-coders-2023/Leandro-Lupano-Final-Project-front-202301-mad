import { NavMenu } from '../nav.menu/nav.menu';
import { Link } from 'react-router-dom';
import style from './header.style.module.scss';

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.headerLogo}>
        <Link to="/register">
          <img
            className={style.headerLogoImg}
            src="./images/guitar-world-logo-white-transparent.png"
            alt="guitar-world-logo"
          />
        </Link>
      </div>

      <div className={style.headerNavMenu}>
        <NavMenu></NavMenu>
      </div>
    </header>
  );
}
