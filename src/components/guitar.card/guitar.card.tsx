import { GuitarStructure } from '../../models/guitar';
import style from './guitar.card.style.module.scss';

type GuitarCardProps = {
  guitar: GuitarStructure;
  action: string;
};

export default function GuitarCard({ guitar, action }: GuitarCardProps) {
  let addGuitar: boolean;

  addGuitar = action === 'products' ? true : false;

  return (
    <li className={style.guitarCard}>
      <div className={style.guitarCardInfo}>
        <p className={style.guitarCardInfoBrand}>{guitar.brand}</p>
        <p className={style.guitarCardInfoModel}>{guitar.modelGuitar}</p>
        <img src={guitar.picture} alt={guitar.modelGuitar} />
        <p className={style.guitarCardInfoStyle}>{guitar.style}</p>
        <p className={style.guitarCardInfoPrice}>{guitar.price}</p>
      </div>

      <button className={style.guitarCardMoreDetails}>More details</button>

      {addGuitar ? (
        <button className={style.guitarCardButtonsAdd}>
          <img src="./images/shop-cart.png" alt="Shop-Cart-button" />
        </button>
      ) : (
        <button className={style.guitarCardButtonsRemove}>
          <img src="./images/remove-button.png" alt="Remove-button" />
        </button>
      )}
    </li>
  );
}
