/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useGuitars } from '../../hooks/use.guitars';
import { GuitarStructure } from '../../models/guitar';
import { firebaseUrl } from '../../services/firebase/firebase.config';
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

  const handleEditSubmit = async (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formEditGuitar = ev.currentTarget;

    const fileName = `${
      (formEditGuitar.elements[0] as HTMLFormElement).value
    }-${(formEditGuitar.elements[1] as HTMLFormElement).value}`;
    const filePicture = (
      formEditGuitar.elements[2] as HTMLInputElement
    ).files?.item(0);

    const urlPicture = await firebaseUrl(fileName, filePicture!);

    const guitarToEdit: Partial<GuitarStructure> = {
      brand: (formEditGuitar.elements[0] as HTMLFormElement).value,
      modelGuitar: (formEditGuitar.elements[1] as HTMLFormElement).value,
      picture: urlPicture,
      style: (formEditGuitar.elements.namedItem('style') as HTMLFormElement)
        .value,
      material: (formEditGuitar.elements[5] as HTMLFormElement).value,
      price: Number((formEditGuitar.elements[6] as HTMLFormElement).value),
      description: (formEditGuitar.elements[7] as HTMLFormElement).value,
    };

    const guitarId = guitar.id;

    updateGuitar(guitarId, guitarToEdit);
    console.log({ guitarToEdit });

    formEditGuitar.reset();
  };

  const handleCreateSubmit = async (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formCreateGuitar = ev.currentTarget;

    const fileName = `${
      (formCreateGuitar.elements[0] as HTMLFormElement).value
    }-${(formCreateGuitar.elements[1] as HTMLFormElement).value}`;
    const filePicture = (
      formCreateGuitar.elements[2] as HTMLInputElement
    ).files?.item(0);

    const urlPicture = await firebaseUrl(fileName, filePicture!);

    const guitarToCreate: Partial<GuitarStructure> = {
      brand: (formCreateGuitar.elements[0] as HTMLFormElement).value,
      modelGuitar: (formCreateGuitar.elements[1] as HTMLFormElement).value,
      picture: urlPicture,
      style: (formCreateGuitar.elements.namedItem('style') as HTMLInputElement)
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
              <label>
                Brand:
                <input
                  type="text"
                  name="brand"
                  placeholder={guitar.brand}
                  required
                />
              </label>

              <label>
                Model:
                <input
                  type="text"
                  name="modelGuitar"
                  placeholder={guitar.modelGuitar}
                  required
                />
              </label>

              <label>
                Picture:
                <input
                  type="file"
                  name="picture"
                  placeholder={guitar.picture}
                  role="textbox"
                  required
                />
              </label>

              <label>
                Style:
                <label>
                  Electric
                  <input type="radio" name="style" value="Electric" />
                </label>
                <label>
                  Acoustic
                  <input type="radio" name="style" value="Acoustic" />
                </label>
              </label>

              <label>
                Material:
                <input
                  type="text"
                  name="material"
                  placeholder={guitar.material}
                  required
                />
              </label>

              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  placeholder={guitar.price.toString()}
                  required
                />
              </label>

              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  placeholder={guitar.description}
                  required
                />
              </label>

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
              <label>
                Brand:
                <input type="text" name="brand" placeholder="Brand:" required />
              </label>

              <label>
                Model:
                <input
                  type="text"
                  name="modelGuitar"
                  placeholder="Model:"
                  required
                />
              </label>

              <label>
                Picture:
                <input
                  type="file"
                  name="picture"
                  placeholder="Upload picture:"
                  role="textbox"
                  required
                />
              </label>

              <label>
                Guitar style:
                <label htmlFor="create-electric">Electric</label>
                <input
                  type="radio"
                  name="style"
                  value="Electric"
                  id="create-electric"
                  required
                />
                <label htmlFor="create-acoustic">Acoustic</label>
                <input
                  type="radio"
                  name="style"
                  value="Acoustic"
                  id="create-acoustic"
                />
              </label>

              <label>
                Material:
                <input
                  type="text"
                  name="material"
                  placeholder="Material:"
                  required
                />
              </label>

              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  placeholder="Price:"
                  required
                />
              </label>

              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  placeholder="Description:"
                  required
                />
              </label>

              <button type="submit">OK</button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
