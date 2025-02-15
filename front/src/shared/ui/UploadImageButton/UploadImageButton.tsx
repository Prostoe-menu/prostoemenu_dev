import { ChangeEvent, useState } from 'react';
import cn from 'classnames';
import getImageDimension from 'helpers/getImageDimension';
import { MIN_IMAGE_HEIGHT, MIN_IMAGE_WIDTH } from 'utils/constants';
import { MAX_IMAGE_SIZE, MAX_IMAGE_SIZE_IN_BYTES } from 'utils/constants';
import SVGIconCamera from 'assets/images/icon-camera.svg?react';
import styles from './UploadImageButton.module.scss';

type TUploadImageButtonProps = {
  loadHandler: (file: File) => void;
};

const UploadImageButton = ({ loadHandler }: TUploadImageButtonProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const checkFile = async (img: string) => {
    const dimentions = await getImageDimension(img);

    if (!dimentions) {
      setErrorMessage(`Проверьте размер фотографии`);
      return false;
    }

    if (dimentions.width < MIN_IMAGE_WIDTH) {
      setErrorMessage(
        `Ширина фотографии должна быть не меньше ${MIN_IMAGE_WIDTH}px`
      );
      return false;
    }

    if (dimentions.height < MIN_IMAGE_HEIGHT) {
      setErrorMessage(
        `Высота фотографии должна быть не меньше ${MIN_IMAGE_HEIGHT}px.`
      );
      return false;
    }
    return true;
  };

  const changeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setErrorMessage(null);

    const imgFile = event.target.files ? event.target.files[0] : null;

    if (!imgFile) return;

    if (imgFile.size > MAX_IMAGE_SIZE_IN_BYTES) {
      setErrorMessage(`Размер фотографии больше ${MAX_IMAGE_SIZE}mb`);
      return false;
    }

    const imgURL = URL.createObjectURL(imgFile);

    const res = await checkFile(imgURL);

    if (res) {
      URL.revokeObjectURL(imgURL);
      loadHandler(imgFile);
      event.target.value = '';
    }
  };

  return (
    <>
      <div className={styles.photoWrap}>
        <label
          htmlFor="fileUpload"
          className={cn(styles.addPhotoItem, {
            [styles.addPhotoError]: !!errorMessage,
          })}
        >
          <input
            id="fileUpload"
            type="file"
            onChange={changeHandler}
            className={styles.hidden}
          />
          <SVGIconCamera />
          Загрузить фото
        </label>
      </div>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </>
  );
};

export default UploadImageButton;
