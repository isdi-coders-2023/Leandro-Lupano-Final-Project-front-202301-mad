import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GuitarStructure } from '../../models/guitar';

import style from './guitar.details.style.module.scss';

export default function GuitarDetails() {
  const location = useLocation();
  const { guitarProps } = location.state;
  const guitar: GuitarStructure = guitarProps;

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
          ◄ Go back
        </button>
      </div>

      <div className={style.guitarDetailsBody}>
        <div className={style.guitarDetailsBodyMain}>
          <div className={style.guitarDetailsBodyPicture}>
            <img src={guitar.picture} alt={guitar.modelGuitar} />
          </div>

          <div className={style.guitarDetailsBodyInfo}>
            <div className={style.guitarDetailsBodyInfoButtons}>
              <Link
                to="/guitar/form"
                state={{ guitarProps: guitar, actionProps: 'edit' }}
              >
                <button className={style.guitarDetailsBodyInfoButtonsEdit}>
                  Edit
                </button>
              </Link>

              <Link to="/delete/guitar" state={{ guitarIdProps: guitar.id }}>
                <button className={style.guitarDetailsBodyInfoButtonsDelete}>
                  <img src="./images/delete-button.png" alt="Delete-button" />
                </button>
              </Link>
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
            <p className={style.guitarDetailsBodyInfoMaterial}>
              Material: {guitar.material}
            </p>
            <p className={style.guitarDetailsBodyInfoPrice}>
              Price: {guitar.price} €
            </p>
          </div>
        </div>

        <div className={style.guitarDetailsBodyDescription}>
          <p className={style.guitarDetailsBodyDescriptionText}>
            Description: {guitar.description} Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Tempore, officiis est magni
            consequatur nisi consectetur quasi nihil magnam, ipsam blanditiis
            possimus sint suscipit animi eligendi architecto error nesciunt
            provident? Facilis?
          </p>
        </div>
      </div>
    </section>
  );
}
