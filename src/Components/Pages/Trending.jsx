import React, { useEffect, useState } from 'react';
import PageLayout from '../PageLayout';
import Header from '../Header';
import Footer from '../Footer';

const Trending = () => {
  const [pageCount, setPageCount] = useState(1);
  const [movie, setMovie] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [loading,setLoading] = useState(false)

  document.title = "The Theater | Trending";

  useEffect(() => {
    getTrendingMovies();
    window.scrollTo(0, 0);
  }, [pageCount]);

  const getTrendingMovies = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    try {
      setLoading(true)
      const data = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US&language=en-US&page=${pageCount}&include_adult=false&page=${pageCount}`);
      const response = await data.json();
      setMovie(response.results);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      setLoading(false)
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <>
      <Header />

      <section>
        <PageLayout
          movies={movie}
          title={"Trending Movies"}
          description={
            "Discover what's hot and happening in the cinematic world right now. This collection features the most popular and talked-about movies, updated daily to keep you in sync with the latest trends."
          }
          path={"trending"}
          pageCount={pageCount}
          setPageCount={setPageCount}
          totalPages={totalPages}
          loading={loading}
        />
      </section>

      <Footer />
    </>
  );
};

export default Trending;