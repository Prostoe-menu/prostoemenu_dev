/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useRef, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { useDropzone } from 'react-dropzone';
import { Cropper } from 'react-cropper';
import Modal from '../../Modal/Modal';
import Button from '../Button/Button';
import 'cropperjs/dist/cropper.css';
import styles from './PhotoButton.module.scss';
import {
  loadPhoto,
  resetCroppedPhoto,
  resetLoadPhoto,
  saveCroppedPhoto,
} from '../../../store/slices/form/formSlice';

const PhotoButton = (error) => {
  const dropZone = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  // const [cropVis, setCropVis] = useState(false);
  const sourcePhoto = useSelector((store) => store.form.sourcePhoto);
  const dispatch = useDispatch();
  const croppedPhoto = useSelector((store) => store.form.finishedPhoto);
  const cropperRef = createRef();
  // const onChange = (e) => {
  //   e.preventDefault();
  //   let filess;
  //   if (e.dataTransfer) {
  //     filess = e.dataTransfer.filess;
  //   } else if (e.target) {
  //     filess = e.target.filess;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImage(reader.result);
  //   };
  //   reader.readAsDataURL(filess[0]);
  // };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      dispatch(
        saveCroppedPhoto(
          cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
        )
      );
      setIsModalOpen(false);
    }
  };

  // DROPZONE

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
      setIsModalOpen(true);
      dispatch(
        loadPhoto(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
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
    setIsModalOpen(false); // убираем Cropper
    dispatch(resetLoadPhoto());
    dispatch(resetCroppedPhoto());
    dropZone.current.classList.remove(styles.photo__input_hidden);
  };

  // Превьюшка
  const thumbs = sourcePhoto?.map((file) => (
    <div className={styles.preview__container} key={file.name}>
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
    []
  );

  return (
    <>
      <section
        ref={dropZone}
        className={`${styles.photo} ${
          error ? `${styles.photo__input_error}` : ''
        }`}
      >
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className={styles.photo__input}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.5 30C37.5 31.3807 36.3807 32.5 35 32.5H5C3.61929 32.5 2.5 31.3807 2.5 30V15C2.5 13.6193 3.61929 12.5 5 12.5H7.92893C9.91806 12.5 11.8257 11.7098 13.2322 10.3033L15.3033 8.23223C15.7721 7.76339 16.408 7.5 17.0711 7.5H22.9289C23.592 7.5 24.2279 7.76339 24.6967 8.23223L26.7678 10.3033C28.1743 11.7098 30.0819 12.5 32.0711 12.5H35C36.3807 12.5 37.5 13.6193 37.5 15V30ZM5 10C2.23858 10 0 12.2386 0 15V30C0 32.7614 2.23858 35 5 35H35C37.7614 35 40 32.7614 40 30V15C40 12.2386 37.7614 10 35 10H32.0711C30.745 10 29.4732 9.47322 28.5355 8.53554L26.4645 6.46447C25.5268 5.52678 24.255 5 22.9289 5H17.0711C15.745 5 14.4732 5.52678 13.5355 6.46446L11.4645 8.53553C10.5268 9.47322 9.25501 10 7.92893 10H5Z"
                fill="#818181"
              />
              <path
                d="M20 27.5C16.5482 27.5 13.75 24.7018 13.75 21.25C13.75 17.7982 16.5482 15 20 15C23.4518 15 26.25 17.7982 26.25 21.25C26.25 24.7018 23.4518 27.5 20 27.5ZM20 30C24.8325 30 28.75 26.0825 28.75 21.25C28.75 16.4175 24.8325 12.5 20 12.5C15.1675 12.5 11.25 16.4175 11.25 21.25C11.25 26.0825 15.1675 30 20 30Z"
                fill="#818181"
              />
              <path
                d="M7.5 16.25C7.5 16.9404 6.94036 17.5 6.25 17.5C5.55964 17.5 5 16.9404 5 16.25C5 15.5596 5.55964 15 6.25 15C6.94036 15 7.5 15.5596 7.5 16.25Z"
                fill="#818181"
              />
            </svg>
            Загрузить фото
          </div>
        </div>
      </section>
      <div className={styles.preview}>{thumbs}</div>
      {isModalOpen && (
        <Modal closeModal={closeModal} isModalOpen={setIsModalOpen}>
          <Cropper
            ref={cropperRef}
            style={{ height: 400, width: 400 }}
            zoomTo={0.5}
            initialAspectRatio={4 / 3}
            // preview=".img-preview"
            src={sourcePhoto[0].preview}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            guides
          />
          <Button
            btnClassName="button_bg_yellow"
            isSubmit={false}
            isDisabled={false}
            ariaLabelText="Обрезать фото"
            onClickBtn={getCropData}
          >
            Обрезать фото
          </Button>
        </Modal>
      )}
    </>
  );
};

export default PhotoButton;
