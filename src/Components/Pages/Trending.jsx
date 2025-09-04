import React, { useEffect, useState } from 'react';
import PageLayout from '../PageLayout';
import Header from '../Header';
import Footer from '../Footer';
import { useParams, useNavigate} from 'react-router-dom';

const Trending = () => {
  const [pageCount, setPageCount] = useState(1);
  const [movie, setMovie] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [loading,setLoading] = useState(false)

  document.title = "The Theater | Trending";
  const param = useParams()
  const navigate = useNavigate()

  const {page_no} = param

  useEffect(() => {
    getTrendingMovies();
    window.scrollTo(0, 0);
  }, [page_no]);

  const getTrendingMovies = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    try {
      setLoading(true)
      if(page_no>totalPages || page_no<1){
        navigate("/*", {replace:true})
        return
      } 
      setPageCount(page_no)
      const data = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US&language=en-US&page=${page_no}&include_adult=false`);
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
          totalPages={totalPages}
          loading={loading}
        />
      </section>

      <Footer />
    </>
  );
};

export default Trending;