import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Banner from '../Banner'
import MovieCard from '../MovieCard'

const Home = () => {

  return (
    <>
      <Header/>
      <Banner/>
      <MovieCard title={"Popular Movies"} url='https://api.themoviedb.org/3/movie/popular?api_key=3a1152dfeee6a71281e7628c90d5e229&language=en-US&page=1'/>
      <MovieCard title={"Trending"} url='https://api.themoviedb.org/3/movie/upcoming?api_key=3a1152dfeee6a71281e7628c90d5e229&language=en-US&page=1'/>
    </>
  )
}

export default Home