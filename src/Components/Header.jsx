import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {

  return (
    <div>
        <div className="Header-main absolute flex align-middle justify-between h-[10vh] w-[100%]  bg-black bg-opacity-25 z-20">

            <div className="Header_Navigation flex w-[17vw] ml-6 text-white ">
                <button className='default_style'><MenuIcon/></button>
                <Link className='default_style'>Movies</Link>
                <Link className='default_style'>New & Popular</Link>
            </div>

            <div className="Header_Title flex w-[15vw] text-white font-bold">
                <p className='default_style '>THEATER</p>
            </div>

            <div className="Header_UserFunction flex w-[12vw] mr-6 text-white">
                <button className='default_style'><SearchIcon/></button>
                <Link className='default_style'><NotificationsIcon/></Link>
                <Link className='default_style'><Avatar alt="Remy Sharp" src="" /></Link>
            </div>

        </div>
    </div>
  )

}

export default Header