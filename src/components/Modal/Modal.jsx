import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    overflow: 'auto',
    zIndex: '100',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'block',
    padding: '0px',
    background: 'rgba(0, 0, 0, 0.8)',
    border: 'none',
    zIndex: '500',
  },
};

export const Modal = ({ modalUrl, name, isOpenModal, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpenModal}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={true}
      style={customStyles}
      ariaHideApp={false}
      htmlOpenClassName={'ReactModal__Html--open'}
    >
      <img src={modalUrl} alt={name} />
    </ReactModal>
  );
};

Modal.propTypes = {
  modalUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
