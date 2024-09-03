import React, { useContext } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Logo from '../assets/Logo.png'
import { ProfileContext } from '../Context/ProfileContextProvider';

const Header = () => {

    const {setUserName,setUserEmail,setUserWatchlist,setLoggedIn} = useContext(ProfileContext)

    function handleLogout(){
        setLoggedIn(false)
        setUserName(' ')
        setUserEmail(' ')
        setUserWatchlist([])
    }

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

            <div className="Header_UserFunction flex w-[13vw] mr-6 text-white">
                <Link className='default_style p-2 rounded-full hover:bg-white hover:bg-opacity-25' to='/search'><SearchIcon/></Link>
                <Link className='default_style p-2 rounded-full  hover:bg-white hover:bg-opacity-25' to='/watchlist'><LiveTvIcon/></Link>
                <div className='flex flex-row align-middle h-max my-auto'>
                    <Link className='default_style p-2 rounded-full  hover:bg-white hover:bg-opacity-25' to='/sign_up'><LoginIcon/></Link>
                    <p className=' w-max h-max my-auto'>|</p>
                    <button className='default_style p-2 rounded-full  hover:bg-white hover:bg-opacity-25' onClick={handleLogout}><LogoutIcon/></button>
                </div>
            </div>

        </div>
    </div>
  )

}

export default Header