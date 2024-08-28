import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header'

const MovieMain = () => {

    const {id} = useParams()
    console.log(id);
    
    const [item, setItem] = useState({})


    useEffect(() => {
      fetchItem()
    },[])

    const fetchItem = async () => {
      const apiKey = process.env.REACT_APP_API_KEY
      const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
      const movie = await data.json();
      setItem(movie)
      console.log(item);
    }

  return (

    <>     
        <Header/>

        <div className=' text-white'>
          <p>{item.original_title}</p>
          <p>{item.overview}</p>
          <p>{item.release_date}</p>
          <p>{item.status}</p>
        </div>
    </>
  )

}

export default MovieMain