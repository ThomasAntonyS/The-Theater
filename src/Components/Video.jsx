import { useEffect, useState } from 'react';
import { Tailspin } from 'ldrs/react';
import { East, West } from '@mui/icons-material';

const Video = ({ id }) => {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const TMDB_URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(TMDB_URL);
        const data = await response.json();
        const trailers = data.results.filter(video => video.type === 'Trailer');
        const otherVideos = data.results.filter(video => video.type !== 'Trailer');
        
        setVideoData(()=>[...trailers.slice(0, 1), ...otherVideos.slice(0, 14), ...trailers.slice(1)]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [id]);



  return (
    <>
    {videoData.length != 0 ?
      <div className="relative mb-16 w-full px-4 sm:px-8 lg:px-12 mx-auto" data-aos="fade-right" data-aos-duration="1000">
        <p className="text-white text-2xl font-manrope sm:text-3xl md:text-4xl mb-6">Official Trailer & More</p>
        <div className="flex overflow-x-auto space-x-4 no-scrollbar">
          {loading?
            <div className="w-full h-screen mt-[10vh] flex items-start justify-center bg-black">
              <Tailspin size={50} stroke={5} speed={0.9} color="white" />
            </div>
            :
            <>
            {videoData.map((video) => (
              <div key={video.id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/2 xl:w-1/4">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg  h-[30vh] xl:h-[25vh] "
                ></iframe>
              </div>
            ))}
            </>
          }
        </div>
        <p className=' font-manrope w-max mx-auto mt-4'><West style={{marginRight:"10px"}}/> Swipe <East style={{marginLeft:"10px"}}/></p>
      </div>
      :
      null
    }
    </>
  );
};

export default Video;
