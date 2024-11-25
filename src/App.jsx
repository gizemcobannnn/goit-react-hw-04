import SearchBox from './components/SearchBox.jsx';
import ImageResult from './components/ImageResult.jsx';
import LoadMoreBtn  from './components/LoadMoreBtn.jsx';
import ImageModal from './components/ImageModal.jsx';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');
 
function App() {
  const baseUrl = "https://api.unsplash.com/";
  const path = "search/photos/";
  const API_KEY="n1hufdNKQBCwywfsDtA0t_J8ZgbNc7sUjNej2cu61-Q";
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); 
  const [modalOpen , setModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageClick=(imgUrl)=>{
    console.log("Selected Image:", imgUrl); // Gelen görsel verisini kontrol edin
    setSelectedImg(imgUrl.urls.small); // Doğru URL alanını kullanın
    setModalOpen(true);
  }

  const handleCloseModal=()=>{
    setModalOpen(false);
    setSelectedImg(null);
  }


 
    async function fetchImages(query,page=1) {
      if (!search) return; // Boş aramalar için çağrıyı atla.
      
      try {
        const response = await axios.get(`${baseUrl}${path}`, {
          params: { query, page, per_page: 12, client_id: `${API_KEY}`},
          // Unsplash API'den aldığınız Access Key'i buraya koyun.
        });
        const newImages = response.data.results;

        // Gelen veriyi state'e ve localStorage'a ekle
        const updatedImages = page === 1 ? newImages : [...images, ...newImages];
        setImages(updatedImages);
        localStorage.setItem("currentImages",JSON.stringify(updatedImages));

        console.log(`current page: ${page} ${response.data.results}`)
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }


  const handleSearch = (event) => {
    setSearch(event.target.value); // Yazılan değeri güncelle.
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(search, nextPage);
  };
  const handleSearchSubmit = () => {
    if (!search.trim()) {
      console.warn("Search query is empty");
      return;
    }
    console.log("Search submitted:", search);
    setPage(page+1);
    fetchImages(search, 1); 
  };

  useEffect(()=>{
    const localData = localStorage.getItem("currentImages");
    if(localData){
      setImages(JSON.parse(localData));
    }
  },[]);
  return (
    <>
    <div className='search-section'>
      <SearchBox
        value={search}
        onChange={handleSearch}
        onSubmit={handleSearchSubmit}
      />
    </div>

      <ImageResult images={images} onImageClick={handleImageClick}  />
      {
        images.length>0 && (<LoadMoreBtn onLoad={handleLoadMore}></LoadMoreBtn>) 
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
