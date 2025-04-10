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
    <div className=' relative w-[100vw] bg-[#151515]'>
        <p className=' flex justify-center text-3xl w-full font-mono font-bold text-white py-[2vh]'>THE THEATER</p>

        <div className=" flex w-[80vw] justify-center mx-auto sm:w-[100vw] py-[2vh]">
          <section className=" w-full h-full flex justify-around text-white">

              <div className='flex flex-col items-center gap-y-3 sm:gap-y-0 sm:items-start sm:flex-row flex-wrap sm:justify-between w-max h-max my-auto'>
                <Link onClick={(e)=>handleNavigation(e,'/')} className='Links w-max mx-2 my-[2px] hover:opacity-70'>Home</Link>
                <span className=' hidden sm:flex w-max mx-2'>|</span>
                <Link onClick={(e)=>handleNavigation(e,'/popular')}  className='Links w-max mx-2 my-[2px] hover:opacity-70'>Popular</Link>
                <Link onClick={(e)=>handleNavigation(e,'/top_rated')}  className='Links w-max mx-2 my-[2px] hover:opacity-70'>Top Rated</Link>
                <Link onClick={(e)=>handleNavigation(e,'/upcoming')} className='Links w-max mx-2 my-[2px] hover:opacity-70'>Upcomimg</Link>
                <span className='hidden sm:flex w-max mx-2'>|</span>
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