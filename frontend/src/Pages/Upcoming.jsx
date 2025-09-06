import React, { useEffect, useState } from 'react';
import PageLayout from '../Components/PageLayout';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useParams, useNavigate } from 'react-router-dom';

const Upcoming = () => {
    const [pageCount, setPageCount] = useState(1);
    const [movie, setMovie] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(false);

    document.title = "The Theater | Upcoming";
    const param = useParams();
    const navigate = useNavigate();

    const { page_no } = param;

    useEffect(() => {
        getMovies();
        window.scrollTo(0, 0);
    }, [page_no]);

    const getMovies = async () => {
        try {
            setLoading(true);
            const data = await fetch(`${import.meta.env.VITE_API_BASE}/api/movies/upcoming/page/${page_no}`);
            const response = await data.json();

            if (data.status === 500) {
                console.error("Backend error:", response.error);
                setLoading(false);
                return;
            }

            if (page_no > response.total_pages || page_no < 1) {
                navigate("/*", { replace: true });
                return;
            }

            setPageCount(page_no);
            setMovie(response.results);
            setTotalPages(response.total_pages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <section>
                <PageLayout
                    movies={movie}
                    title={"On The Horizon"}
                    description={"Stay updated with the latest releases and never miss out on the most anticipated movies hitting the theaters soon. Discover trailers, release dates, and exclusive sneak peeks of upcoming blockbusters."}
                    path={"upcoming"}
                    pageCount={pageCount}
                    totalPages={totalPages}
                    loading={loading}
                />
            </section>
            <Footer />
        </>
    );
};

export default Upcoming;