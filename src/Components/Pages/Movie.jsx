import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import Casts from '../Casts'
import Video from '../Video'

const MovieMain = () => {

    const {id} = useParams()
    const [item, setItem] = useState({})


    useEffect(() => {
      fetchItem()
    },[])

    const fetchItem = async () => {
      const apiKey = process.env.REACT_APP_API_KEY
      const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
      const movie = await data.json();
      setItem(movie)
    }

  return (

    <>     
        <Header/>

        <div className="movieItem w-[100vw]">

          <section className="MoiveItem_Banner h-[85vh] flex justify-around">

            <div className="Image_Container flex h-full w-[50%]">
            <img src={"http://image.tmdb.org/t/p/w500/"+item.backdrop_path} alt={item.original_title} 
            className='m-auto w-[80%] rounded'/>
            </div>

            <div className="Movie_Banner_Content flex flex-col justify-center w-[50%] text-white">
              <p className=' text-4xl mb-7'>{item.original_title}</p>
              <p className=' w-[90%] mb-5'>{item.overview}</p>
              <p className=' mb-2'>Released on: <b>{item.release_date}</b></p>
              <p>Rating: <b>{item.vote_average}</b></p>
            </div>

          </section>

          <Video movieId={id}/>
          <Casts movieId={id}/>

        </div>
    </>
  )

}

export default MovieMain