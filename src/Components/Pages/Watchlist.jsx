import React, { useContext } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { ProfileContext } from '../../Context/ProfileContextProvider'

const Watchlist = () => {

  const {} = useContext(ProfileContext)

  return (

    <>
      <Header/>

      <div className=' text-white'>
        
      </div>

      <Footer/>
    </>
  )
}

export default Watchlist