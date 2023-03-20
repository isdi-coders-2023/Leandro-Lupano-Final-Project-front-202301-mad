import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGuitars } from '../../hooks/use.guitars';
import { GuitarStructure } from '../../models/guitar';
import { GuitarsApiRepo } from '../../services/repositories/guitars.api.repo';

import style from './guitar.details.style.module.scss';

// type GuitarDetailsProps = {
//   guitar: GuitarStructure;
// };

export default function GuitarDetails() {
  const location = useLocation();
  const { guitarProps } = location.state;
  const guitar = guitarProps as GuitarStructure;

  const guitarRepo = useMemo(() => new GuitarsApiRepo(), []);
  const { deleteOneGuitar } = useGuitars(guitarRepo);

  const handlerDeleteGuitar = (idGuitar: GuitarStructure['id']) => {
    deleteOneGuitar(idGuitar);
  };

  const navigate = useNavigate();

  const handlerNavigateBack = () => {
    navigate(-1);
  };

  return (
    <section className={style.guitarDetails}>
      <div className={style.guitarDetailsHeader}>
        <h2 className={style.guitarDetailsHeaderTitle}>Details</h2>

        <button
          className={style.guitarDetailsHeaderBackButton}
          onClick={handlerNavigateBack}
        >
          Back
        </button>
      </div>

      <div className={style.guitarDetailsBody}>
        <div className={style.guitarDetailsBodyPicture}>
          <img src={guitar.picture} alt={guitar.modelGuitar} />
        </div>

        <div className={style.guitarDetailsBodyInfo}>
          <div className={style.guitarDetailsBodyInfoButtons}>
            <button className={style.guitarDetailsBodyInfoButtonsEdit}>
              Edit
            </button>
            <button
              className={style.guitarDetailsBodyInfoButtonsDelete}
              onClick={() => {
                handlerDeleteGuitar(guitar.id);
              }}
            >
              <img src="./images/delete-button.png" alt="Delete-button" />
            </button>
          </div>
          <p className={style.guitarDetailsBodyInfoBrand}>
            Brand: {guitar.brand}
          </p>
          <p className={style.guitarDetailsBodyInfoModel}>
            Model: {guitar.modelGuitar}
          </p>
          <p className={style.guitarDetailsBodyInfoStyle}>
            Style: {guitar.style}
          </p>
          <p className={style.guitarDetailsBodyInfoBody}>
            Material: {guitar.material}
          </p>
          <p className={style.guitarDetailsBodyInfoPrice}>
            Price: {guitar.price} €
          </p>
        </div>

        <div className={style.guitarDetailsBodyDescription}>
          <p className={style.guitarDetailsBodyDescriptionText}>
            Description: {guitar.description}
          </p>
        </div>
      </div>
    </section>
  );
}
