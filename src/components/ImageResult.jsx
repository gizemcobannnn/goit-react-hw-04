import Styles from './ImageResult.module.css';
import ImagePart from './ImagePart.jsx';
import PropTypes from 'prop-types';


const ImageResult = ({images, onImageClick}) => {
  return (
    <div className={Styles.imageResult}>
        {images.length>0 ? (
            <ul className={Styles.imagesList}>
                {images.map((image)=>(
                    <li className={Styles.listImage} key={image.id}  onClick={() => onImageClick(image)}>
                    <ImagePart image={image}/>
                    </li>
                ))}
            </ul>
        ) : 
        (
        <div className={Styles.noResult}>No results found</div> // Daha anlamlı bir çıktı.
        )
        }
    </div>
  )
}

ImageResult.propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        objectID: PropTypes.string.isRequired, // objectID'nin string olduğunu varsaydım.
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
    onImageClick: PropTypes.func.isRequired,
  };
export default ImageResult