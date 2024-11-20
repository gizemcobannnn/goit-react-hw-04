import SearchBox from './components/SearchBox.jsx'
import './App.css'
import axios from 'axios';

function App() {
 
  const baseUrl="https://api.unsplash.com/";
  const path="search/photos";

  return (
    <>
      <SearchBox></SearchBox>
    </>
  )
}

export default App
