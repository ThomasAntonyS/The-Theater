import React, { useState, useEffect } from 'react'

function Video({movieId}) {

    const [videos, setVideos] = useState([])

    useEffect(() => {
        fetchVideo()
    }, [movieId])

    const fetchVideo = async () => {
        const apiKey = process.env.REACT_APP_API_KEY
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`);
        const movie = await data.json();
        setVideos(movie.results)
    }

    const src = 'https://www.youtube.com/embed/' 

    return (
        <>
        {
            (videos.length > 0) ?
                <div className='relative mb-10  '>
                    <p className='Videos_title text-white text-4xl mx-[6%] mb-5 '>Trailer and Videos</p>
                    <div className='videos flex flex-row overflow-x-scroll overflow-y-hidden h-[50vh] w-[90%] mx-auto'>
                    {
                    videos.map((video) => (
                        (video) ?
                        <div key={video.id} className='trailers mr-6'>
                            <iframe
                                title={video.name}
                                key={video.id}
                                src={src + video.key}
                                allowFullScreen
                                frameorder="0"
                                className='trailer h-full w-[40vw]'
                            />
                        </div>
                        :
                        <p className=' text-white'>Loading...</p>

                        ))
                    }
                    </div>
            
                </div>
            :
            null
        }
        </>
    )
}

export default Video