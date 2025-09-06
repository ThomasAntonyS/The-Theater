import React, { useEffect, useState } from 'react';
import PageLayout from '../Components/PageLayout';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useParams, useNavigate } from 'react-router-dom';

const Trending = () => {
    const [pageCount, setPageCount] = useState(1);
    const [movie, setMovie] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(false);

    document.title = "The Theater | Trending";
    const param = useParams();
    const navigate = useNavigate();

    const { page_no } = param;

    useEffect(() => {
        getTrendingMovies();
        window.scrollTo(0, 0);
    }, [page_no]);

    const getTrendingMovies = async () => {
        try {
            setLoading(true);
            const data = await fetch(`${import.meta.env.VITE_API_BASE}/api/movies/trending/page/${page_no}`);
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
        } catch (error) {
            console.error("Error fetching trending movies:", error);
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
                    title={"Trending Movies"}
                    description={"Discover what's hot and happening in the cinematic world right now. This collection features the most popular and talked-about movies, updated daily to keep you in sync with the latest trends."}
                    path={"trending"}
                    pageCount={pageCount}
                    totalPages={totalPages}
                    loading={loading}
                />
            </section>
            <Footer />
        </>
    );
};

export default Trending;