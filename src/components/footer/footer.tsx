import style from './footer.style.module.scss';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerCopyright}>
        <p>Copyright © Guitar World - All rights reserved</p>
      </div>

      <div className={style.footerPickLogo}>
        <img
          className={style.footerPickLogoImg}
          src="./images/rock-pick.png"
          alt="rock-pick-logo"
        />
      </div>

      <div className={style.footerFollowUs}>
        <a href="https://www.facebook.com/leandro.lupano">
          <img
            className={style.footerFollowUsFacebook}
            src="./images/facebook.png"
            alt="facebook-logo"
          />
        </a>
        <a href="https://www.instagram.com/leandro.lupano/">
          <img
            className={style.footerFollowUsInstagram}
            src="./images/instagram.png"
            alt="instagram-logo"
          />
        </a>
        <a href="https://twitter.com/">
          <img
            className={style.footerFollowUsTwitter}
            src="./images/twitter.png"
            alt="twitter-logo"
          />
        </a>
      </div>
    </footer>
  );
}
