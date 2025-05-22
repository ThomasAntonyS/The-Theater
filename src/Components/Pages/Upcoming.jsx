import React, { useEffect, useState } from 'react'
import PageLayout from '../PageLayout';
import Header from '../Header'
import Footer from '../Footer';

const Upcoming = () => {
    const [pageCount, setPageCount] = useState(1);
    const [movie, setMovie] = useState([]);
    const [totalPages, setTotalPages] = useState();

    document.title = "The Theater | Upcoming"

    useEffect(() => {
        getMovies();
        window.scrollTo(0, 0);
    }, [pageCount]);

    const getMovies = async () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const data = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${pageCount}&include_adult=false`);
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
                  title={"On The Horizon"}
                  description={
                    "Stay updated with the latest releases and never miss out on the most anticipated movies hitting the theaters soon. Discover trailers, release dates, and exclusive sneak peeks of upcoming blockbusters."
                  }
                  path={"upcoming"}
                  pageCount={pageCount}
                  setPageCount={setPageCount}
                  totalPages={totalPages}
                />
            </section>

            <Footer />
        </>
    );
};

export default Upcoming;
