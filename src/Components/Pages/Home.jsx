import Header from '../Header'
import Banner from '../Banner'
import MovieCard from '../MovieCard'
import Footer from '../Footer'

const Home = () => {

  const apiKey = process.env.REACT_APP_API_KEY

  return (
    <>
      <Header/>

      <Banner/>

      <section>
        <MovieCard title={"Popular Movies"} 
        url={`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1&include_adult=false`}
        navLink={'popular'}
      />
      </section>

      <MovieCard title={"Trending"} 
      url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1&include_adult=false`}
      navLink={'upcoming'}
      />

      <MovieCard title={"Top Rated"} 
      url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1&include_adult=false`}
      navLink={'top_rated'}
      />

      <Footer/>
    </>
  )
}

export default Home