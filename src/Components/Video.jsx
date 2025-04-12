import React, { useState, useEffect } from 'react';

function Video({ movieId }) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchVideo();
    }, [movieId]);

    const fetchVideo = async () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US&include_adult=false`);
        const movie = await data.json();
        setVideos(movie.results);
    };

    const src = 'https://www.youtube.com/embed/';

    return (
        <>
            {videos.length > 0 && (
                <div className='relative mb-10'>
                    <p className='font-manrope text-white text-2xl sm:text-3xl md:text-4xl mx-4 sm:mx-[3%] mb-5'>
                        Trailer and Videos
                    </p>
                    <div className='videos flex overflow-x-auto no-scrollbar space-x-6 px-4 sm:px-6 w-[95%] mx-auto'>
                        {videos.map((video) => (
                            video && (
                                <div
                                    key={video.id}
                                    className=' flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] aspect-video rounded-xl overflow-hidden'
                                >
                                    <iframe
                                        title={video.name}
                                        src={src + video.key}
                                        allowFullScreen
                                        frameBorder="0"
                                        className='w-full h-full'
                                    />
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Video;
