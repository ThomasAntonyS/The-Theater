import React, { useEffect, useState } from 'react'
import PageLayout from '../PageLayout';
import Header from '../Header'
import Footer from '../Footer';

const Upcoming = () => {

    const [pageCount,setPageCount] = useState(1)
    const [movie,setMovie] = useState([])

    useEffect(()=>{
        getMovies();
    },[pageCount])

    const getMovies = async() =>{
        const apiKey = process.env.REACT_APP_API_KEY
        const data = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${pageCount}`)
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
            title={"On The Horizon"} 
            description={"Stay updated with the latest releases and never miss out on the most anticipated movies hitting the theaters soon. Discover trailers, release dates, and exclusive sneak peeks of upcoming blockbusters."}
            path={"upcoming"}
            />
        </section>

        <section className='Pagination flex justify-between mt-[3vh] mb-[5vh]'>
            <div className='Pagination_content flex justify-between w-[50%] sm:w-[15%] m-auto'>
                <button className='w-max px-4 py-2 rounded-full text-white text-[20px]  bg-white bg-opacity-35' onClick={handleLeft}>&#8592;</button>
                <p className='flex justify-center my-auto w-[50%] text-white font-nunito'>{pageCount}</p>
                <button className='w-max px-4 py-2 rounded-full text-white text-[20px] bg-white bg-opacity-35' onClick={()=>{setPageCount(pageCount+1);window.scrollTo(0,0)}}>&#8594;</button>
            </div>
        </section>

        <Footer/>
        
    </>
  )
}

export default Upcoming