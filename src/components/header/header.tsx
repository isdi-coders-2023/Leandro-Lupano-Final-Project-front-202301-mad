import style from './header.style.module.scss';

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.headerLogo}>
        <a href="/home">
          <img
            className={style.headerLogoImg}
            src="./images/guitar-world-logo.png"
            alt="guitar-world-logo"
          />
        </a>
      </div>

      <div className={style.headerNavMenu}>NAVEGACIÓN</div>
    </header>
  );
}
