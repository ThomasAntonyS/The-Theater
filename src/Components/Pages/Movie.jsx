import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Casts from '../Casts';
import Video from '../Video';
import Footer from '../Footer';
import MovieCard from '../MovieCard';
import { ProfileContext } from '../../Context/ProfileContextProvider';
import MovieHeroSection from '../MovieHeroSection';

const MovieMain = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { loggedIn, userWatchlist, setUserWatchlist } = useContext(ProfileContext);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (id) fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
      const data = await res.json();
      setItem(data);
      
    } catch (error) {
      console.error('Failed to fetch movie:', error);
    }
  };

  const handleWatchlist = (e) => {
    e.preventDefault();
    const exists = userWatchlist.some(movie => movie.id === item.id);
    if (!exists) {
      setUserWatchlist(prev => [...prev, item]);
    } else {
      alert('Movie already exists in watchlist');
    }
  };

  const handleWatchlistLoggedOut = () => {
    alert('Log in to save watchlist.');
  };

  return (
    <>
      <Header />
      {item && (
        <div className="w-full bg-black text-white">
          <MovieHeroSection
            item={item}
            handleWatchlist={loggedIn ? handleWatchlist : handleWatchlistLoggedOut}
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
