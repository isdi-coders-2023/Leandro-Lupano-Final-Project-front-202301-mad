import style from './about.style.module.scss';

export default function About() {
  return (
    <section className={style.about}>
      <h2 className={style.aboutTitle}>About us</h2>

      <div className={style.aboutBody}>
        <div className={style.aboutBodyParagraph}>
          <h3>Who we are:</h3>
          <p>E-commerce of professional electric and acoustic guitars.</p>
        </div>

        <div className={style.aboutBodyParagraph}>
          <h3>Our mission:</h3>
          <p>
            Deliver the best instrument to all kind of musicians providing the
            best customer service experience.
          </p>
        </div>

        <div className={style.aboutBodyParagraph}>
          <h3>Our values:</h3>
          <p>
            We understand the importance to choose a good instrument to perform
            the music with the specific tone you are trying to find. That’s is
            our goal. Deliver the instrument you are looking for with the best
            customer service and the advice of our experienced team.
          </p>
        </div>

        <div className={style.aboutBodyParagraph}>
          <h3>Partners:</h3>
          <p>Our partners that make this possible are:</p>
          <div className={style.aboutPartners}>
            <a href="https://www.gibson.com/en-US">
              <img
                src="./images/gibson-logo.png"
                alt="Gibson logo and link"
              ></img>
            </a>
            <a href="https://www.fender.com/en-US/start">
              <img
                src="./images/fender-logo.svg"
                alt="Fender logo and link"
              ></img>
            </a>
            <a href="https://www.ibanez.com/eu/">
              <img
                src="./images/ibanez-logo.png"
                alt="Ibanez logo and link"
              ></img>
            </a>
            <a href="https://www.gretschguitars.com/">
              <img
                src="./images/gretsch-logo.png"
                alt="Gretsch logo and link"
              ></img>
            </a>
            <a href="https://www.taylorguitars.com/">
              <img
                src="./images/taylor-logo.png"
                alt="Taylor logo and link"
              ></img>
            </a>
          </div>
        </div>

        <div className={style.aboutBodyParagraph}>
          <h3>Contact:</h3>
          <p>
            You can follow us in ours social media: Facebook, Instagram and
            Twitter.
          </p>
        </div>
      </div>
    </section>
  );
}
