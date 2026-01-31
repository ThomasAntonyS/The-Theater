import React, { useState, useEffect, useRef } from 'react';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Reviews = ({ movieId }) => {
    const [reviews, setReviews] = useState([]);
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = direction === 'left' ? -400 : 400;
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/movie/${movieId}/reviews`);
                const data = await res.json();
                setReviews(data.results?.slice(0, 8) || []);
            } catch (error) {
                console.error(error);
            }
        };
        fetchReviews();
    }, [movieId]);

    if (reviews.length === 0) return null;

    return (
        <section className="space-y-8 relative group max-w-[1400px] mx-auto px-6 md:px-12 py-16">
            <div className="flex items-center justify-between pr-4">
                <h2 className="text-3xl font-manrope font-black italic uppercase tracking-tighter border-l-4 border-red-600 pl-5">
                    Critical Response
                </h2>
                <div className="flex gap-2">
                    <button onClick={() => scroll('left')} className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-red-600 transition-all">
                        <KeyboardArrowLeftIcon />
                    </button>
                    <button onClick={() => scroll('right')} className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-red-600 transition-all">
                        <KeyboardArrowRightIcon />
                    </button>
                </div>
            </div>

            <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {reviews.map((review) => (
                    <div 
                        key={review.id} 
                        className="min-w-[320px] md:min-w-[400px] snap-start p-8 rounded-2xl border border-white/50 bg-white/[0.02] space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold">
                                {review.author[0]}
                            </div>
                            <div>
                                <p className="text-sm font-manrope font-black uppercase tracking-wider">{review.author}</p>
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} sx={{ fontSize: 12 }} />)}
                                </div>
                            </div>
                        </div>
                        <p className="text-sm font-nunito text-white/70 italic line-clamp-5 leading-relaxed">
                            "{review.content}"
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Reviews;
