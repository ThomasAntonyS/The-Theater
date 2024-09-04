import React, { useContext } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Link } from 'react-router-dom'
import { ProfileContext } from '../../Context/ProfileContextProvider'

const Watchlist = () => {

  const {loggedIn} = useContext(ProfileContext)

  return (

    <>
      <Header/>

      <div className='Watchlist_Container text-white'>
        {
          (loggedIn) ? 
          <>
            <p>Logged in</p>
            <Footer/>
          </>
          :
          <div className='LoggedOut_watchlist flex h-[100vh] w-[100vw] text-white'>
            <Link to={'/sign_in'} className=' m-auto w-max border-2 p-6 bg-white bg-opacity-5 hover:bg-opacity-15'>Sign In / Sign Up to view your watchlist</Link>
          </div>
        }
      </div>
    </>
  )
}

export default Watchlist