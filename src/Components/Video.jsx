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
                <div className=' mb-16'>
                    <p className=' text-white text-4xl mx-[6%] mb-5 '>Trailer</p>
                    <div className='videos flex overflow-x-scroll overflow-y-hidden h-[50vh] w-[90%] mx-auto'>
                    {
                    videos.map((video) => (
                        (video) ?
                        <div key={video.id} className='trailer mr-3'>
                            <iframe
                                title={video.name}
                                key={video.id}
                                src={src + video.key}
                                allowFullScreen
                                frameorder="0"
                                className=' h-full w-[30vw]'
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