import { GuitarsApiRepo } from '../../services/repositories/guitars.api.repo';
import GuitarCard from '../guitar.card/guitar.card';
import { useEffect, useMemo } from 'react';
import style from './products.style.module.scss';
import { useGuitars } from '../../hooks/use.guitars';
import { GuitarStructure } from '../../models/guitar';

export default function Products() {
  const guitarRepo = useMemo(() => new GuitarsApiRepo(), []);

  const { guitarsState, loadGuitars } = useGuitars(guitarRepo);

  useEffect(() => {
    loadGuitars();
  }, [loadGuitars]);

  const allGuitarsArray = guitarsState.allGuitars;

  return (
    <section className={style.products}>
      <div className={style.productsHeader}>
        <h2 className={style.productsHeaderTitle}>Products</h2>
        <div className={style.productsHeaderFilter}>FILTER</div>
      </div>

      <div className={style.productsCardList}>
        <ul className={style.productsCard}>
          {allGuitarsArray.map((item: GuitarStructure) => (
            <GuitarCard
              key={item.modelGuitar}
              guitar={item}
              action="products"
            ></GuitarCard>
          ))}
        </ul>
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
