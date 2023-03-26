import { Link } from 'react-router-dom';
import style from './error.page.style.module.scss';

export default function ErrorPage() {
  return (
    <section className={style.errorPage}>
      <div className={style.errorPageTitle}>
        <p className={style.errorPageTitleCode}>404</p>
        <p className={style.errorPageTitleMessage}>Page not found</p>
      </div>
      <img src="./images/guitar-player.png" alt="Guitar player"></img>
      <p>
        Let`s rock with
        <Link to="/login">
          <span> your account</span>
        </Link>
      </p>
    </section>
  );
}
