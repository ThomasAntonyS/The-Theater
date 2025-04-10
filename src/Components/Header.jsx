import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Logo from '../assets/Logo.png'
import { ProfileContext } from '../Context/ProfileContextProvider';

const Header = () => {

    const {setUserName,setUserEmail,setUserWatchlist,setLoggedIn,loggedIn} = useContext(ProfileContext)

    function handleLogout(){
        setLoggedIn(false)
        setUserName(' ')
        setUserEmail(' ')
        setUserWatchlist([])
        if(loggedIn){
            alert('Logout Sucessful')
        }
    }

  return (
    <div>
        <div className="fixed top-0 flex align-middle justify-between h-[10vh] w-[100vw] overflow-x-hidden bg-black bg-opacity-60 z-[100] px-4">

            <div className="hidden lg:flex gap-2 text-white">
                <Link className='default_style hover:opacity-70' to='/popular'>Popular</Link>
                <span className='h-max my-auto'>|</span>
                <Link className='default_style hover:opacity-70' to='/top_rated'>Top-Rated</Link>
                <span className='h-max my-auto'>|</span>
                <Link className='default_style hover:opacity-70' to='/upcoming'>Upcoming</Link>
            </div>

            <div className=" flex align-middle h-max my-auto text-white font-bold">
                <a href='/'><img src={Logo} alt="Logo" className=' h-[2vh] lg:h-[4vh] lg:-mx-6 '/></a>
            </div>

            <div className=" flex text-white">
                <Link className='default_style p-2 rounded-full hover:bg-white hover:bg-opacity-25' to='/search'>
                {(window.screen.width<640)?<SearchIcon fontSize='small' /> : <SearchIcon/>}
                </Link> 

                <Link className='default_style p-2 rounded-full  hover:bg-white hover:bg-opacity-25' to='/watchlist'>
                {(window.screen.width<640)?<LiveTvIcon fontSize='small'/> : <LiveTvIcon/>}
                </Link>

                <div className='LogIn_Out_section flex flex-row align-middle h-max my-auto'>
                    <Link className='default_style p-2 rounded-full  hover:bg-white hover:bg-opacity-25' to='/sign_up'>
                    {(window.screen.width<640)?<LoginIcon fontSize='small'/> : <LoginIcon/>}
                    </Link>

                    <p className=' w-max h-max my-auto'>|</p>

                    <button className='default_style p-2 rounded-full  hover:bg-white hover:bg-opacity-25' onClick={handleLogout}>
                    {(window.screen.width<640)?<LogoutIcon fontSize='small'/> : <LogoutIcon/>}
                    </button>
                </div>
            </div>

        </div>
    </div>
  )

}

export default Header