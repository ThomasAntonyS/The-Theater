import React, {useState, useEffect} from 'react'
import NotFoundImage from '../assets/cast_notFound.webp'

function Casts({movieId}) {
    const [casts, setCasts] = useState([])
    const fetchCast = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=3a1152dfeee6a71281e7628c90d5e229&language=en-US`);
        const casts = await data.json();
        setCasts(casts.cast);
    } 
    useEffect(() => {
        fetchCast()
    }, [])
    const baseImage = 'https://image.tmdb.org/t/p/w185'
    return (
        <>
        <p className=' text-white text-4xl mx-[6%] mb-10 '>Cast</p>
        {
            (casts) ?
            <div className='casts'>
            <div className='flex overflow-x-scroll overflow-y-hidden w-[90%] mx-auto'>
                {casts.map((cast) => (
                    <div className='flex flex-wrap text-white w-[13vw] mx-3'>
                        {
                            (cast.profile_path) ? 
                            <img src={baseImage + cast.profile_path} alt={cast.title} className=' h-[65%] w-fill object-fill rounded-[10px]'/>
                            :
                            <img src={NotFoundImage} alt={cast.original_name} className=' h-[65%] w-fill object-fill rounded-[10px]'/>
                        }
                        
                        <p className=' ml-2'><i>Actor:</i> {cast.original_name}</p>
                        <p className=' ml-2'><i>Role:</i> {cast.character}</p>
                    </div>
                ))}
            </div>
            </div>
            :
            <p>Loading</p>
        }
        </>
    )
}

export default Casts