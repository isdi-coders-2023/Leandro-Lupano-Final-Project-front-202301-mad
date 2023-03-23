import { GuitarsApiRepo } from '../../services/repositories/guitars.api.repo';
import { useMemo } from 'react';
import { useGuitars } from '../../hooks/use.guitars';

import style from './filter.guitar.style.module.scss';

export function FilterGuitar() {
  const guitarRepo = useMemo(() => new GuitarsApiRepo(), []);

  const { loadGuitars } = useGuitars(guitarRepo);

  let isSelected: boolean = true;

  const handleFilter = (style: string) => {
    loadGuitars(0, style);
  };

  return (
    <nav className={style.filter}>
      <button
        className={isSelected ? style.filterOptionSelected : style.filterOption}
        onClick={() => {
          handleFilter('All');
        }}
      >
        All
      </button>

      <button
        className={isSelected ? style.filterOptionSelected : style.filterOption}
        onClick={() => {
          handleFilter('Electric');
        }}
      >
        Electric
      </button>

      <button
        className={isSelected ? style.filterOptionSelected : style.filterOption}
        onClick={() => {
          handleFilter('Acoustic');
        }}
      >
        Acoustic
      </button>
    </nav>
  );
}
