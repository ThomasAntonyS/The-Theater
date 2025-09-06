import Header from '../Components/Header'
import Banner from '../Components/Banner'
import MovieCard from '../Components/MovieCard'
import Footer from '../Components/Footer'

const Home = () => {
  document.title = "The Theater | Home"

  return (
    <>
      <Header/>
      <Banner/>
      <section>
        <MovieCard 
          title={"Popular Movies"} 
          url={`${import.meta.env.VITE_API_BASE}/api/movies/popular`} // Use the new backend endpoint
          navLink={'popular/page/1'}
        />
      </section>
      <MovieCard 
        title={"Upcoming"} 
        url={`${import.meta.env.VITE_API_BASE}/api/movies/upcoming`} // Use the new backend endpoint
        navLink={'upcoming/page/1'}
      />
      <MovieCard 
        title={"Top Rated"} 
        url={`${import.meta.env.VITE_API_BASE}/api/movies/top-rated`} // Use the new backend endpoint
        navLink={'top_rated/page/1'}
      />
      <Footer/>
    </>
  )
}

export default Home;