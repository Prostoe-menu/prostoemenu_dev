import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from 'components/AddRecipeForm/MainInfo/elements';
import {
  loadPhoto,
  resetCroppedPhoto,
  resetLoadPhoto,
} from 'store/slices/form/formSlice';
import { PhotoButton } from 'ui';
import { MAX_IMAGE_SIZE } from 'utils/constants';
import { PhotoCropper } from './elements';
import styles from './RecipePhoto.module.scss';

export const RecipePhoto = () => {
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const closeHandler = () => setIsCropperOpen(false);

  const dispatch = useDispatch();
  const sourcePhoto = useSelector((store) => store.form.sourcePhoto);
  const croppedPhoto = useSelector((store) => store.form.finishedPhoto);

  // Удаляем файлы по клику на кнопку на превью
  const handleClickRemovePhoto = () => {
    setIsCropperOpen(false); // убираем Cropper
    dispatch(resetLoadPhoto());
    dispatch(resetCroppedPhoto());
    //dropZone.current.classList.remove(styles.photo__input_hidden);
  };

  const loadHandler = (imageFiles) => {
    setIsCropperOpen(true);
    dispatch(
      loadPhoto(
        imageFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    );
  };

  console.log('sourcePhoto: ', sourcePhoto);

  // Превьюшка
  const thumbs = sourcePhoto?.map((file, idx) => (
    <div className={styles.preview__container} key={file.name + '_' + idx}>
      {croppedPhoto && (
        <img
          className={styles.preview__img}
          src={croppedPhoto}
          alt="preview"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      )}
      {croppedPhoto && (
        <button
          type="button"
          className={styles.preview__remove}
          aria-label="Remove image"
          onClick={handleClickRemovePhoto}
        />
      )}
    </div>
  ));

  useEffect(
    () =>
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      () =>
        sourcePhoto?.forEach((file) => URL.revokeObjectURL(file.preview)),
    [sourcePhoto]
  );

  console.log('sourcePhoto: ', sourcePhoto);

  return (
    <section>
      <Title>Фото готового блюда</Title>

      <PhotoButton loadHandler={loadHandler} />

      <div className={styles.preview}>{thumbs}</div>

      {sourcePhoto && (
        <PhotoCropper
          photo={sourcePhoto[0]?.preview}
          isOpen={isCropperOpen}
          closeHandler={closeHandler}
        />
      )}

      <p className={styles.fotoReqs}>Требования к фото:</p>
      <ul className={styles.reqlist}>
        <li className={styles.reqlist_item}>Форматы JPEG, JPG, PNG или WEBP</li>
        <li className={styles.reqlist_item}>
          Размер файла не больше&nbsp;
          <span className={styles.reqlist_accent}>{MAX_IMAGE_SIZE} мб</span>
        </li>
      </ul>
    </section>
  );
};
