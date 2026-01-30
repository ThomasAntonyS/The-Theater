import { useEffect, useState } from 'react';
import { FiPlay, FiYoutube } from 'react-icons/fi';

const Video = ({ id }) => {
    const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeVideo, setActiveVideo] = useState(null);

    const TMDB_URL = `${import.meta.env.VITE_API_BASE}/api/movie/${id}/videos`;

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await fetch(TMDB_URL);
                const data = await response.json();
                
                if (response.status === 200) {
                    const trailers = data.results.filter(v => v.type === 'Trailer');
                    const others = data.results.filter(v => v.type !== 'Trailer');
                    setVideoData([...trailers, ...others].slice(0, 10));
                }
            } catch (err) {
                console.error("Video Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchVideoData();
    }, [id]);

    if (!loading && videoData.length === 0) return null;

    return (
        <section className="relative w-full py-12 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
            <div className="flex items-end justify-between mb-10 border-l-4 border-red-600 pl-6">
                <div>
                    <p className="font-manrope font-bold text-white/70 text-[10px] tracking-[0.1em] uppercase mb-1">
                        Multimedia
                    </p>
                    <h2 className="text-3xl md:text-5xl font-manrope font-black italic uppercase tracking-tighter text-white">
                        Trailer & <span className="text-red-600">Video's</span>
                    </h2>
                </div>
                <div className="hidden md:flex items-center gap-2 text-white/20 font-manrope text-[10px] uppercase tracking-widest">
                    <FiYoutube /> <span>YouTube Originals</span>
                </div>
            </div>

            <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x">
                {videoData.map((video) => (
                    <div
                        key={video.id}
                        className="group relative flex-shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[30%] aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 snap-center transition-all duration-500 hover:border-red-600/50"
                    >
                        {activeVideo === video.key ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
                                title={video.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        ) : (
                            <div 
                                className="relative w-full h-full cursor-pointer group"
                                onClick={() => setActiveVideo(video.key)}
                            >
                                <img 
                                    src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                                    alt={video.name}
                                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                                />
                                
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all duration-300 group-hover:scale-125 group-hover:bg-white group-hover:text-black">
                                        <FiPlay size={28} className="ml-1" />
                                    </div>
                                </div>

                                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent">
                                    <p className="text-[10px] font-manrope font-black text-red-600 uppercase tracking-widest mb-1">
                                        {video.type}
                                    </p>
                                    <h3 className="text-white font-manrope font-bold text-sm md:text-base uppercase italic tracking-tighter truncate">
                                        {video.name}
                                    </h3>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 opacity-70">
                <div className="h-[1px] w-12 bg-white"></div>
                <span className="text-[9px] font-manrope font-black uppercase tracking-[0.2em] text-white">Slide to Explore</span>
                <div className="h-[1px] w-12 bg-white"></div>
            </div>
        </section>
    );
};

export default Video;