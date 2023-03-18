import { Link } from 'react-router-dom';
import style from './error.page.style.module.scss';

export default function ErrorPage() {
  return (
    <div className={style.errorPage}>
      <div className={style.errorPageTitle}>
        <p className={style.errorPageTitleCode}>404</p>
        <p className={style.errorPageTitleMessage}>Page not found</p>
      </div>
      <img src="./images/guitar-player.png" alt="Guitar player"></img>
      <p>
        Let`s rock to
        <Link to="./home">
          <span> home page</span>
        </Link>
      </p>
    </div>
  );
}
