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
      id: PropTypes.string.isRequired, // Eğer API'den `id` geliyor.
      urls: PropTypes.string.isRequired,
      title: PropTypes.string, // `title` opsiyonel olabilir.
    }).isRequired,
  };

export default ImagePart