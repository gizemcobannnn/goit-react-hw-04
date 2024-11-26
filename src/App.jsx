import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ReactModal from 'react-modal';

import SearchBar from './components/SearchBar.jsx';
import ImageGallery from './components/ImageGallery.jsx';
import LoadMoreBtn  from './components/LoadMoreBtn.jsx';
import ImageModal from './components/ImageModal.jsx';
import ErrorMessage from './components/ErrorMessage.jsx'
import Loader from './components/Loader.jsx';

ReactModal.setAppElement('#root');
 
function App() {
  const BASE_URL = "https://api.unsplash.com/";
  const PATH = "search/photos/";
  const API_KEY="n1hufdNKQBCwywfsDtA0t_J8ZgbNc7sUjNej2cu61-Q";

  //State variables
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); 
  const [modalOpen , setModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [error, setError] = useState(null); 
  const [isLoading, setLoading] = useState(false);

  const handleImageClick=(imgUrl)=>{
    console.log("Selected Image:", imgUrl); // Gelen görsel verisini kontrol edin
    setSelectedImg(imgUrl.urls.small); // Doğru URL alanını kullanın
    setModalOpen(true);
  }

  const handleCloseModal=()=>{
    setModalOpen(false);
    setSelectedImg(null);
  }


    // Fetch images from Unsplash API
    async function fetchImages(query,page=1) {
      if (!query.trim()) return; // Boş aramalar için çağrıyı atla.
      
      try {
        setError(null);
        setLoading(true);

        const response = await axios.get(`${BASE_URL}${PATH}`, {
          params: { query, page, per_page: 12, client_id: `${API_KEY}`},
          // Unsplash API'den aldığınız Access Key'i buraya koyun.
        });
        const newImages = response.data.results;

        // Gelen veriyi state'e ve localStorage'a ekle
        const updatedImages = page === 1 ? newImages : [...images, ...newImages];
        setImages(updatedImages);
        localStorage.setItem("currentImages",JSON.stringify(updatedImages));
        localStorage.setItem("searchText", JSON.stringify(query));
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to load images. Please try again later.");
      }finally{
        setLoading(false);
      }
    }


  const handleSearch = (event) => {
    setSearch(event.target.value); 
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(search, nextPage);
   };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!search.trim()) {
      console.warn("Search query is empty");
      return;
    }
    console.log("Search submitted:", search);
    setPage(1);
    fetchImages(search, 1); 
    
  };

  useEffect(()=>{

    try{
      const localSearch = JSON.parse(localStorage.getItem("searchText")) || "";
      const localImages = JSON.parse(localStorage.getItem("currentImages")) || [];
  
      setSearch(localSearch);
      setImages(localImages);
    }catch (error) {
      console.error("Error reading from localStorage:", error);
      setSearch("");
      setImages([]);
    }

  },[]);

  return (
    <>
    <div className='search-section'>
      <SearchBar
        value={search}
        onChange={handleSearch}
        onSubmit={(event)=>{handleSearchSubmit(event)}}
      />
    </div>

    {
      isLoading ? (<Loader/>) : error ? (<ErrorMessage message={error}/>) : (<ImageGallery images={images} onImageClick={handleImageClick}/>)
    }

     {
       images.length>0 &&  !error &&  !isLoading && ( <LoadMoreBtn onLoad={handleLoadMore} /> ) 
     }

     {modalOpen && selectedImg && (
       <ImageModal
         isOpen={modalOpen}
         onClose={handleCloseModal}
         imgUrl={selectedImg}
         altText="Selected image"
       />
     )}

    </>
  );
}

export default App;
