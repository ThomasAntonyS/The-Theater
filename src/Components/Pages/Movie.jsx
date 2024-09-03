import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import Casts from '../Casts'
import Video from '../Video'
import Footer from '../Footer'
import MovieCard from '../MovieCard'
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

const MovieMain = () => {

    const {id} = useParams()
    const [item, setItem] = useState({})


    useEffect(() => {
      fetchItem()
    },[id])

    const apiKey = process.env.REACT_APP_API_KEY
    const fetchItem = async () => {
      const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
      const movie = await data.json();
      setItem(movie)
    }

  return (

    <>     
        <Header/>

        <div className="movieItem w-[100vw]">

          <section className="MoiveItem_Banner h-[95vh]">

            <div className="Hero_content h-[90%] flex justify-around">
              <div className="Image_Container flex h-full w-[50%]">
                {
                  (item.backdrop_path != null) ?
                  <img src={"http://image.tmdb.org/t/p/w500/"+item.backdrop_path} alt={item.original_title} 
                  className='m-auto w-[80%] rounded'/>
                  :
                  <p className=' w-max h-max rounded flex justify-center align-middle text-white m-auto'><MovieCreationIcon style={{fontSize:"15rem",margin:'auto'}}/></p>
                }
              </div>
              <div className="Movie_Banner_Content flex flex-col justify-center w-[50%] text-white m-auto">
                <p className=' flex flex-wrap w-[90%] text-4xl mb-7'>{item.original_title}</p>
                <p className='flex flex-wrap w-[90%] mb-5'>{item.overview}</p>
                <p className=' mb-2'>Released on: <b>{item.release_date}</b></p>
                <p>Rating: <b>{item.vote_average}</b></p>
              </div>
            </div>

            <div className="Movie_Banner_Button h-[10%] w-max flex text-white mt-[-4%] ml-[5%]">
              <button className='border-2 border-white w-max h-max px-6 py-2 mx-3 rounded'><PlayCircleOutlineRoundedIcon style={{fontSize:'1.1rem',margin:'auto 5px',marginTop:'-2px'}}/>Watch Movie</button>
              <button className='border-2 border-white w-max h-max px-6 py-2 mx-3 rounded'><AddIcon style={{fontSize:'1.1rem',margin:'auto 5px',marginTop:'-2px'}}/> Add to Watchlist</button>
            </div>

          </section>

          <Video movieId={id}/>

          <Casts movieId={id}/>

          {/* For Recommendation */}
          <MovieCard url={`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`}
          title={"Recommendation"}
          navLink={''}
          />

          <Footer/>

        </div>
    </>
  )

}

export default MovieMain