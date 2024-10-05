import { createRef, useEffect } from 'react';
import { Cropper } from 'react-cropper';
import Modal from 'components/Modal';
import Button from 'ui/Button';
import styles from './PhotoCropper.module.scss';

const PhotoCropper = ({ photo, isOpen, cropHandler }) => {
  const cropperRef = createRef();

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
    return () => {
      URL.revokeObjectURL(photo);
    };
  }, [photo]);

  return (
    <>
      <Modal isModalOpen={isOpen}>
        <Cropper
          ref={cropperRef}
          style={{ width: '100%' }}
          dragMode="move"
          aspectRatio={4 / 3}
          src={URL.createObjectURL(photo)}
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
      </Modal>
    </>
  );
};

export default PhotoCropper;
