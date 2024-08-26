import React from 'react'

const MoviesPage = ({movies}) => {

    const baseImage = 'https://image.tmdb.org/t/p/w185'

    return (
    
        <div className='MoviePage_Card flex flex-col overflow-hidden w-[100vw] mx-auto'>

            <p className=' text-white w-max text-4xl mx-auto mt-[10vh] mb-[3vh]'>Collection Of All Movies</p>
            <p className=' text-white w-[75%] text-1xl mx-auto mb-[7vh] text-center'>A comprehensive collection of all movies, meticulously curated and organized, offers an extensive archive of cinematic masterpieces, spanning various genres, eras, and cultures, providing an invaluable resource for film enthusiasts.</p>
    
            <div className="content flex flex-col w-max overflow-hidden mx-auto">
                {movies!=[] ? (
                <div className=' flex w-[85vw] overflow-x-hidden overflow-y-hidden mx-auto my-3'>
                    <div className='flex flex-wrap'>
                        {movies.map((movie, index) => (
                            <div key={index} className='Moviecard_main relative flex flex-wrap h-[50vh] w-[13vw] my-4 mx-[30px]'>
                                <img src={baseImage + movie.poster_path} alt={movie.title} className=' h-[70%] w-fill object-fill rounded-[10px]'/>
                                <p className=' text-white text-[1rem] ml-1 mt-[-20px]'>{movie.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) :
                <p className=' text-white text-2xl'>Loading...</p>
            }
            </div>

        </div>
      )
    
}

export default MoviesPage