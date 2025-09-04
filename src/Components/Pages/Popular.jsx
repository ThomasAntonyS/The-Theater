import React, { useEffect, useState } from 'react'
import PageLayout from '../PageLayout';
import Header from '../Header';
import Footer from '../Footer';
import { useParams, useNavigate } from 'react-router-dom';

const Popular = () => {
    const [pageCount, setPageCount] = useState(1);
    const [movie, setMovie] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [loading,setLoading] = useState(false)

    document.title = "The Theater | Popular"
    const param = useParams()
    const navigate = useNavigate()

    const {page_no} = param

    useEffect(() => {
        getMovies();
        window.scrollTo(0, 0);
    }, [page_no]);

    const getMovies = async () => {
        try{
            setLoading(true)
            if(page_no>totalPages || page_no<1){
                navigate("/*")
                return
            }
            setPageCount(page_no)
            const apiKey = import.meta.env.VITE_API_KEY;
            const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page_no}&include_adult=false`);
            const response = await data.json();
            setMovie(response.results);
            setTotalPages(response.total_pages);
        }
        catch(err){
            console.error(err)
            setLoading(false)
        }
        finally{
            setLoading(false)
        }
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
                    totalPages={totalPages}
                    loading={loading}
                />
            </section>

            <Footer />
        </>
    );
};

export default Popular;
