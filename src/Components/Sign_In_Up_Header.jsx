import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

const Sign_In_Up_Header = () => {

  return (
    <div className=' w-full h-[7vh] flex absolute top-0 bg-black bg-opacity-70'>
      <Link to={'/'} className='blink_animation flex align-middle w-max m-auto text-white font-bold'><HomeIcon style={{marginRight:'10px'}}/>BACK TO HOME</Link>
    </div>

  )
}

export default Sign_In_Up_Header