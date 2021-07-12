import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
//Components
import defaultImage from 'defaultImages/default.jpg';
import { MdClose } from 'react-icons/md';
//Styles
import { Overlay, OverlayModal, ModalButton } from './Modal.styles';

const modalRootRef = document.getElementById('modal-root');

const Modal = ({ imageData, onClick }) => {
  return createPortal(
    <Overlay className="Overlay" onClick={onClick}>
      <OverlayModal className="Modal">
        <img src={imageData.largeImageURL} alt={imageData.tags} />
        <ModalButton className="Modal-btn" type="button">
          <MdClose size="40px" fill={'currentColor'} />
        </ModalButton>
      </OverlayModal>
    </Overlay>,
    modalRootRef,
  );
};

Modal.defaultProps = {
  imageData: {
    largeImageURL: defaultImage,
  },
};

Modal.propTypes = {
  imageData: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default Modal;
