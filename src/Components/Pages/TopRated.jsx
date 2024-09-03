import {useState,useEffect} from 'react'
import PageLayout from '../PageLayout';
import Header from '../Header'
import Footer from '../Footer';

const TopRated = () => {

    const [pageCount,setPageCount] = useState(1)
    const [movie,setMovie] = useState([])

    useEffect(()=>{
        getMovies();
    },[pageCount])

    const getMovies = async() =>{
        const apiKey = process.env.REACT_APP_API_KEY
        const data = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${pageCount}`)
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
            title={"Best Of All Times"} 
            description={"Explore our selection of top-rated movies, handpicked from popular genres, showcasing the best in storytelling, acting, and cinematic artistry. Perfect for movie enthusiasts looking for the highest-rated films."}
            path={"top_rated"}
            /> 
        </section>

        <section className='Pagination flex justify-between mt-[3vh] mb-[5vh]'>
            <div className=' flex justify-between w-[15%] m-auto'>
                <button className='w-max px-4 py-2 rounded-full text-white text-[20px]  bg-white bg-opacity-5' onClick={handleLeft}>&#8592;</button>
                <p className='flex justify-center my-auto w-[50%] text-white'>{pageCount}</p>
                <button className='w-max px-4 py-2 rounded-full text-white text-[20px] bg-white bg-opacity-5' onClick={()=>{setPageCount(pageCount+1);window.scrollTo(0,0)}}>&#8594;</button>
            </div>
        </section>

        <Footer/>
        
    </>

  )

}

export default TopRated