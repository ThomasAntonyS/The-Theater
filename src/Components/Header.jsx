import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Logo from '../assets/Logo.png'

const Header = () => {

  return (
    <div>
        <div className="Header-main absolute top-0 flex align-middle justify-between h-[10vh] w-[100%]  bg-black bg-opacity-25 z-20">

            <div className="Header_Navigation flex w-[20vw] ml-6 text-white">
                <button className='default_style' id='menu_icon'><MenuIcon/></button>
                <Link className='default_style hover:opacity-70' to='/popular'>Popular</Link>
                <Link className='default_style hover:opacity-70' to='/top_rated'>Top Rated</Link>
                <Link className='default_style hover:opacity-70' to='/upcoming'>Upcoming</Link>
            </div>

            <div className="Header_Title flex w-[15vw] ml-[-120px] mt-1 text-white font-bold">
                <a href='/'><img src={Logo} alt="Logo" className=' h-[6vh] my-3'/></a>
            </div>

            <div className="Header_UserFunction flex w-[12vw] mr-6 text-white">
                <Link className='default_style p-2 rounded-full hover:bg-white hover:bg-opacity-25' to='/search'><SearchIcon/></Link>
                <Link className='default_style p-2 rounded-full  hover:bg-white hover:bg-opacity-25' to='/watchlist'><LiveTvIcon/></Link>
                <Link className='default_style' to='/profile'><Avatar alt="Remy Sharp" src="" /></Link>
            </div>

        </div>
    </div>
  )

}

export default Header