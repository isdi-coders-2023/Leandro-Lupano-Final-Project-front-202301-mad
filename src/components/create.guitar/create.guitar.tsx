import style from './create.guitar.style.module.scss';

export default function CreateGuitar() {
  return (
    <section className={style.createGuitar}>
      <div className={style.createGuitarHeader}>
        <h2>Edit guitar</h2>
      </div>

      <div className={style.createGuitarBody}>GUITAR FORM COMPONENT</div>
    </section>
  );
}
