import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Casts from '../Components/Casts';
import Footer from '../Components/Footer';
import Video from '../Components/Video';
import { ProfileContext } from '../Context/ProfileContextProvider';
import MovieHeroSection from '../Components/MovieHeroSection';
import { Tailspin } from 'ldrs/react'; 
import 'ldrs/react/Tailspin.css';
import FloatingPopup from '../Components/FloatingPopup';
import MovieDescription from '../Components/MovieDescription';
import MovieProviders from '../Components/MovieProviders';
import Reviews from '../Components/MovieReviews';
import Photos from '../Components/MoviePhotos';
import Recommendations from '../Components/MovieRecommendations';

const MovieMain = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userWatchlist, setUserWatchlist } = useContext(ProfileContext);
  const [popup, setPopup] = useState({
    isOpen: false,
    message: '',
    isError: false,
  });
  const navigate = useNavigate();

  const inWatchList = userWatchlist.find(movie=>movie.id==id)

  useEffect(() => {
    if (item) {
      document.title = (item.original_title || item.title) + (item.tagline ? ` - ${item.tagline}` : '');
    }
  }, [item]);

  useEffect(() => {
    if (id) fetchItem();
  }, [id]);

  const fetchItem = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/movie/${id}`);
      const data = await res.json();
      
      if ((res.status === 404 || res.status === 500) && !data) {
        navigate('/*');
        return;
      }
      
      setItem(data);
    } catch (error) {
      console.error('Failed to fetch movie:', error);
    }
    setLoading(false);
  };

  const handleSaveWatchlist = (e) => {
    e.preventDefault();
    setUserWatchlist(prev => [...prev, item]);
    setPopup({
      isOpen: true,
      message: `${item.title} added to watchlist!`,
      isError: false,
    });
    return
  }

  const  handleUnsaveWatchlist = (e) => {
    e.preventDefault();
    const filteredData = userWatchlist.filter(movie=>movie.id != id)
    setUserWatchlist(filteredData)
    setPopup({
      isOpen: true,
      message: `${item.title} removed to watchlist!`,
      isError: false,
    });
    return
  }

  return (
    <>
      <Header />

      {loading ? (
        <div className="w-full h-screen flex items-center justify-center bg-black">
          <Tailspin
            size={50}
            stroke={5}
            speed={0.7}
            color="white"
          />
        </div>
      ) : item && (
        <div className="w-full bg-black text-white">
          <MovieHeroSection
            item={item}
            handleWatchlist={inWatchList?handleUnsaveWatchlist:handleSaveWatchlist}
            inWatchList={inWatchList}
          />
          
          <MovieDescription item={item}/>

          <Photos movieId={id} />
          
          <Video id={id}/>
          
          <MovieProviders movieId={id}/>
          
          <Casts movieId={id} />
          
          <Reviews movieId={id} />

          <Recommendations movieId={id} />

          <Footer />
        </div>
      )}

      {popup.isOpen && (
        <FloatingPopup
          message={popup.message}
          isError={popup.isError}
          onClose={() => setPopup({ ...popup, isOpen: false })}
        />
      )}
    </>
  );
};

export default MovieMain;