import { useState, useEffect } from 'react';
import PageLayout from '../Components/PageLayout';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useParams, useNavigate } from 'react-router-dom';

const TopRated = () => {
    const [pageCount, setPageCount] = useState(1);
    const [movie, setMovie] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(false);

    document.title = "The Theater | Top Rated";
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
            const data = await fetch(`${import.meta.env.VITE_API_BASE}/api/movies/top_rated/page/${page_no}`);
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
                    title={"Best Of All Times"}
                    description={"Explore our selection of top-rated movies, handpicked from popular genres, showcasing the best in storytelling, acting, and cinematic artistry. Perfect for movie enthusiasts looking for the highest-rated films."}
                    path={"top_rated"}
                    pageCount={pageCount}
                    totalPages={totalPages}
                    loading={loading}
                />
            </section>
            <Footer />
        </>
    );
};

export default TopRated;