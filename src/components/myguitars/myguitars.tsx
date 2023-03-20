import { useMemo } from 'react';
import { GuitarStructure } from '../../models/guitar';
import GuitarCard from '../guitar.card/guitar.card';
import style from './myguitars.style.module.scss';
import { UsersApiRepo } from '../../services/repositories/users.api.repo';
import { useUsers } from '../../hooks/use.users';

export default function MyGuitars() {
  const userRepo = useMemo(() => new UsersApiRepo(), []);

  const { usersState } = useUsers(userRepo);

  const userGuitarsArray = usersState.userLogged.myGuitars;

  return (
    <section className={style.myguitars}>
      <div className={style.myguitarsHeader}>
        <h2 className={style.myguitarsHeaderTitle}>MyGuitars</h2>
      </div>

      <div className={style.myguitarsCardList}>
        <ul className={style.myguitarsCard}>
          {userGuitarsArray.map((item: GuitarStructure) => (
            <>
              <GuitarCard
                key={item.id}
                guitar={item}
                action="myguitars"
              ></GuitarCard>
              {/*
          <button className={style.myguitarsCardButtonsRemove}>
            <img src="./images/remove-button.png" alt="Remove-button" />
          </button> */}
            </>
          ))}
        </ul>
      </div>
    </section>
  );
}
