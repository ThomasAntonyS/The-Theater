import React, { useEffect, useState } from 'react'
import MoviesPage from '../MoviesPage';

const Movies = () => {

    const [pageCount,setPageCount] = useState(1)
    const [movie,setMovie] = useState([])

    useEffect(()=>{
        getMovies();
    },[pageCount])

    const getMovies = async() =>{
        const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=3a1152dfeee6a71281e7628c90d5e229&language=en-US&page=${pageCount}`)
        const response = await data.json()
        setMovie(response.results)
        console.log(response.results);
    }

    function handleLeft(){
        if(pageCount<=1)
            setPageCount(1)
        else
            setPageCount(pageCount-1)
        window.scrollTo(0,0)
    }

  return (
    <div className=''>
        <section>
            <MoviesPage movies={movie}/>
        </section>

        <section className='Pagination flex justify-between mt-[3vh] mb-[5vh]'>
            <div className=' flex justify-between w-[15%] m-auto'>
                <button className='w-max px-4 py-2 rounded-full text-white text-[20px]  bg-white bg-opacity-5' onClick={handleLeft}>&#8592;</button>
                <p className='flex justify-center my-auto w-[50%] text-white'>{pageCount}</p>
                <button className='w-max px-4 py-2 rounded-full text-white text-[20px] bg-white bg-opacity-5' onClick={()=>{setPageCount(pageCount+1);window.scrollTo(0,0)}}>&#8594;</button>
            </div>
        </section>
    </div>
  )
}

export default Movies