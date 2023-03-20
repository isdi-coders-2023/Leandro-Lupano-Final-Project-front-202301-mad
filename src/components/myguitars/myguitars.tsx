import style from './myguitars.style.module.scss';

export default function MyGuitars() {
  return (
    <section className={style.myguitars}>
      <div className={style.myguitarsHeader}>
        <h2 className={style.myguitarsHeaderTitle}>MyGuitars</h2>
      </div>

      <div className={style.myguitarsCardList}>
        <div className={style.myguitarsCard}>
          GuitarCard
          <button className={style.myguitarsCardButtonsRemove}>
            <img src="./images/remove-button.png" alt="Remove-button" />
          </button>
        </div>
        <div className={style.myguitarsCard}>
          GuitarCard
          <button className={style.myguitarsCardButtonsRemove}>
            <img src="./images/remove-button.png" alt="Remove-button" />
          </button>
        </div>
      </div>
    </section>
  );
}
