import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Casts from '../Components/Casts';
import Footer from '../Components/Footer';
import MovieCard from '../Components/MovieCard';
import Video from '../Components/Video';
import { ProfileContext } from '../Context/ProfileContextProvider';
import MovieHeroSection from '../Components/MovieHeroSection';
import { Tailspin } from 'ldrs/react'; 
import 'ldrs/react/Tailspin.css';
import FloatingPopup from '../Components/FloatingPopup';
import MovieDescription from '../Components/MovieDescription';
import MovieProviders from '../Components/MovieProviders';

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

  useEffect(() => {
    if (item) {
      document.title = item.original_title + ` - ${item.tagline}` || item.title + ` - ${item.tagline}` || 'Movie App';
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
      
      if (res.status === 404 || res.status === 500) {
        navigate('/*');
        return;
      }
      
      setItem(data);
    } catch (error) {
      console.error('Failed to fetch movie:', error);
    }
    setLoading(false);
  };

  const handleWatchlist = (e) => {
    e.preventDefault();
    const exists = userWatchlist.some(movie => movie.id === item.id);
  
    if (!exists) {
      setUserWatchlist(prev => [...prev, item]);
      setPopup({
        isOpen: true,
        message: `${item.title} added to watchlist!`,
        isError: false,
      });
    } else {
      setPopup({
        isOpen: true,
        message: 'Movie already exists in watchlist.',
        isError: true,
      });
    }
  
    setTimeout(() => {
      setPopup({ isOpen: false, message: '', isError: false });
    }, 5000);
  };  

  return (
    <>
      <Header />

      {loading ? (
        <div className="w-full h-screen flex items-center justify-center bg-black">
          <Tailspin
            size={50}
            stroke={5}
            speed={0.9}
            color="white"
          />
        </div>
      ) : item && (
        <div className="w-full bg-black text-white">
          <MovieHeroSection
            item={item}
            handleWatchlist={handleWatchlist}
          />
          <MovieDescription item={item}/>
          <Video id={id}/>
          <MovieProviders movieId={id}/>
          <Casts movieId={id} />
          <MovieCard
            url={`${import.meta.env.VITE_API_BASE}/api/movie/${id}/similar`}
            title="Recommendation"
          />
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