/* eslint-disable react/prop-types */
import Styles from './ImagePart.module.css'
import PropTypes from 'prop-types';

const ImagePart = ({image}) => {
  return (
    <div className={Styles.imagePart}>
        <img src={image.urls.small} alt={image.alt_description || "unsplash image"}></img>
    </div>
  )
}

ImagePart.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired, // Use the specific URL property you need
    }).isRequired,
  }).isRequired,
  };

export default ImagePart