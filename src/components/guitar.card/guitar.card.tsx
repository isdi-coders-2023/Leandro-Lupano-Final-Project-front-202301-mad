import { GuitarStructure } from '../../models/guitar';
import style from './guitar.card.style.module.scss';
import { useMemo } from 'react';
import { UsersApiRepo } from '../../services/repositories/users.api.repo';
import { useUsers } from '../../hooks/use.users';
import { Link } from 'react-router-dom';

type GuitarCardProps = {
  guitar: GuitarStructure;
  action: string;
};

export default function GuitarCard({ guitar, action }: GuitarCardProps) {
  const userRepo = useMemo(() => new UsersApiRepo(), []);

  const { userCart } = useUsers(userRepo);

  let addGuitar: boolean;

  addGuitar = action === 'products' ? true : false;

  const handlerAddGuitar = (idGuitar: GuitarStructure['id']) => {
    userCart(idGuitar, 'add');
  };

  const handlerRemoveGuitar = (idGuitar: GuitarStructure['id']) => {
    userCart(idGuitar, 'remove');
  };

  return (
    <li className={style.guitarCard}>
      <div className={style.guitarCardInfo}>
        <p className={style.guitarCardInfoBrand}>{guitar.brand}</p>
        <p className={style.guitarCardInfoModel}>{guitar.modelGuitar}</p>
        <img src={guitar.picture} alt={guitar.modelGuitar} />
        <p className={style.guitarCardInfoStyle}>{guitar.style}</p>
        <p className={style.guitarCardInfoPrice}>{guitar.price} €</p>
      </div>
      <Link to="/details" state={{ guitarProps: guitar }}>
        <button className={style.guitarCardMoreDetails}>More details</button>
      </Link>

      {addGuitar ? (
        <button
          className={style.guitarCardButtonsAdd}
          onClick={() => {
            handlerAddGuitar(guitar.id);
          }}
        >
          <img src="./images/shop-cart.png" alt="Shop-Cart-button" />
        </button>
      ) : (
        <button
          className={style.guitarCardButtonsRemove}
          onClick={() => {
            handlerRemoveGuitar(guitar.id);
          }}
        >
          <img src="./images/remove-button.png" alt="Remove-button" />
        </button>
      )}
    </li>
  );
}
