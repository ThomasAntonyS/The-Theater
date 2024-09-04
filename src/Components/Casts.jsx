import React, {useState, useEffect} from 'react'
import PersonIcon from '@mui/icons-material/Person';

function Casts({movieId}) {
    const [casts, setCasts] = useState([])
    const fetchCast = async () => {
        const apiKey = process.env.REACT_APP_API_KEY
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`);
        const casts = await data.json();
        setCasts(casts.cast);
    } 
    useEffect(() => { 
        fetchCast()
    }, [movieId])
    const baseImage = 'https://image.tmdb.org/t/p/w185'
    return (
        <>
        {
            (casts.length > 0) ?
            <div className='Casts mb-16'>
            <p className='Casts_card_title text-white text-4xl mx-[6%] '>Cast</p>
            <div className=' flex overflow-x-scroll overflow-y-hidden w-[90%] mx-auto mt-5'>
                {casts.map((cast) => (
                    <div className='Casts_card flex flex-wrap text-white w-[13vw] mx-3' key={cast.id}>
                        {
                            (cast.profile_path) ? 
                            <img src={baseImage + cast.profile_path} alt={cast.title} className=' h-[65%] w-full object-fill rounded-[10px]'/>
                            :
                            <p className=' h-[65%] flex justify-center align-middle'><PersonIcon style={{fontSize:"10rem",margin:'auto'}}/></p>
                        }
                        
                        <p className='Casts_card_data ml-2'><i>Actor:</i> {cast.original_name}</p>
                        <p className='Casts_card_data ml-2'><i>Role: </i>{(cast.character)? cast.character : "NA"}</p>
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