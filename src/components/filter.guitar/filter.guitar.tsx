import { GuitarsApiRepo } from '../../services/repositories/guitars.api.repo';
import { useMemo, useState } from 'react';
import { useGuitars } from '../../hooks/use.guitars';

import style from './filter.guitar.style.module.scss';

export function FilterGuitar() {
  const guitarRepo = useMemo(() => new GuitarsApiRepo(), []);

  const { changeStyle } = useGuitars(guitarRepo);

  const [isSelectedAll, setIsSelectedAll] = useState(true);
  const [isSelectedElectric, setIsSelectedElectric] = useState(false);
  const [isSelectedAcoustic, setIsSelectedAcoustic] = useState(false);

  const handleFilter = (style: string) => {
    changeStyle(style);

    switch (style) {
      case 'Electric':
        setIsSelectedAll(false);
        setIsSelectedElectric(true);
        setIsSelectedAcoustic(false);
        break;

      case 'Acoustic':
        setIsSelectedAll(false);
        setIsSelectedElectric(false);
        setIsSelectedAcoustic(true);
        break;

      default:
        setIsSelectedAll(true);
        setIsSelectedElectric(false);
        setIsSelectedAcoustic(false);
        break;
    }
  };

  return (
    <nav className={style.filter}>
      <button
        className={
          isSelectedAll ? style.filterOptionSelected : style.filterOption
        }
        onClick={() => {
          handleFilter('All');
        }}
      >
        All
      </button>

      <button
        className={
          isSelectedElectric ? style.filterOptionSelected : style.filterOption
        }
        onClick={() => {
          handleFilter('Electric');
        }}
      >
        Electric
      </button>

      <button
        className={
          isSelectedAcoustic ? style.filterOptionSelected : style.filterOption
        }
        onClick={() => {
          handleFilter('Acoustic');
        }}
      >
        Acoustic
      </button>
    </nav>
  );
}
