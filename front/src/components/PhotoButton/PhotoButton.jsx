/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import addPhotoIcon from '../../images/add-photo.svg';
import styles from './PhotoButton.module.scss';

const PhotoButton = () => {
  const dropZone = useRef();
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/webp': ['.webp'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
    maxSize: 5242880,
    multiple: false,
    // File is OK
    onDropAccepted: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      dropZone.current.classList.remove(styles.photo__input_error);
      dropZone.current.classList.add(styles.photo__input_hidden);
    },
    // File is bad
    onDropRejected: (file) => {
      // Вот так можно посмотреть что за ошибка
      // eslint-disable-next-line no-console
      console.log(file[0].errors[0]);
      // Помечаем красным бордером
      dropZone.current.classList.add(styles.photo__input_error);
    },
  });

  // Удаляем файлы по клику на кнопку на превью
  const handleClickRemovePhoto = () => {
    setFiles([]);
    dropZone.current.classList.remove(styles.photo__input_hidden);
  };

  // Превьюшка
  const thumbs = files.map((file) => (
    <div className={styles.preview__container} key={file.name}>
      <img
        className={styles.preview__img}
        src={file.preview}
        alt="Миниатюра-предпросмотр загруженного изображения"
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
      <button
        type="button"
        className={styles.preview__remove}
        aria-label="Удалить загруженное изображение"
        onClick={handleClickRemovePhoto}
      />
    </div>
  ));

  useEffect(
    () =>
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      () =>
        files.forEach((file) => URL.revokeObjectURL(file.preview)),
    []
  );

  return (
    <>
      <div ref={dropZone} className={styles.photo}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className={styles.photo__input}>
            <img src={addPhotoIcon} alt="Загрузить изображение" />
            Загрузить фото
          </div>
        </div>
      </div>
      <div className={styles.preview}>{thumbs}</div>
    </>
  );
};

export default PhotoButton;
