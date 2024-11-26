import Styles from './ImageGallery.module.css';
import ImagePart from './ImagePart.jsx';
import PropTypes from 'prop-types';


const ImageGallery = ({images=[], onImageClick=()=>{}}) => {
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
        <div className={Styles.noResult}>No images found for your search.</div> 
        )
        }
    </div>
  )
}



ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
    onImageClick: PropTypes.func.isRequired,
  };
export default ImageGallery