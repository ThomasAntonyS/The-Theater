import React, { useState, useEffect } from 'react'

function Video({moviedId}) {

    const [videos, setVideos] = useState([])

    useEffect(() => {
        fetchVideo()
    }, [])

    const fetchVideo = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${moviedId}/videos?api_key=3a1152dfeee6a71281e7628c90d5e229&language=en-US`);
        const movie = await data.json();
        setVideos(movie.results)
        console.log(videos);
    }

    const src = 'https://www.youtube.com/embed/' 

    return (
        <>
            <p className=' text-white text-4xl mx-[6%] mb-10 '>Trailer</p>
            <div className='videos'>
                {
                   
                }
            </div>
            
         </>
    )
}
{/*
     videos.map((video) => (
                            <div key={video.id} className='trailer'>
                            <iframe width='1000'
                                height='600'
                                title={video.name}
                                key={video.id}
                                src={src + video.key}
                                allowFullScreen
                                frameorder="0"></iframe>
                            </div>
                        ))
 */}

export default Video