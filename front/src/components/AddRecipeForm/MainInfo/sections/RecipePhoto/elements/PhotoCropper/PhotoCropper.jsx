import { createRef } from 'react';
import { Cropper } from 'react-cropper';
import { useDispatch } from 'react-redux';
import Modal from 'components/Modal/Modal';
import { saveCroppedPhoto } from 'store/slices/form/formSlice';
// import { addNotification } from 'store/slices/toast/toastSlice';
// import { ErrorMessage } from 'ui';
import Button from 'ui/Button';

const PhotoCropper = ({ photo, isOpen, closeHandler }) => {
  const cropperRef = createRef();
  const dispatch = useDispatch();

  //const [errorMessage, setErrorMessage] = useState(null);

  console.log('PhotoCropper isOpen: ', isOpen);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      dispatch(
        saveCroppedPhoto(
          cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
        )
      );
      closeHandler();
    }
  };

  const readyHandler = () => {
    console.log('readyHandler');
  };

  return (
    <>
      <Modal closeModal={closeHandler} isModalOpen={isOpen}>
        <Cropper
          ready={readyHandler}
          ref={cropperRef}
          style={{ height: 400, width: '100%' }}
          zoomTo={0.5}
          aspectRatio={4 / 3}
          // preview="#imgPreview"
          src={photo}
          viewMode={1}
          minCropBoxHeight={100}
          minCropBoxWidth={100}
          background={false}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        />

        {/* <ErrorMessage message={errorMessage} /> */}

        {/* <div id="imgPreview" style={{ width: 800, height: 600 }}></div> */}
        <Button onClick={getCropData}>Обрезать фото</Button>
      </Modal>
    </>
  );
};

export default PhotoCropper;
