import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGuitars } from '../../hooks/use.guitars';
import { GuitarStructure } from '../../models/guitar';
import { GuitarsApiRepo } from '../../services/repositories/guitars.api.repo';

import style from './delete.guitar.style.module.scss';

export default function DeleteGuitar() {
  const location = useLocation();
  const { guitarIdProps } = location.state;
  const guitarId: GuitarStructure['id'] = guitarIdProps;

  const guitarRepo = useMemo(() => new GuitarsApiRepo(), []);
  const { deleteOneGuitar } = useGuitars(guitarRepo);

  const handlerDeleteGuitar = () => {
    deleteOneGuitar(guitarId);
    navigate('/products');
  };

  const navigate = useNavigate();

  const handlerNavigateBack = () => {
    navigate(-1);
  };

  return (
    <section className={style.deleteGuitar}>
      <h2 className={style.deleteGuitarTitle}>Delete guitar</h2>

      <div className={style.deleteGuitarBody}>
        <img src="../images/forbidden-guitar.png" alt="Forbidden-guitar" />
        <p>Are you sure to delete the guitar?</p>
        <div className={style.deleteGuitarBodyButtons}>
          <button
            className={style.deleteGuitarBodyButtonsYes}
            onClick={handlerDeleteGuitar}
          >
            YES
          </button>

          <button
            className={style.deleteGuitarBodyButtonsCancel}
            onClick={handlerNavigateBack}
          >
            CANCEL
          </button>
        </div>
      </div>
    </section>
  );
}
