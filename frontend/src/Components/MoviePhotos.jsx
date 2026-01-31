import { useState, useEffect, useRef } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Photos = ({ movieId }) => {
    const [images, setImages] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/movie/${movieId}/images`);
                const data = await res.json();
                setImages(data.backdrops || []);
            } catch (error) {
                console.error(error);
            }
        };
        fetchImages();
    }, [movieId]);

    const scroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const chunks = [];
    for (let i = 0; i < images.length; i += 6) {
        chunks.push(images.slice(i, i + 6));
    }

    if (images.length === 0) return null;

    return (
        <section className="py-16 space-y-8 max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                <h2 className="text-3xl md:text-5xl font-manrope font-black italic uppercase tracking-tighter border-l-4 border-red-600 pl-6">
                    Visual Gallery
                </h2>
                
                <div className="flex gap-2">
                    <button 
                        onClick={() => scroll('left')} 
                        className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-red-600 transition-all duration-300 active:scale-95"
                    >
                        <KeyboardArrowLeftIcon className="text-white" />
                    </button>
                    <button 
                        onClick={() => scroll('right')} 
                        className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-red-600 transition-all duration-300 active:scale-95"
                    >
                        <KeyboardArrowRightIcon className="text-white" />
                    </button>
                </div>
            </div>

            <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide snap-x "
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {chunks.map((chunk, slideIndex) => (
                    <div 
                        key={slideIndex} 
                        className="min-w-full shrink-0 snap-start grid grid-cols-2 md:grid-cols-3 gap-4"
                    >
                        {chunk.map((img, imgIndex) => (
                            <div 
                                key={imgIndex} 
                                className="relative overflow-hidden rounded-xl aspect-video border border-white/10 bg-zinc-900 group"
                            >
                                <img 
                                    src={`https://image.tmdb.org/t/p/w780${img.file_path}`} 
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                    alt="Movie Still"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Photos;