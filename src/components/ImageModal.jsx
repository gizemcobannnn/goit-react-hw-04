import Styles from './ImageModal.module.css';
import ReactModal from 'react-modal';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const ImageModal = ({isOpen, onClose, imgUrl, altText}) => {

    useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
          }
      
          return () => {
            // Modal kapandığında dinleyiciyi kaldır
            document.removeEventListener('keydown', handleKeyDown);
          };
        }, [isOpen, onClose]);

  return (
    <div className={Styles.imageModalDiv}>
        <ReactModal
        isOpen={isOpen} onRequestClose={onClose} className={Styles.imageModal}
      shouldCloseOnOverlayClick={true} 
        >
               <div className={Styles.modalBody}>
        <button onClick={onClose} className={Styles.closeButton}>
          &times;
        </button>
        <img src={imgUrl || 'https://via.placeholder.com/600'} alt={altText || 'Enlarged view'} className={Styles.modalImage} />
      </div>
        </ReactModal>
    </div>
  )
}

ImageModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    imgUrl: PropTypes.string.isRequired,
    altText: PropTypes.string,
  };
export default ImageModal;