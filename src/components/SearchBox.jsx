import Styles from './SearchBox.module.css';
import PropTypes from 'prop-types';
const SearchBox = ({value,onChange,onSubmit}) => {
  return (
    <div className={Styles.searchBox}>
        <button className={Styles.findButton} onClick={onSubmit} >
            <svg className={Styles.svgFind}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="black"
          >
            <path d="M10 2a8 8 0 105.29 14.71l5 5a1 1 0 001.42-1.42l-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
          </svg>
        </button >
        <input className={Styles.inputBox} type="text" value={value} onChange={onChange} placeholder="Search images..."/>

    </div>
  )
}

SearchBox.propTypes={
  value:PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired,
  onSubmit:PropTypes.func.isRequired,
}
export default SearchBox