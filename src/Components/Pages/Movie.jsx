import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Casts from '../Casts';
import Video from '../Video';
import Footer from '../Footer';
import MovieCard from '../MovieCard';
import { ProfileContext } from '../../Context/ProfileContextProvider';
import MovieHeroSection from '../MovieHeroSection';
import { Tailspin } from 'ldrs/react'; 
import 'ldrs/react/Tailspin.css';
import FloatingPopup from '../FloatingPopup';

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
  

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (id) fetchItem();
  }, [id]);

  const fetchItem = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&include_adult=false`);
      const data = await res.json();
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
          <Casts movieId={id} />
          <MovieCard
            url={`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`}
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
