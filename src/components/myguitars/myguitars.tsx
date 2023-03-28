import { useMemo } from 'react';
import { GuitarStructure } from '../../models/guitar';
import GuitarCard from '../guitar.card/guitar.card';
import style from './myguitars.style.module.scss';
import { UsersApiRepo } from '../../services/repositories/users.api.repo';
import { useUsers } from '../../hooks/use.users';
import { Link } from 'react-router-dom';

export default function MyGuitars() {
  const userRepo = useMemo(() => new UsersApiRepo(), []);

  const { usersState } = useUsers(userRepo);

  const userGuitarsArray = usersState.userLogged.myGuitars;

  const isMyGuitars: boolean = userGuitarsArray.length > 0 ? true : false;

  let totalPrice: number = 0;
  userGuitarsArray.forEach((item) => (totalPrice += item.price));

  return (
    <section className={style.myguitars}>
      {isMyGuitars ? (
        <>
          <div className={style.myguitarsHeader}>
            <h2 className={style.myguitarsHeaderTitle}>MyGuitars</h2>
          </div>
          <div className={style.myguitarsCardList}>
            <ul className={style.myguitarsCard}>
              {userGuitarsArray.map((item: GuitarStructure) => (
                <GuitarCard
                  key={item.id}
                  guitar={item}
                  action="myguitars"
                ></GuitarCard>
              ))}
            </ul>
          </div>
          <div className={style.myguitarsTotalPrice}>
            <p>
              Total price: <span> {totalPrice} €</span>
            </p>
            <Link to="/products">
              <button>Buy now</button>
            </Link>
          </div>
        </>
      ) : (
        <div className={style.myguitarsNoGuitar}>
          <p className={style.myguitarsNoGuitarMessage}>
            There are no guitars in your cart yet
          </p>
          <Link to="/products">
            <button>Go to products</button>
          </Link>
        </div>
      )}
    </section>
  );
}
