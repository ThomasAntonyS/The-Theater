import React from 'react'
import { useParams } from 'react-router-dom'

const CastMovies = () => {

    const {id} = useParams()

    return (
        <div className=' text-white'>CastMovies:{id}</div>
    )
}

export default CastMovies