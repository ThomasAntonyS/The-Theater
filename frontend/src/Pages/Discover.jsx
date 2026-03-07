import React, { useState, useEffect, useRef } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import PageLayout from '../Components/PageLayout';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';

const SearchableSelect = ({ label, options, value, onChange, placeholder, displayKey = "name", valueKey = "id" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt =>
        (opt[displayKey] || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedLabel =
        options.find(opt => String(opt[valueKey]) === String(value))?.[displayKey] || placeholder;

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="text-[10px] font-black uppercase tracking-[0.15em] italic text-white/70 mb-1 block">
                {label}
            </label>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-transparent border-b-2 ${isOpen ? 'border-red-600 bg-white/[0.03]' : 'border-white/70'} text-white rounded-t-xl px-3 py-3 text-[12px] font-black uppercase tracking-widest cursor-pointer transition-all flex justify-between items-center`}
            >
                <span className={value ? "text-white" : "text-white/70"}>
                    {selectedLabel}
                </span>
                <KeyboardArrowDownIcon
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-600' : 'text-white/70'}`}
                    fontSize="small"
                />
            </div>

            <div className={`absolute z-[110] w-full bg-[#111] border border-white/70 rounded-b-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="p-3 bg-white/5 flex items-center gap-2">
                    <SearchIcon className="text-white/70" sx={{ fontSize: 17 }} />
                    <input
                        type="text"
                        className="bg-transparent border-none outline-none text-xs text-white w-full font-black uppercase tracking-widest placeholder:text-white/70"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>

                <div className="max-h-[220px] overflow-y-auto custom-scrollbar">
                    <div
                        className="px-5 py-3 text-xs font-black uppercase text-white/70 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => {
                            onChange("");
                            setIsOpen(false);
                            setSearchTerm("");
                        }}
                    >
                        All
                    </div>

                    {filteredOptions.map((opt) => (
                        <div
                            key={opt[valueKey]}
                            className={`px-5 py-3 text-xs font-black uppercase cursor-pointer ${String(value) === String(opt[valueKey]) ? 'bg-red-600 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                            onClick={() => {
                                onChange(opt[valueKey]);
                                setIsOpen(false);
                                setSearchTerm("");
                            }}
                        >
                            {opt[displayKey]}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const RatingSelect = ({ label, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = [
        { label: "Any Rating", value: "" },
        { label: "Masterpiece (8.5+)", value: "8.5" },
        { label: "Must Watch (7.5+)", value: "7.5" },
        { label: "Good (6.5+)", value: "6.5" }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value) || options[0];

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="text-[10px] font-black uppercase tracking-[0.15em] italic text-white/70 mb-1 block">
                {label}
            </label>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-transparent border-b-2 ${isOpen ? 'border-red-600 bg-white/[0.03]' : 'border-white/70'} text-white rounded-t-xl px-3 py-3 text-[12px] font-black uppercase tracking-widest cursor-pointer transition-all flex justify-between items-center`}
            >
                <span className={value ? "text-white" : "text-white/70"}>
                    {selectedOption.label}
                </span>
                <KeyboardArrowDownIcon
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-600' : 'text-white/70'}`}
                    fontSize="small"
                />
            </div>

            <div className={`absolute z-[110] w-full bg-[#111] border border-white/10 rounded-b-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {options.map((opt) => (
                    <div
                        key={opt.value}
                        className={`px-5 py-3 text-xs font-black uppercase cursor-pointer ${value === opt.value ? 'bg-red-600 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                        onClick={() => {
                            onChange(opt.value);
                            setIsOpen(false);
                        }}
                    >
                        {opt.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

const FilterFields = ({ isMobile = false, genresList, languagesList, filters, handleManualChange }) => (
    <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}`}>
        <SearchableSelect
            label="Genre"
            options={genresList}
            value={filters.genre}
            onChange={(val) => handleManualChange('genre', val)}
            placeholder="All Categories"
        />

        <SearchableSelect
            label="Language"
            options={languagesList}
            value={filters.language}
            onChange={(val) => handleManualChange('language', val)}
            placeholder="Global"
            displayKey="english_name"
            valueKey="iso_639_1"
        />

        <RatingSelect
            label="Minimum Rating"
            value={filters.rating}
            onChange={(val) => handleManualChange('rating', val)}
        />

        <div>
            <label className="text-[10px] font-black uppercase tracking-[0.15em] italic text-white/70 mb-3 block">
                Timeline
            </label>
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/70 rounded-2xl overflow-hidden">
                <input
                    type="number"
                    placeholder="From"
                    value={filters.yearStart}
                    onChange={(e) => handleManualChange('yearStart', e.target.value)}
                    className="bg-[#0a0a0a] text-white p-3 text-[11px] font-bold outline-none"
                />
                <input
                    type="number"
                    placeholder="To"
                    value={filters.yearEnd}
                    onChange={(e) => handleManualChange('yearEnd', e.target.value)}
                    className="bg-[#0a0a0a] text-white p-3 text-[11px] font-bold outline-none border-l border-white/70"
                />
            </div>
        </div>
    </div>
);

const Discover = () => {
    const navigate = useNavigate()
    const params = useParams();
    const { page_no } = params;
    const initialPage = page_no ? parseInt(page_no) : 1;
    const [page, setPage] = useState(initialPage);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [genresList, setGenresList] = useState([]);
    const [languagesList, setLanguagesList] = useState([]);
    const [filters, setFilters] = useState({
        genre: '',
        language: '',
        yearStart: '',
        yearEnd: '',
        rating: '',
        sort_by: 'popularity.desc'
    });

    const backendBaseUrl = import.meta.env.VITE_API_BASE;

    useEffect(() => {
        const fetchFilterOptions = async () => {
            const [genreRes, langRes] = await Promise.all([
                fetch(`${backendBaseUrl}/api/genres`),
                fetch(`${backendBaseUrl}/api/languages`)
            ]);
            const genreData = await genreRes.json();
            const langData = await langRes.json();
            setGenresList(genreData.genres || []);
            setLanguagesList((langData || []).sort((a, b) => a.english_name.localeCompare(b.english_name)));
        };
        fetchFilterOptions();
    }, []);

    useEffect(() => {
        const newPage =  parseInt(page_no);
        setPage(newPage);
        fetchMovies(newPage);
    }, [page_no]); 

    const fetchMovies = async (pageOverride) => {
        setLoading(true);
        const currentPage = pageOverride || page;
        const queryParams = new URLSearchParams({ ...filters, page: currentPage }).toString();

        try {
            const response = await fetch(`${backendBaseUrl}/api/discover?${queryParams}`);
            const data = await response.json();
            setMovies(data.results || []);
            setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleManualChange = (name, value) => {
        setPage(1)
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const resetFilters = () => {
        setFilters({
            genre: '',
            language: '',
            yearStart: '',
            yearEnd: '',
            rating: '',
            sort_by: 'popularity.desc'
        });
        setPage(1);
        navigate('/discover/page/1');
    };

    return (
        <div className="bg-[#050505] min-h-screen font-manrope text-white">
            <Header />

            <div className="pt-[14vh] max-w-[1400px] mx-auto">
                <header className="mb-10 px-5 sm:px-6">
                    <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-8">
                        Dis<span className="text-red-600">cover</span>
                    </h1>

                    <div className="hidden lg:block bg-white/[0.02] border border-white/5 p-10 mb-16">
                        <FilterFields
                            genresList={genresList}
                            languagesList={languagesList}
                            filters={filters}
                            handleManualChange={handleManualChange}
                        />
                        <div className="flex gap-4 mt-10">
                            <button
                                onClick={() => {
                                    navigate('/discover/page/1'); 
                                    fetchMovies()
                                }}
                                className=" bg-red-600 px-8 py-4 rounded-2xl font-black uppercase italic tracking-widest text-[12px]"
                            >
                                Apply Filter
                            </button>
                            <button
                                onClick={resetFilters}
                                className="px-8 bg-white/5 border border-white/10 rounded-2xl"
                            >
                                <RestartAltIcon />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setIsMobileFilterOpen(true);
                            document.body.classList.add('overflow-hidden');
                        }}
                        className="lg:hidden w-full flex items-center justify-center gap-3 bg-white text-black p-3 rounded-2xl font-black uppercase text-[11px] tracking-widest"
                    >
                        <FilterListIcon fontSize="small" /> Select Filters
                    </button>
                </header>

                <main className="pb-24">
                    <PageLayout
                        movies={movies}
                        title=""
                        path="discover"
                        pageCount={page}
                        totalPages={totalPages}
                        loading={loading}
                        isTV={false}
                    />
                </main>
            </div>

            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-[200] lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/90"
                        onClick={() => {
                            setIsMobileFilterOpen(false);
                            document.body.classList.remove('overflow-hidden');
                        }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a] rounded-t-[3rem] p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black uppercase">Filters</h2>
                            <button
                                onClick={() => {
                                    setIsMobileFilterOpen(false);
                                    document.body.classList.remove('overflow-hidden');
                                }}
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        <FilterFields
                            isMobile={true}
                            genresList={genresList}
                            languagesList={languagesList}
                            filters={filters}
                            handleManualChange={handleManualChange}
                        />

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button onClick={resetFilters} className="py-3 bg-white/10 rounded-xl">
                                Reset
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/discover/page/1');
                                    fetchMovies();
                                    setIsMobileFilterOpen(false);
                                    document.body.classList.remove('overflow-hidden');
                                }}
                                className="py-3 bg-red-600 rounded-xl font-bold"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Discover;