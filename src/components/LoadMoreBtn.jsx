import Styles from './LoadMoreBtn.module.css';
import PropTypes from 'prop-types';

const LoadMoreBtn = ({onLoad}) => {
  return (
    <div>
        <button className={Styles.loadMoreButton} onClick={onLoad}>Load More</button>
    </div>
  )
}

LoadMoreBtn.propTypes={
    onLoad: PropTypes.func.isRequired
}

export default LoadMoreBtn;