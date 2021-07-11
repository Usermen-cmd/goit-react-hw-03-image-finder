import { MdClose } from 'react-icons/md';
import { createPortal } from 'react-dom';

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

export default Modal;
