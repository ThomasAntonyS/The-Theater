import React, { useEffect, useState } from 'react'
import PageLayout from '../PageLayout';
import Header from '../Header';
import Footer from '../Footer';

const Popular = () => {
    const [pageCount, setPageCount] = useState(1);
    const [movie, setMovie] = useState([]);
    const [totalPages, setTotalPages] = useState();

    document.title = "The Theater | Popular"

    useEffect(() => {
        getMovies();
        window.scrollTo(0, 0);
    }, [pageCount]);

    const getMovies = async () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageCount}&include_adult=false`);
        const response = await data.json();
        setMovie(response.results);
        setTotalPages(response.total_pages);
    };

    return (
        <>
            <Header />

            <section>
                <PageLayout
                    movies={movie}
                    title={"Most Liked"}
                    description={
                        "A comprehensive collection of all movies, meticulously curated and organized, offers an extensive archive of cinematic masterpieces, spanning various genres, eras, and cultures, providing an invaluable resource for film enthusiasts."
                    }
                    path={"popular"}
                    pageCount={pageCount}
                    setPageCount={setPageCount}
                    totalPages={totalPages}
                />
            </section>

            <Footer />
        </>
    );
};

export default Popular;
