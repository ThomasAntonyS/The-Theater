import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import PageLayout from '../Components/PageLayout';
import { FaAngleRight } from "react-icons/fa6";

const ProductionPage = () => {
    const { companyId, page_no } = useParams();
    
    const [movies, setMovies] = useState([]);
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const backendBaseUrl = import.meta.env.VITE_API_BASE;

    useEffect(() => {
        fetchProductionData();
        window.scrollTo(0, 0);
    }, [companyId, page_no]);

    const fetchProductionData = async () => {
        setLoading(true);
        try {
            // Fetch both Company Details and Movies in parallel
            const [companyRes, moviesRes] = await Promise.all([
                fetch(`${backendBaseUrl}/api/company/${companyId}`),
                fetch(`${backendBaseUrl}/api/production/${companyId}/page/${page_no}`)
            ]);

            const companyData = await companyRes.json();
            const moviesData = await moviesRes.json();

            if (companyData) {
                setCompany(companyData);
                document.title = `${companyData.name} — The Theater`;
            }

            if (moviesData.results) {
                setMovies(moviesData.results);
                setTotalPages(moviesData.total_pages > 500 ? 500 : moviesData.total_pages);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#050505] min-h-screen font-manrope">
            <Header />
            
            <main className="pt-[15vh]">
                {company && (
                    <div className="relative w-full overflow-hidden mb-20">

                        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-8 md:gap-12">
                                    
                                <div className=" pb-2 flex-1">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-600/30 bg-red-600/10 mb-4">
                                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
                                        <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Official Studio Archive</span>
                                    </div>
                                    
                                    <h1 className="flex flex-wrap items-start text-5xl md:text-8xl font-black italic uppercase tracking-tight text-white">
                                        {company.name.split(" ")[0]} 
                                        <span className="text-red-600 ml-0 sm:ml-3">
                                            {company.name.split(" ").slice(1).join(" ")}
                                        </span>
                                    </h1>
                                    
                                    <div className="flex flex-wrap items-center gap-6 mt-6 text-white font-nunito font-bold uppercase tracking-widest text-sm">
                                        {company.headquarters && (
                                            <p className="flex items-center gap-2">
                                                <span className="text-red-600 font-black">HQ:</span> {company.headquarters}
                                            </p>
                                        )}
                                        {company.homepage && (
                                            <a 
                                                href={company.homepage} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="group flex items-center gap-1 text-white hover:text-red-600 transition-colors"
                                            >
                                                <span className="text-red-600 font-black">Visit:</span>
                                                <span>Official Website</span>
                                                <span className="group-hover:translate-x-1 transition-transform"><FaAngleRight className=' h-max my-auto'/></span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                                    
                            <div className="relative w-full h-px bg-white/5 mt-6 overflow-hidden">
                                <div className="absolute inset-0 w-2/3 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-shimmer"></div>
                            </div>
                        </div>
                    </div>
                )}

                <PageLayout 
                    movies={movies}
                    path={`production/${companyId}`}
                    pageCount={page_no}
                    totalPages={totalPages}
                    loading={loading}
                    isTV={false}
                />
            </main>

            <Footer />
        </div>
    );
};

export default ProductionPage;