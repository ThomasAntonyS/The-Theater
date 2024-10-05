import React, { useContext } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Link } from 'react-router-dom'
import { ProfileContext } from '../../Context/ProfileContextProvider'
import PageLayout from '../PageLayout'

const Watchlist = () => {

  const {loggedIn,userWatchlist} = useContext(ProfileContext)
  

  return (

    <>
      <Header/>

      <div className='Watchlist_Container text-white'>
        {
          (loggedIn) ? 
          <>
            {
              (userWatchlist.length>0)?
              <>
                <section>
                  <PageLayout movies={userWatchlist}
                  title={'Your WatchList'}
                  description={"Add movies to your watchlist and keep track of films you want to see. Conveniently save titles to enjoy later, so you never forget a movie recommendation or new release. Enjoy seamless access whenever you're ready to watch."}
                  />
                </section>
                <Footer/>
              </>
              :
              <p className='Watchlist_empty text-white text-2xl w-max h-full mx-auto mt-[20%]'>Add Movies to your watchlist</p>
            }
          </>
          :
          <div className='LoggedOut_watchlist flex h-[100vh] w-[100vw] text-white'>
            <Link to={'/sign_in'} className=' m-auto w-max border-2 p-6 bg-white bg-opacity-5 hover:bg-opacity-15'>Click Here to Sign In / Sign Up and view your watchlist</Link>
          </div>
        }
      </div>
    </>
  )
}

export default Watchlist