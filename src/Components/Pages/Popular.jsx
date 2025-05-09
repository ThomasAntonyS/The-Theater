import React, { useEffect, useState } from 'react'
import PageLayout from '../PageLayout';
import Header from '../Header'
import Footer from '../Footer';

const Popular = () => {

    const [pageCount,setPageCount] = useState(1)
    const [movie,setMovie] = useState([])

    useEffect(()=>{
        getMovies();
    },[pageCount])

    const getMovies = async() =>{
        const apiKey = process.env.REACT_APP_API_KEY
        const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageCount}&include_adult=false`)
        const response = await data.json()
        setMovie(response.results)
    }

    function handleLeft(){
        if(pageCount<=1)
            setPageCount(1)
        else
            setPageCount(pageCount-1)
        window.scrollTo(0,0)
    }

  return (

    <>

        <Header/>

        <section>
            <PageLayout movies={movie} 
            title={"Most Liked"} 
            description={"A comprehensive collection of all movies, meticulously curated and organized, offers an extensive archive of cinematic masterpieces, spanning various genres, eras, and cultures, providing an invaluable resource for film enthusiasts."}
            path={"popular"}
            />
        </section>

        <section className='Pagination flex justify-between mt-[3vh] mb-[5vh]'>
            <div className='Pagination_content flex justify-between w-[50%] sm:w-[15%] m-auto'>
                <button className='Page_left w-max px-4 py-2 rounded-md text-white text-[20px]  bg-white bg-opacity-35' onClick={handleLeft}>&#8592;</button>
                <p className='flex justify-center my-auto w-[50%] text-white font-nunito'>{pageCount}</p>
                <button className='Page_right w-max px-4 py-2 rounded-md text-white text-[20px] bg-white bg-opacity-35' onClick={()=>{setPageCount(pageCount+1);window.scrollTo(0,0)}}>&#8594;</button>
            </div>
        </section>

        <Footer/>
    </>
  )
}

export default Popular