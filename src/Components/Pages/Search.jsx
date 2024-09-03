import React, { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { Link,useNavigate } from 'react-router-dom'

const Search = () => {

  const [movie,setMovie] = useState([])
  const [searchMovie,setSearchMovie] = useState('')
  const navigate = useNavigate();

  const fetchSearches = async () => {
    const apiKey = process.env.REACT_APP_API_KEY
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchMovie}&page=1&include_adult=false`);
    const search = await data.json();
    setMovie  (search.results)
  }

  function handleNavigation(e,id){
    e.preventDefault()
    navigate(`/movie/${id}`)
    window.scrollTo(0,0)
  }

  const baseImage = 'https://image.tmdb.org/t/p/w185'

  return (
    <>
      <Header/>

      <div className=' text-white h-max'>

      <section className=' h-[20%] mb-[50px]'>
        <p className=' text-white w-max text-4xl mx-auto mt-[15vh] mb-[3vh]'>Find Your Movie</p>
        <p className=' text-white w-[75%] text-1xl mx-auto mb-[7vh] text-center'>If you’re searching for your next movie, consider diving into a world where emotions run deep and stories captivate. From epic adventures and heartfelt dramas to thrilling mysteries and side-splitting comedies, there's a film for every mood.</p>
      </section>

      <div className="Search-box w-full flex justify-center ">
        <input type="text"
        placeholder='Search your movie...'
        className=' w-[30%] text-white bg-black border-b-2 outline-none mx-3 px-3 hover:border-b-2 border-b-white hover:bg-white hover:bg-opacity-15 ease-in transition-all delay-200' 
        value={searchMovie}
        onChange={(e)=>setSearchMovie(e.target.value)}
        />

        <button className=' w-max mx-3 bg-white bg-opacity-20 px-4 py-2 rounded hover:bg-opacity-15' onClick={fetchSearches}>Search</button>
      </div>


      {
        (movie.length > 0) ?
          <section className='Serach_Results w-[90%] h-max my-[40px] mx-auto'>
            <div className="content flex flex-col w-max overflow-hidden mx-auto">
                    {(movie.length > 0) ? (
                    <div className=' flex w-[85vw] overflow-hidden mx-auto my-3'>
                        <div className='flex flex-wrap'>
                            {movie.map((movie, index) => (
                                <Link key={index} onClick={(e)=>handleNavigation(e,movie.id)} className='Moviecard_main relative flex flex-wrap h-[50vh] w-[13vw] my-4 mx-[30px]'>
                                    {
                                      (movie.poster_path != null) ?
                                      <img src={baseImage + movie.poster_path} alt={movie.title} className=' h-[65%] w-fill object-fill rounded-[10px]'/>
                                      :
                                      <p className='h-[65%] flex justify-center align-middle text-white'><MovieCreationIcon style={{fontSize:"10rem",margin:'auto'}}/></p>
                                    }
                                    <p className=' text-white text-[1rem] ml-1 mt-[-20px]'>{movie.title}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) :
                  null
                }
              </div>
          </section>
        :
        <p className='search_animation my-[40px] flex justify-center'>Search your favorite movie</p>
      }

      </div>

      <Footer/>
    </>
  )
}

export default Search