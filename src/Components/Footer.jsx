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
    <div className='Footer_Main relative w-[100vw] bg-[#151515]'>
        <p className='Footer_title flex justify-center text-3xl w-full font-mono font-bold text-white py-[2vh]'>THE THEATER</p>

        <div className="Contact_and_Quick_Link flex w-[100vw] py-[2vh]">
          <section className=" w-full h-full flex justify-around text-white">

              <div className='Quick_Link flex flex-row flex-wrap justify-between w-max h-max my-auto'>
                <Link onClick={(e)=>handleNavigation(e,'/')} className='Links w-max mx-2 my-[2px] hover:opacity-70'>Home</Link>
                <span className='Dividor w-max mx-2'>|</span>
                <Link onClick={(e)=>handleNavigation(e,'/popular')}  className='Links w-max mx-2 my-[2px] hover:opacity-70'>Popular</Link>
                <Link onClick={(e)=>handleNavigation(e,'/top_rated')}  className='Links w-max mx-2 my-[2px] hover:opacity-70'>Top Rated</Link>
                <Link onClick={(e)=>handleNavigation(e,'/upcoming')} className='Links w-max mx-2 my-[2px] hover:opacity-70'>Upcomimg</Link>
                <span className='Dividor w-max mx-2'>|</span>
                <Link onClick={(e)=>handleNavigation(e,'/sign_up')}  className='Links w-max mx-2 my-[2px] hover:opacity-70'>Sign Up</Link>
                <Link onClick={(e)=>handleNavigation(e,'/sign_in')}  className='Links w-max mx-2 my-[2px] hover:opacity-70'>Sign In</Link>
                <Link onClick={(e)=>handleNavigation(e,'/watchlist')}  className='Links w-max mx-2 my-[2px] hover:opacity-70'>WatchList</Link>
              </div>

          </section>
        </div>

        <center className='bg-[#151515] py-[2vh]'>
          <p className='Copyright text-white'><span className=' mx-2'>&copy;</span>The Theater - All Rights Reserved, 2024</p>
        </center>
    </div>
  )
}

export default Footer