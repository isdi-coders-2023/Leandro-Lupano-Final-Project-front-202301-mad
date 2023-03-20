import GuitarCard from '../guitar.card/guitar.card';
import style from './products.style.module.scss';

export default function Products() {
  return (
    <section className={style.products}>
      <div className={style.productsHeader}>
        <h2 className={style.productsHeaderTitle}>Products</h2>
        <div className={style.productsHeaderFilter}>FILTER</div>
      </div>

      <div className={style.productsCardList}>
        <div className={style.productsCard}>
          <GuitarCard></GuitarCard>
          <button className={style.productsCardButtonsAdd}>
            <img src="./images/shop-cart.png" alt="Shop-Cart-button" />
          </button>
        </div>
        <div className={style.productsCard}>
          <GuitarCard></GuitarCard>
          <button className={style.productsCardButtonsAdd}>
            <img src="./images/shop-cart.png" alt="Shop-Cart-button" />
          </button>
        </div>
      </div>

      <div className={style.productsButtons}>
        <button className={style.productsButtonsPrev}>
          <img src="./images/prev-button.png" alt="Previous-button" />
        </button>
        <button className={style.productsButtonsCreate}>
          <img src="./images/create-button.png" alt="Create-button" />
        </button>
        <button className={style.productsButtonsNext}>
          <img src="./images/next-button.png" alt="Next-button" />
        </button>
      </div>
    </section>
  );
}
