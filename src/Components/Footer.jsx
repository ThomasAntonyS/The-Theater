import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {

  const navigate = useNavigate()

  const handleNavigation =(e,link) =>{
    e.preventDefault()
    navigate(link)
    window.scrollTo(0,0)
  }

  return (
    <div className='Footer_Main relative h-[20vh] w-[100vw] '>
        <p className=' absolute flex justify-center text-3xl w-full font-mono font-bold text-white mt-[10px]'>THE THEATER</p>

        <div className="Contact_and_Quick_Link flex absolute w-[90vw] h-[65%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <section className="Quick_Link w-full h-full flex justify-around text-white">

              <div className=' flex flex-row flex-wrap w-max h-max my-auto'>
                <Link onClick={(e)=>handleNavigation(e,'/')} className=' w-max mx-6 hover:opacity-70'>Home</Link>
                <Link onClick={(e)=>handleNavigation(e,'/profile')}  className='w-max mx-6 hover:opacity-70'>Profile</Link>
                <span className=' w-max'>|</span>
                <Link onClick={(e)=>handleNavigation(e,'/popular')}  className=' w-max mx-6 hover:opacity-70'>Popular</Link>
                <Link onClick={(e)=>handleNavigation(e,'/top_rated')}  className=' w-max mx-6 hover:opacity-70'>Top Rated</Link>
                <Link onClick={(e)=>handleNavigation(e,'/upcoming')} className=' w-max mx-6 hover:opacity-70'>Upcomimg</Link>
                <span className=' w-max'>|</span>
                <Link onClick={(e)=>handleNavigation(e,'/signin')}  className=' w-max mx-6 hover:opacity-70'>Sign In</Link>
                <Link onClick={(e)=>handleNavigation(e,'/signup')}  className=' w-max mx-6 hover:opacity-70'>Sign UP</Link>
                <Link onClick={(e)=>handleNavigation(e,'/watchlist')}  className=' w-max mx-6 hover:opacity-70'>WatchList</Link>
              </div>

          </section>
        </div>

        <center>
            <p className=' absolute bottom-0 mb-2 text-white'><span className=' mx-2'>&copy;</span>The Theater - All Rights Reserved, 2024</p>
        </center>
    </div>
  )
}

export default Footer