import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { addNotification } from 'store/slices/toast/toastSlice';
import { MAX_IMAGE_SIZE_IN_BYTES } from 'utils/constants';
import SVGIconCamera from 'assets/images/icon-camera.svg?react';
import 'cropperjs/dist/cropper.css';
import styles from './PhotoButton.module.scss';

const PhotoButton = ({ loadHandler }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/webp': ['.webp'],
      'image/png': ['.png'],
    },
    maxFiles: 3,
    maxSize: MAX_IMAGE_SIZE_IN_BYTES,
    multiple: true,
    onDropAccepted: async (acceptedFiles) => {
      loadHandler(acceptedFiles);
    },
    onDropRejected: (files) => {
      const errorObj = files[0].errors[0];

      if (errorObj.code === 'file-invalid-type') {
        setErrorMessage(`Допустимые форматы картинки JPEG, JPG, PNG или WEBP`);
        return;
      }

      setErrorMessage(files[0].errors[0].message);

      dispatch(
        addNotification(
          `${files[0].errors[0].code}: ${files[0].errors[0].message}`
        )
      );
    },
  });

  return (
    <div className={styles.dropzoneContainer}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div
          className={cn(styles.dropzoneIcon, {
            [styles.dropzoneError]: isDragReject || !!errorMessage,
          })}
        >
          <SVGIconCamera />
          Загрузить фото
        </div>
      </div>

      <p className={styles.errorMessage}>{errorMessage}</p>
    </div>
  );
};

export default PhotoButton;
