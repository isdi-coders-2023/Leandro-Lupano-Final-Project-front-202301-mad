import style from './guitar.card.style.module.scss';

export default function GuitarCard() {
  return (
    <section className={style.guitarCard}>
      <div className={style.guitarCardInfo}>
        <p className={style.guitarCardInfoBrand}>Brand</p>
        <p className={style.guitarCardInfoModel}>Model</p>
        <img src="./images/gibson-firebird.png" alt="Gibson-Firebird-Guitar" />
        <p className={style.guitarCardInfoStyle}>Style</p>
        <p className={style.guitarCardInfoPrice}>Price</p>
      </div>

      <button className={style.guitarCardMoreDetails}>More details</button>
    </section>
  );
}
