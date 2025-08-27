import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from './PageLayout'
import Header from './Header'
import Footer from './Footer'

const GenreMoviesPage = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMoviesAndGenre = async () => {
      try {
        const moviesRes = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${pageCount}`
        );
        const movieData = await moviesRes.json();
        setMovies(movieData.results);
        setTotalPages(movieData.total_pages);

        const genreRes = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
        );
        const genreData = await genreRes.json();
        const genre = genreData.genres.find((g) => g.id === parseInt(genreId));
        setGenreName(genre?.name || 'Genre');

      } catch (error) {
        console.error('Error fetching genre movies:', error);
      }
    };

    fetchMoviesAndGenre();
    window.scrollTo(0,0)
  }, [genreId, pageCount]);

  useEffect(()=>{
    if(genreName)
      document.title = genreName + " Movies"
  })

  return (
    <>
      <Header/>

      <PageLayout
        movies={movies}
        title={`${genreName} Movies`}
        description={`Explore top ${genreName.toLowerCase()} movies from out collection.`}
        pageCount={pageCount}
        setPageCount={setPageCount}
        totalPages={totalPages}
      />

      <Footer/>
    </>
  );
};

export default GenreMoviesPage;
