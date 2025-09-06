import React, { useEffect, useState } from 'react';
import PageLayout from '../Components/PageLayout';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useParams, useNavigate } from 'react-router-dom';

const Popular = () => {
    const [pageCount, setPageCount] = useState(1);
    const [movie, setMovie] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(false);

    document.title = "The Theater | Popular";
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
            const data = await fetch(`${import.meta.env.VITE_API_BASE}/api/movies/popular/page/${page_no}`);
            const response = await data.json();
            
            if (data.status === 500) {
                console.error("Backend error:", response.error);
                setLoading(false);
                return;
            }

            if (page_no > response.total_pages || page_no < 1) {
                navigate("/*");
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
                    title={"Most Liked"}
                    description={"A comprehensive collection of all movies, meticulously curated and organized, offers an extensive archive of cinematic masterpieces, spanning various genres, eras, and cultures, providing an invaluable resource for film enthusiasts."}
                    path={"popular"}
                    pageCount={pageCount}
                    totalPages={totalPages}
                    loading={loading}
                />
            </section>
            <Footer />
        </>
    );
};

export default Popular;