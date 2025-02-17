import { createRef, useEffect, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import Modal from 'components/Modal';
import Button from 'ui/Button';
import Loader from 'shared/ui/Loader/Loader';
import styles from './PhotoCropper.module.scss';

type TPhotoCropperProps = {
  photo: File;
  closeHandler: () => void;
  cropHandler: (blob: Blob | null, impPath: string) => void;
};

const PhotoCropper = ({
  photo,
  closeHandler,
  cropHandler,
}: TPhotoCropperProps) => {
  const cropperRef = createRef<ReactCropperElement>();
  const [src, setSrc] = useState<string | null>(null);

  const getCropData = async () => {
    if (cropperRef.current?.cropper) {
      const imgCanvas = cropperRef.current?.cropper.getCroppedCanvas();

      /*
       так можно узнать параметры кропнутого фото
      console.log('imgCanvas: ', imgCanvas?.width, imgCanvas?.height);
      */

      const croppedImg = imgCanvas.toDataURL();

      imgCanvas.toBlob((blob) => {
        cropHandler(blob, croppedImg);
      });
    }
  };

  useEffect(() => {
    const photoURL = URL.createObjectURL(photo);

    setSrc(photoURL);

    return () => {
      URL.revokeObjectURL(photoURL);
    };
  }, [photo]);

  return (
    <>
      <Modal closeModal={closeHandler}>
        {!src && <Loader />}

        {src && (
          <>
            <Cropper
              ref={cropperRef}
              style={{ width: '100%' }}
              dragMode="move"
              aspectRatio={4 / 3}
              src={src}
              movable={false}
              zoomable={false}
              viewMode={1}
              minCropBoxHeight={600}
              minCropBoxWidth={600}
              background={false}
              autoCropArea={1}
              checkOrientation={false}
            />
            <Button onClick={getCropData} className={styles.btn}>
              Обрезать фото
            </Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default PhotoCropper;
