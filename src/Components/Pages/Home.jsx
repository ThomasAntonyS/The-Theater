import React, { useEffect } from 'react'
import Header from '../Header'
import Banner from '../Banner'

const Home = () => {
{/*
  const fetchMovie = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=3a1152dfeee6a71281e7628c90d5e229&language=en-US&page=${1}`);
    const movie = await data.json();
    console.log(movie.results);
    
}
useEffect(() => {
    fetchMovie()
}, [])
*/}

  return (
    <>
      <Header/>
      <Banner/>
    </>
  )
}

export default Home