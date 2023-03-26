/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

  let isEditForm: boolean;
  isEditForm = action === 'edit' ? true : false;

  const guitarRepo = useMemo(() => new GuitarsApiRepo(), []);
  const { updateGuitar, createGuitar } = useGuitars(guitarRepo);

  const navigate = useNavigate();

  const handlerNavigateBack = () => {
    navigate(-1);
  };

  const [isSubmit, setIsSubmit] = useState(false);

  const handleEditSubmit = async (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formEditGuitar = ev.currentTarget;

    const filePicture = (
      formEditGuitar.elements[2] as HTMLInputElement
    ).files?.item(0);

    let urlPicture: string;

    if (filePicture) {
      const fileName = `${
        (formEditGuitar.elements[0] as HTMLFormElement).value
      }-${(formEditGuitar.elements[1] as HTMLFormElement).value}`;

      urlPicture = await firebaseUrl(fileName, filePicture);
    } else {
      urlPicture = guitar.picture;
    }

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

    setIsSubmit(true);

    setTimeout(() => {
      setIsSubmit(false);
      navigate('/products');
    }, 2000);

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
      style: (formCreateGuitar.elements.namedItem('style') as HTMLFormElement)
        .value,
      material: (formCreateGuitar.elements[5] as HTMLFormElement).value,
      price: Number((formCreateGuitar.elements[6] as HTMLFormElement).value),
      description: (formCreateGuitar.elements[7] as HTMLFormElement).value,
    };

    createGuitar(guitarToCreate);

    setIsSubmit(true);

    setTimeout(() => {
      setIsSubmit(false);
      navigate('/products');
    }, 2000);

    formCreateGuitar.reset();
  };

  return (
    <>
      {isEditForm ? (
        <section className={style.guitarForm}>
          <div className={style.guitarFormHeader}>
            <h2>Edit guitar</h2>

            <button
              className={style.guitarFormHeaderBackButton}
              onClick={handlerNavigateBack}
            >
              ◄ Go back
            </button>
          </div>

          <div className={style.guitarFormBody}>
            <form onSubmit={handleEditSubmit}>
              <label>
                Brand:
                <input
                  type="text"
                  name="brand"
                  defaultValue={guitar.brand}
                  required
                />
              </label>

              <label>
                Model:
                <input
                  type="text"
                  name="modelGuitar"
                  defaultValue={guitar.modelGuitar}
                  required
                />
              </label>

              <label
                htmlFor="guitarFormBodyPicture"
                className={style.guitarFormBodyPictureLabel}
              >
                Upload picture
                <input
                  className={style.guitarFormBodyPicture}
                  id="guitarFormBodyPicture"
                  type="file"
                  name="picture"
                  role="textbox"
                />
              </label>

              <div className={style.guitarFormBodyStyle}>
                Style:
                <label className={style.guitarFormBodyStyleOptions}>
                  Electric
                  <input
                    type="radio"
                    name="style"
                    value="Electric"
                    defaultChecked
                  />
                </label>
                <label className={style.guitarFormBodyStyleOptions}>
                  Acoustic
                  <input type="radio" name="style" value="Acoustic" />
                </label>
              </div>

              <label>
                Material:
                <input
                  type="text"
                  name="material"
                  defaultValue={guitar.material}
                  required
                />
              </label>

              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  defaultValue={guitar.price.toString()}
                  required
                />
              </label>

              <label className={style.guitarFormBodyDescription}>
                Description:
                <textarea
                  name="description"
                  defaultValue={guitar.description}
                  required
                />
              </label>

              <button type="submit">Edit</button>
            </form>
          </div>
          <p
            className={
              isSubmit ? style.guitarFormMessage : style.guitarFormMessageHidden
            }
          >
            The guitar was edited successfully ✅
          </p>
        </section>
      ) : (
        <section className={style.guitarForm}>
          <div className={style.guitarFormHeader}>
            <h2>New guitar</h2>

            <button
              className={style.guitarFormHeaderBackButton}
              onClick={handlerNavigateBack}
            >
              ◄ Go back
            </button>
          </div>

          <div className={style.guitarFormBody}>
            <form onSubmit={handleCreateSubmit}>
              <label>
                Brand:
                <input
                  type="text"
                  name="brand"
                  placeholder="Ex.: Gibson"
                  required
                />
              </label>

              <label>
                Model:
                <input
                  type="text"
                  name="modelGuitar"
                  placeholder="Ex.: Les Paul"
                  required
                />
              </label>

              <label
                htmlFor="guitarFormBodyPicture"
                className={style.guitarFormBodyPictureLabel}
              >
                Upload picture
                <input
                  className={style.guitarFormBodyPicture}
                  id="guitarFormBodyPicture"
                  type="file"
                  name="picture"
                  placeholder="File"
                  role="textbox"
                  required
                />
              </label>

              <div className={style.guitarFormBodyStyle}>
                Style:
                <label className={style.guitarFormBodyStyleOptions}>
                  Electric
                  <input
                    type="radio"
                    name="style"
                    value="Electric"
                    defaultChecked
                  />
                </label>
                <label className={style.guitarFormBodyStyleOptions}>
                  Acoustic
                  <input type="radio" name="style" value="Acoustic" />
                </label>
              </div>

              <label>
                Material:
                <input
                  type="text"
                  name="material"
                  placeholder="Ex.: Mahogany"
                  required
                />
              </label>

              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  placeholder="Ex.: 2200"
                  required
                />
              </label>

              <label className={style.guitarFormBodyDescription}>
                Description:
                <textarea
                  name="description"
                  placeholder="Ex.: This guitar is one of the..."
                  required
                />
              </label>

              <button type="submit">Create</button>
            </form>
          </div>
          <p
            className={
              isSubmit ? style.guitarFormMessage : style.guitarFormMessageHidden
            }
          >
            The guitar was created successfully ✅
          </p>
        </section>
      )}
    </>
  );
}
