import React, { useEffect, useState } from 'react'
import PageLayout from '../PageLayout';
import Header from '../Header'
import Footer from '../Footer';
import { useParams, useNavigate} from 'react-router-dom';

const Upcoming = () => {
    const [pageCount, setPageCount] = useState(1);
    const [movie, setMovie] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [loading,setLoading] = useState(false)

    document.title = "The Theater | Upcoming"
    const param = useParams()
    const navigate = useNavigate()

    const {page_no} = param

    useEffect(() => {
        getMovies();
        window.scrollTo(0, 0);
    }, [page_no]);

    const getMovies = async () => {
        try {
            setLoading(true)
            if(page_no>totalPages || page_no<1){
                navigate("/*", {replace:true})
                return
            } 
            setPageCount(page_no)
            const apiKey = import.meta.env.VITE_API_KEY;
            const data = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page_no}&include_adult=false`);
            const response = await data.json();
            setMovie(response.results);
            setTotalPages(response.total_pages);
        } catch (err) {
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
                  title={"On The Horizon"}
                  description={
                    "Stay updated with the latest releases and never miss out on the most anticipated movies hitting the theaters soon. Discover trailers, release dates, and exclusive sneak peeks of upcoming blockbusters."
                  }
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
