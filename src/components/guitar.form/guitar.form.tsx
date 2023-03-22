/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useGuitars } from '../../hooks/use.guitars';
import { GuitarStructure } from '../../models/guitar';
import { GuitarsApiRepo } from '../../services/repositories/guitars.api.repo';
import style from './guitar.form.style.module.scss';

export default function GuitarForm() {
  const location = useLocation();
  const { guitarProps, actionProps } = location.state;
  const guitar: GuitarStructure = guitarProps;
  const action: string = actionProps;

  let formAction: boolean;
  formAction = action === 'edit' ? true : false;

  const guitarRepo = useMemo(() => new GuitarsApiRepo(), []);
  const { updateGuitar, createGuitar } = useGuitars(guitarRepo);

  const handleEditSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formEditGuitar = ev.currentTarget;

    const guitarToEdit: Partial<GuitarStructure> = {
      brand: (formEditGuitar.elements[0] as HTMLFormElement).value,
      modelGuitar: (formEditGuitar.elements[1] as HTMLFormElement).value,
      picture: (formEditGuitar.elements[2] as HTMLFormElement).value,
      style: (formEditGuitar.elements.namedItem('style') as HTMLFormElement)
        .value,
      material: (formEditGuitar.elements[5] as HTMLFormElement).value,
      price: Number((formEditGuitar.elements[6] as HTMLFormElement).value),
      description: (formEditGuitar.elements[7] as HTMLFormElement).value,
    };

    const guitarId = guitar.id;

    updateGuitar(guitarId, guitarToEdit);

    formEditGuitar.reset();
  };

  const handleCreateSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formCreateGuitar = ev.currentTarget;

    const guitarToCreate: Partial<GuitarStructure> = {
      brand: (formCreateGuitar.elements[0] as HTMLFormElement).value,
      modelGuitar: (formCreateGuitar.elements[1] as HTMLFormElement).value,
      picture: (formCreateGuitar.elements[2] as HTMLFormElement).value,
      style: (formCreateGuitar.elements.namedItem('style') as HTMLFormElement)
        .value,
      material: (formCreateGuitar.elements[5] as HTMLFormElement).value,
      price: Number((formCreateGuitar.elements[6] as HTMLFormElement).value),
      description: (formCreateGuitar.elements[7] as HTMLFormElement).value,
    };

    createGuitar(guitarToCreate);

    formCreateGuitar.reset();
  };

  return (
    <>
      {formAction ? (
        <section className={style.guitarForm}>
          <div className={style.guitarFormHeader}>
            <h2>Edit guitar</h2>
          </div>

          <div className={style.guitarFormBody}>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="brand"
                placeholder={guitar.brand}
                required
              />

              <input
                type="text"
                name="modelGuitar"
                placeholder={guitar.modelGuitar}
                required
              />

              <input
                type="file"
                name="picture"
                placeholder={guitar.picture}
                role="textbox"
                required
              />

              <label>
                Electric
                <input
                  type="radio"
                  name="style"
                  value="Electric"
                  defaultChecked
                />
              </label>

              <label>
                Acoustic
                <input type="radio" name="style" value="Acoustic" />
              </label>

              <input
                type="text"
                name="material"
                placeholder={guitar.material}
                required
              />

              <input
                type="number"
                name="price"
                placeholder={guitar.price.toString()}
                required
              />

              <input
                type="text"
                name="description"
                placeholder={guitar.description}
                required
              />

              <button type="submit">OK</button>
            </form>
          </div>
        </section>
      ) : (
        <section className={style.guitarForm}>
          <div className={style.guitarFormHeader}>
            <h2>Create a new guitar</h2>
          </div>

          <div className={style.guitarFormBody}>
            <form onSubmit={handleCreateSubmit}>
              <input type="text" name="brand" placeholder="Brand:" required />

              <input
                type="text"
                name="modelGuitar"
                placeholder="Model:"
                required
              />

              <input
                type="file"
                name="picture"
                placeholder="Upload picture:"
                role="textbox"
                required
              />

              <label>
                Electric
                <input type="radio" name="style" value="Electric" required />
              </label>

              <label>
                Acoustic
                <input type="radio" name="style" value="Acoustic" required />
              </label>

              <input
                type="text"
                name="material"
                placeholder="Material:"
                required
              />

              <input type="number" name="price" placeholder="Price:" required />

              <input
                type="text"
                name="description"
                placeholder="Description:"
                required
              />

              <button type="submit">OK</button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
