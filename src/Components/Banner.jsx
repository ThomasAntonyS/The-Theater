import React, { useState } from 'react'
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import Banner_1 from '../assets/Banner_1.mp4'
import Banner_2 from '../assets/Banner_2.mp4'
import Banner_3 from '../assets/Banner_3.mp4'
import Banner_4 from '../assets/Banner_4.mp4'
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { Link } from 'react-router-dom';

const Banner = () => {

    const [count,setCount] = useState(0)

    const BannerMovies = [
        {
            title:'Dune: Part Two',
            desc:'The epic saga continues as Paul Atreides faces political intrigue, mystical powers and the desert planet Arrakis, where spice flows like liquid gold.',
            video:Banner_1,
            link:'movie/693134'
        },
        {
            title:'12th Fail ',
            desc:'A heartfelt coming-of-age story set in India. A young student grapples with academic pressures, societal expectations, and the pursuit of dreams.',
            video:Banner_2,
            link:'movie/1163258'
        },
        {
            title:'Oppenheimer',
            desc:'A gripping historical drama centered around J. Robert Oppenheimer, the brilliant physicist behind the development of the atomic bomb during World War II. ',
            video:Banner_3,
            link:'movie/872585'
        },
        {
            title:'Spider-Man: Across the Spider-Verse',
            desc:'An animated adventure that transcends dimensions. Follow Miles Morales as he encounters alternate versions of Spider-Man, unraveling a web of multiverse mysteries.',
            video:Banner_4,
            link:'movie/569094'
        }
    ]

    const handleLeftClick = () => {
        if(count===0)
            setCount((BannerMovies.length)-1)
        else
            setCount(count-1)
    }

    const handleRightClick = () => {
        if(count===BannerMovies.length-1)
            setCount(0)
        else
            setCount(count+1)
    }

  return (
    <div className='Banner_main relative h-[100vh] w-[100vw] overflow-x-hidden'>

        <div className="Banner_ImageSlider absolute h-full w-full justify-between">
            <button onClick={handleLeftClick} 
            className='absolute top-[40%] left-10 transform -translate-x-1/2 -translate-y-1/2 w-max h-max text-white text-3xl px-4 py-2 rounded-full bg-black bg-opacity-45'><WestIcon fontSize='small'/></button>

            <video src={BannerMovies[count].video} alt={BannerMovies[count].title} autoPlay className=' absolute object-cover h-full w-full -z-10' />

            <button onClick={handleRightClick} 
            className='Right_button absolute top-[40%] right-0 transform -translate-x-1/2 -translate-y-1/2 w-max h-max text-white text-3xl px-4 py-2 rounded-full bg-black bg-opacity-45'><EastIcon fontSize='small'/></button>
        </div>

        <div className="Banner_Data absolute w-[30%] h-[30%] bottom-[24%] ml-6">
            <p className='Banner_Movie_Label text-white h-max w-max px-4 py-2 bg-black bg-opacity-50 rounded-full'>New Movie</p>
            <p className='Banner_Movie_Title text-white h-max w-max text-3xl mt-2'>{BannerMovies[count].title}</p>
            <p className='Banner_Movie_Description text-white block overflow-hidden h-[45%] w-[105%] mt-2'>{BannerMovies[count].desc}</p>

            <div className=' mt-2'>
                <button className='Banner_Movie_Watch h-max w-max bg-white text-black rounded-full px-4 py-2'><PlayCircleOutlineRoundedIcon style={{fontSize:'1.1rem',margin:'auto 5px',marginTop:'-2px'}}/>Watch Movie</button>
                <Link to={BannerMovies[count].link} className='Banner_Movie_Info text-white h-max w-max bg-white bg-opacity-30 rounded-full mx-2 px-4 py-2'>More Info <span className=' text-1xl'><EastIcon fontSize='small'/></span></Link>
            </div>
        </div>

        <div className="Banner_Pagination absolute flex bottom-[19%] right-5 w-max h-max">
            {
                BannerMovies.map((_,index)=>{
                    return(
                        <div className='Banner_Page_Indicator flex flex-row h-max w-20' key={index}>
                            {
                                (index===count)?
                                <p className='w-[90%] bg-white h-1 rounded-full'></p>
                                :
                                <p className='w-[90%] bg-white bg-opacity-30 h-1 rounded-full'></p>
                            }
                        </div>
                    )
                })
            }
        </div>

    </div>
  )
}

export default Banner