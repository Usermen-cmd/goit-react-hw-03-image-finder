import { MdClose } from 'react-icons/md';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import defaultImage from 'defaultImages/default.jpg';

const modalRootRef = document.getElementById('modal-root');

const Modal = ({ imageData, onClick }) => {
  return createPortal(
    <div className="Overlay" onClick={onClick}>
      <div className="Modal">
        <img src={imageData.largeImageURL} alt={imageData.tags} />

        <button className="Modal-btn" type="button">
          <MdClose size="40px" fill={'currentColor'} />
        </button>
      </div>
    </div>,
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
