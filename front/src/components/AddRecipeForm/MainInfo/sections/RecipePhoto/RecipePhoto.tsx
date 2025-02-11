import { MouseEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Title } from 'components/AddRecipeForm/MainInfo/elements';
import { resetCoverPhoto } from 'store/slices/form/formSlice';
import Button from 'ui/Button';
import UploadImageButton from 'ui/UploadImageButton';
import { MAX_IMAGE_SIZE } from 'utils/constants';
import { ErrorMessage } from '../../elements';
import { PhotoCropper } from './elements';
import SVGDelete from 'assets/images/icon_cross.svg?react';
import styles from './RecipePhoto.module.scss';

const inputName = 'cover_path';

export const RecipePhoto = () => {
  const { register, formState, setValue } = useFormContext();

  const inputError = formState.errors[inputName];

  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    (formState.defaultValues && formState.defaultValues[inputName]?.photoUrl) ||
      null
  );

  const cropHandler = (photoBlob: Blob | null, photoUrl: string) => {
    setIsCropperOpen(false);
    setPreview(photoUrl);

    setValue(
      inputName,
      { photoBlob, photoUrl },
      { shouldValidate: true, shouldDirty: true }
    );
  };

  const dispatch = useDispatch();

  const removePreviewHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(resetCoverPhoto());
    setPreview(null);
    setValue(inputName, null, { shouldValidate: true, shouldDirty: true });
  };

  const loadHandler = (imageFile: File) => {
    setUploadedPhoto(imageFile);
    setIsCropperOpen(true);
  };

  useEffect(() => {
    register(inputName, { required: 'Загрузите фото готового блюда' });
  }, [register]);

  return (
    <section>
      <Title>Фото готового блюда*</Title>

      <div className={styles.photoContainer}>
        {preview && (
          <div className={styles.previewWrap}>
            <img src={preview} className={styles.preview} />
            <Button
              view="icon"
              onClick={removePreviewHandler}
              className={styles.removeBtn}
            >
              <SVGDelete />
            </Button>
          </div>
        )}

        {!preview && <UploadImageButton loadHandler={loadHandler} />}

        {inputError && <ErrorMessage message={inputError.message as string} />}
      </div>

      <div className={styles.photoRequirements}>
        Требования к фото:
        <ul className={styles.list}>
          <li className={styles.item}>Форматы JPEG, JPG, PNG или WEBP</li>
          <li className={styles.item}>
            <span>
              Размер файла не больше&nbsp;
              <span className={styles.reqlist_accent}>{MAX_IMAGE_SIZE} мб</span>
            </span>
          </li>
        </ul>
      </div>

      {isCropperOpen && uploadedPhoto && (
        <PhotoCropper
          photo={uploadedPhoto}
          isOpen={isCropperOpen}
          cropHandler={cropHandler}
        />
      )}
    </section>
  );
};
