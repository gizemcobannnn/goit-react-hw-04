import Styles from './SearchBox.module.css';
import SearchIcon from './SearchIcon.jsx';

const SearchBox = () => {
  return (
    <div className={Styles.searchBox}>
        <SearchIcon width="32" height="32" fill="#000" />
        <input className={Styles.inputBox} type="text" value="Search" />
    </div>
  )
}

export default SearchBox