import { useEffect, useState } from 'react';
import { Tailspin } from 'ldrs/react';
import { East, West } from '@mui/icons-material';

const Video = ({ id }) => {
  const [videoData, setVideoData] = useState([]);
  const [error, setError] = useState(false);
  const [loadedIframes, setLoadedIframes] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const TMDB_URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(TMDB_URL);
        const data = await response.json();
        const trailers = data.results.filter(video => video.type === 'Trailer');
        const otherVideos = data.results.filter(video => video.type !== 'Trailer');
        const combinedVideos = [...trailers.slice(0, 1), ...otherVideos.slice(0, 14), ...trailers.slice(1)];

        setVideoData(combinedVideos);
        setLoadedIframes(new Array(combinedVideos.length).fill(false)); // Initialize loader state
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVideoData();
  }, [id]);

  const handleIframeLoad = (index) => {
    setLoadedIframes(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  return (
    <>
      {error && (
        <div className="text-red-500 text-center mt-10">Failed to load videos: {error}</div>
      )}

      {videoData.length !== 0 && (
        <div className="relative mb-16 w-full px-4 sm:px-8 lg:px-12 mx-auto" data-aos="fade-right" data-aos-duration="1000">
          <p className="text-white text-2xl font-manrope sm:text-3xl md:text-4xl mb-6">
            Official Trailer & More
          </p>

          <div className="flex overflow-x-auto space-x-4 no-scrollbar">
            {videoData.map((video, index) => (
              <div
                key={video.id}
                className="relative flex-shrink-0 w-full sm:w-1/2 md:w-1/2 xl:w-1/4 h-[30vh] xl:h-[25vh] rounded-lg overflow-hidden bg-black"
              >
                {!loadedIframes[index] && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-80">
                    <Tailspin size={35} stroke={4} speed={0.9} color="white" />
                  </div>
                )}

                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => handleIframeLoad(index)}
                  className={`rounded-lg w-full h-full transition-opacity duration-500 ease-in-out ${
                    loadedIframes[index] ? 'opacity-100' : 'opacity-0'
                  }`}
                ></iframe>
              </div>
            ))}
          </div>

          <p className="font-manrope w-max mx-auto mt-4">
            <West style={{ marginRight: '10px' }} /> Swipe <East style={{ marginLeft: '10px' }} />
          </p>
        </div>
      )}
    </>
  );
};

export default Video;
