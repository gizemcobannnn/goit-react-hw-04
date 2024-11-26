import Styles from './Loader.module.css';
import { RotatingLines } from 'react-loader-spinner';
const Loader = () => {
  return (
    <div className={Styles.circleLoad}>
        <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="green"
        strokeWidth="5"
        strokeColor="darkblue"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    </div>
  )
}

export default Loader
