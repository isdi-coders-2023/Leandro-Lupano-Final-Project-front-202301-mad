import { Link } from 'react-router-dom';
import { NavOption, navMenuOptions } from '../app.router/nav.menu.options';

export function NavMenu() {
  const navMenuOptionsArray: NavOption[] = navMenuOptions;

  return (
    <ul className="nav-menu-options">
      {navMenuOptionsArray.map((option) => (
        <li key={option.label}>
          <Link to={option.path}>{option.label}</Link>
        </li>
      ))}
    </ul>
  );
}
