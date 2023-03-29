import { GuitarsApiRepo } from '../../services/repositories/guitars.api.repo';
import GuitarCard from '../guitar.card/guitar.card';
import { useEffect, useMemo } from 'react';
import { useGuitars } from '../../hooks/use.guitars';
import { GuitarStructure } from '../../models/guitar';
import { Link } from 'react-router-dom';
import { FilterGuitar } from '../filter.guitar/filter.guitar';
import style from './products.style.module.scss';
import { useUsers } from '../../hooks/use.users';
import { UsersApiRepo } from '../../services/repositories/users.api.repo';

export default function Products() {
  const userRepo = useMemo(() => new UsersApiRepo(), []);

  const { usersState } = useUsers(userRepo);

  const isAdmin: boolean =
    usersState.userLogged.role === 'Admin' ? true : false;

  const guitarRepo = useMemo(() => new GuitarsApiRepo(), []);

  const { guitarsState, loadGuitars, changePage } = useGuitars(guitarRepo);

  const isLessPage: boolean = guitarsState.actualPage === 1 ? true : false;
  const isMorePage: boolean = guitarsState.actualPage > 6 ? true : false;

  useEffect(() => {
    loadGuitars(guitarsState.actualPage, guitarsState.actualStyle);
  }, [loadGuitars, guitarsState.actualPage, guitarsState.actualStyle]);

  const allGuitarsArray = guitarsState.allGuitars;

  const handlePage = (pageChange: number) => {
    changePage(pageChange);
  };

  return (
    <section className={style.products}>
      <div className={style.productsHeader}>
        <h2 className={style.productsHeaderTitle}>Products</h2>
        <div className={style.productsHeaderFilter}>
          <FilterGuitar></FilterGuitar>
        </div>
      </div>

      <div className={style.productsCardList}>
        <ul className={style.productsCard}>
          {allGuitarsArray.map((item: GuitarStructure) => (
            <GuitarCard
              key={item.id}
              guitar={item}
              action="products"
            ></GuitarCard>
          ))}
        </ul>
      </div>

      <div className={style.productsButtons}>
        {isLessPage ? (
          <div></div>
        ) : (
          <button
            className={style.productsButtonsPrev}
            onClick={() => {
              handlePage(-1);
            }}
          >
            <img src="./images/prev-button.png" alt="Previous-button" />
          </button>
        )}

        {isAdmin ? (
          <Link
            to="/guitar/form"
            state={{ guitarProps: {}, actionProps: 'create' }}
          >
            <button className={style.productsButtonsCreate}>
              <img src="./images/create-button.png" alt="Create-button" />
            </button>
          </Link>
        ) : (
          <div></div>
        )}

        {isMorePage ? (
          <div></div>
        ) : (
          <button
            className={style.productsButtonsNext}
            onClick={() => {
              handlePage(+1);
            }}
          >
            <img src="./images/next-button.png" alt="Next-button" />
          </button>
        )}
      </div>
    </section>
  );
}
