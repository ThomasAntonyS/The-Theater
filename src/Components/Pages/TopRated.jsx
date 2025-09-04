import { useState, useEffect } from 'react'
import PageLayout from '../PageLayout';
import Header from '../Header'
import Footer from '../Footer';
import { useParams, useNavigate} from 'react-router-dom';

const TopRated = () => {
    const [pageCount, setPageCount] = useState(1);
    const [movie, setMovie] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [loading,setLoading] = useState(false)

    document.title = "The Theater | Top Rated"
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
              navigate("/*", {replace:true})
              return
            } 
            setPageCount(page_no)
            const apiKey = import.meta.env.VITE_API_KEY;
            const data = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page_no}&include_adult=false`);
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
                    title={"Best Of All Times"}
                    description={
                        "Explore our selection of top-rated movies, handpicked from popular genres, showcasing the best in storytelling, acting, and cinematic artistry. Perfect for movie enthusiasts looking for the highest-rated films."
                    }
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
