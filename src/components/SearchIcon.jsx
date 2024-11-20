import PropTypes from 'prop-types';
const SearchIcon = ({ width = "24", height = "24", fill = "currentColor" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path d="M10 2a8 8 0 105.29 14.71l5 5a1 1 0 001.42-1.42l-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
    </svg>
  );
  
  SearchIcon.propTypes={
    width:PropTypes.number.isRequired,
    height:PropTypes.number.isRequired,
    fill:PropTypes.string.isRequired
  }
  export default SearchIcon;
  