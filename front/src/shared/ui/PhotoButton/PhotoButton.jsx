import { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { addNotification } from 'store/slices/toast/toastSlice';
import { ErrorMessage } from 'ui';
import getImageDimension from 'helpers/getImageDimension';
import {
  MAX_IMAGE_SIZE,
  MAX_IMAGE_SIZE_IN_BYTES,
  MIN_IMAGE_WIDTH,
} from 'utils/constants';
import SVGIconCamera from 'assets/images/icon-camera.svg?react';
import 'cropperjs/dist/cropper.css';
import styles from './PhotoButton.module.scss';

const PhotoButton = ({ loadHandler }) => {
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();
  const dropZone = useRef();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/webp': ['.webp'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
    maxSize: MAX_IMAGE_SIZE_IN_BYTES,
    multiple: false,
    onDropAccepted: async (acceptedFiles) => {
      console.log('onDropAccepted', acceptedFiles);

      acceptedFiles.map(async (imgFile) => {
        const imgURL = URL.createObjectURL(imgFile);

        await getImageDimension(imgURL)
          .then(({ height, width }) => {
            console.log('getImageDimensions: ', height, width);

            if (width < MIN_IMAGE_WIDTH) {
              dispatch(
                addNotification(
                  `Ширина и высота фотографии должны быть больше ${MIN_IMAGE_WIDTH}px`
                )
              );

              setErrorMessage(
                `Ширина и высота фотографии должны быть больше ${MIN_IMAGE_WIDTH}px`
              );

              dropZone.current.classList.add(styles.dropzoneError);

              URL.revokeObjectURL(imgURL);

              return;
            }
          })
          .catch((error) => console.log('getImageDimensions_ERROR: ', error));
      });

      loadHandler(acceptedFiles);

      dropZone.current.classList.remove(styles.dropzoneError);
      //dropZone.current.classList.add(styles.photo__input_hidden);
    },
    onDropRejected: (files) => {
      console.log('onDropRejected: ', files[0].errors);

      setErrorMessage(files[0].errors[0].message);

      dispatch(
        addNotification(
          `Размер фотографии не должен превышать ${MAX_IMAGE_SIZE} МБ`
        )
      );

      dropZone.current.classList.add(styles.dropzoneError);
    },
  });

  return (
    <>
      <section ref={dropZone} className={styles.dropzoneContainer}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className={styles.dropzoneIcon}>
            <SVGIconCamera />
            Загрузить фото
          </div>
        </div>
      </section>

      <ErrorMessage message={errorMessage} />
    </>
  );
};

export default PhotoButton;
