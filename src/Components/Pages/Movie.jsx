import { useState,useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import Casts from '../Casts'
import Video from '../Video'
import Footer from '../Footer'
import MovieCard from '../MovieCard'
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { ProfileContext } from '../../Context/ProfileContextProvider'

const MovieMain = () => {

    const {id} = useParams()
    const [item, setItem] = useState({})
    const [containsMovie,setContainMovie] = useState(true)

    const {loggedIn,userWatchlist,setUserWatchlist} = useContext(ProfileContext)


    useEffect(() => {
      fetchItem()
    },[id])

    const apiKey = process.env.REACT_APP_API_KEY
    const fetchItem = async () => {
      const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
      const movie = await data.json();
      setItem(movie)
    }

    function handleWatchlist (e,watchlistMovie){
      e.preventDefault()
      for (let index = 0; index < userWatchlist.length; index++) {
        if(watchlistMovie.id === userWatchlist[index].id){
          alert("Movie already exist")
          setContainMovie(true)
        }
        else
          setContainMovie(false)
      }
      if(!containsMovie)
        setUserWatchlist(userWatchlist=>[...userWatchlist,watchlistMovie])

      setContainMovie(false)
    }

    function handleWatchlistLoggedOut(){
      alert("Log In in to save watchlist.")
    }

  return (

    <>     
        <Header/>

        {
          (item) ?
          <div className="MovieItem w-[100vw]">
          
            <section className="MoiveItem_Banner h-[95vh]">
          
              <div className="MoiveItem_Hero_content h-[90%] flex justify-around">

                <div className="MoiveItem_Image_Container flex h-full w-[50%]">
                  {
                    (item.backdrop_path != null) ?
                    <img src={"http://image.tmdb.org/t/p/w500/"+item.backdrop_path} alt={item.original_title} 
                    className='m-auto w-[80%] rounded'/>
                    :
                    <p className=' w-max h-max rounded flex justify-center align-middle text-white m-auto'><MovieCreationIcon style={{fontSize:"15rem",margin:'auto'}}/></p>
                  }
                </div>

                <div className="Movie_Banner_Content flex flex-col justify-center w-[50%] text-white m-auto">
                  <p className='Movie_Banner_Content_title flex flex-wrap w-[90%] text-4xl'>{item.original_title}</p>
                  <p className='Movie_Banner_Content_description flex flex-wrap w-[90%] mt-7'>{item.overview}</p>
                    {
                      (item.release_date) ?
                      <p className='Movie_Banner_Content_release mt-5'> Release date: <b>{item.release_date}</b></p>
                      :null
                    }
                    {
                      (item.vote_average) ?
                      <p className='Movie_Banner_Content_rating'>Rating: <b>{item.vote_average}</b></p>
                      :null
                    }
                </div>

              </div>
                
              <div className="Movie_Banner_Button flex h-[10%] w-max text-white mt-[-4%] ml-[5%]">
                <button className='Movie_Banner_watch border-2 border-white w-max h-max px-6 py-2 mx-3 rounded hover:bg-white hover:bg-opacity-10'>
                <PlayCircleOutlineRoundedIcon style={{fontSize:'1.1rem',margin:'auto 5px',marginTop:'-2px'}}/>Watch Movie</button>

                <button className='Movie_Banner_watchlist border-2 border-white w-max h-max px-6 py-2 mx-3 rounded hover:bg-white hover:bg-opacity-10' 
                onClick={(loggedIn)?e=>handleWatchlist(e,item):handleWatchlistLoggedOut}>
                <AddIcon style={{fontSize:'1.1rem',margin:'auto 5px',marginTop:'-2px'}}/> Add to Watchlist</button>
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
        :null
        }
    </>
  )

}

export default MovieMain