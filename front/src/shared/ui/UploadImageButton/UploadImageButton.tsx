import { useState } from 'react';
import cn from 'classnames';
import getImageDimension from 'helpers/getImageDimension';
import { MIN_IMAGE_HEIGHT, MIN_IMAGE_WIDTH } from 'utils/constants';
import { MAX_IMAGE_SIZE, MAX_IMAGE_SIZE_IN_BYTES } from 'utils/constants';
import SVGIconCamera from 'assets/images/icon-camera.svg?react';
import styles from './UploadImageButton.module.scss';

const UploadImageButton = ({ loadHandler }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const checkFile = async (img) => {
    return await getImageDimension(img)
      .then(({ height, width }) => {
        if (width < MIN_IMAGE_WIDTH) {
          setErrorMessage(
            `Ширина фотографии должна быть не меньше ${MIN_IMAGE_WIDTH}px`
          );
          return false;
        }

        if (height < MIN_IMAGE_HEIGHT) {
          setErrorMessage(
            `Высота фотографии должна быть не меньше ${MIN_IMAGE_HEIGHT}px.`
          );
          return false;
        }
        return true;
      })
      .catch((error) => {
        console.log('getImageDimensions_ERROR: ', error);
        setErrorMessage(`Проверьте размер фотографии`);
        return false;
      });
  };

  const changeHandler = async (event) => {
    event.preventDefault();

    setErrorMessage(null);

    const imgFile = event.target.files[0];

    if (!imgFile) return;

    console.log('image size: ', imgFile.size, 'b');

    if (imgFile.size > MAX_IMAGE_SIZE_IN_BYTES) {
      setErrorMessage(`Размер фотографии больше ${MAX_IMAGE_SIZE}mb`);
      return false;
    }

    const imgURL = URL.createObjectURL(imgFile);

    const res = await checkFile(imgURL);

    if (res) {
      URL.revokeObjectURL(imgURL);
      loadHandler(imgFile);
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
