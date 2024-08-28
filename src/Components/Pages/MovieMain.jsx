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
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3a1152dfeee6a71281e7628c90d5e229&language=en-US`);
        const movie = await data.json();
        setItem(movie)
        console.log(item);
    }

  return (

    <>     
        <Header/>
    </>
  )

}

export default MovieMain