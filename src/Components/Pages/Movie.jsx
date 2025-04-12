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

const MovieMain = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userWatchlist, setUserWatchlist } = useContext(ProfileContext);

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
      alert(`${item.title} added to wishlist.`);
    } else {
      alert('Movie already exists in watchlist');
    }
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
          <Video movieId={id} />
          <Casts movieId={id} />
          <MovieCard
            url={`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`}
            title="Recommendation"
          />
          <Footer />
        </div>
      )}
    </>
  );
};

export default MovieMain;
