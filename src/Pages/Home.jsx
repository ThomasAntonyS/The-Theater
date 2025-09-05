import Header from '../Components/Header'
import Banner from '../Components/Banner'
import MovieCard from '../Components/MovieCard'
import Footer from '../Components/Footer'

const Home = () => {

  document.title = "The Theater | Home"

  const apiKey = import.meta.env.VITE_API_KEY

  return (
    <>
      <Header/>

      <Banner/>

      <section>
        <MovieCard title={"Popular Movies"} 
        url={`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1&include_adult=false`}
        navLink={'popular/page/1'}
      />
      </section>

      <MovieCard title={"Upcoming"} 
      url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1&include_adult=false`}
      navLink={'upcoming/page/1'}
      />

      <MovieCard title={"Top Rated"} 
      url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1&include_adult=false`}
      navLink={'top_rated/page/1'}
      />

      <Footer/>
    </>
  )
}

export default Home