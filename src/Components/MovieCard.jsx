import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({title,url}) => {

    const [movies,setMovies] = useState([])

    const fetchMovie = async () => {
    const data = await fetch(url);
    const movie = await data.json();
    console.log(movie.results);
    setMovies(movie.results)
}
useEffect(() => {
    fetchMovie()
    console.log(movies);
    
}, [])
    const baseImage = 'https://image.tmdb.org/t/p/w185'

  return (
    
    <div className='overflow-hidden w-[95vw] mx-auto -mt-[7%] mb-[160px]'>

    <div className=' flex relative w-[97%]'>
        <p className='text-xl font-bold mx-3 text-white w-max h-max'>{title}</p>
        <button className=' absolute right-0 text-white bg-white bg-opacity-20 w-max h-max px-3 py-[.1rem] rounded-full'><span className=' text-1xl h-max w-max'>See More <span className=' text-[20px]'> &#8594;</span></span></button>
    </div>

    {movies ? (
        <div className='relative flex overflow-x-scroll overflow-y-hidden mx-auto w-[99%]'>
            <div className='flex'>
                {movies.map((movie, index) => (
                    <div key={index} className='Moviecard_main relative flex flex-wrap h-[50vh] w-[15vw] my-4 mx-6'>
                        <img src={baseImage + movie.poster_path} alt={movie.title} className=' h-[70%] w-fill object-fill rounded-[10px]'/>
                        <p className=' text-white text-[1rem] ml-2 mt-[-20px]'>{movie.title}</p>
                        <Link path='' className='absolute bottom-0 right-0 text-white text-[.9rem] h-max w-max'>Know More<span className=' mt-[20px] text-white text-[1.3rem] h-max w-max px-1'>&#8594;</span></Link>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    )}
</div>



  )

}

export default MovieCard