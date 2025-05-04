import React, { useState } from 'react';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Link } from 'react-router-dom';

import Inception from '../assets/Inception.mp4';
import TopGun from '../assets/TopGun.mp4';
import Interstellar from '../assets/Interstellar.mp4';
import Batman from '../assets/Batman.mp4';

const Banner = () => {
  const [count, setCount] = useState(0);
  const [muted, setMuted] = useState(true);

  const BannerMovies = [
    {
      title: 'Inception',
      desc: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible.',
      video: Inception,
      link: 'movie/27205',
      banner_tag: 'Mind-Bending Classic',
    },
    {
      title: 'Top Gun: Maverick',
      desc: 'After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission',
      video: TopGun,
      link: 'movie/361743',
      banner_tag: 'Box Office Hit',
    },
    {
      title: 'Interstellar',
      desc: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
      video: Interstellar,
      link: 'movie/157336',
      banner_tag: 'Sci-Fi Masterpiece',
    },
    {
      title: 'The Dark Knight',
      desc: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.',
      video: Batman,
      link: 'movie/155',
      banner_tag: 'Legendary Superhero Film',
    },
  ];

  const handleLeftClick = () => {
    setCount((prev) => (prev === 0 ? BannerMovies.length - 1 : prev - 1));
  };

  const handleRightClick = () => {
    setCount((prev) => (prev === BannerMovies.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-[95vh] w-full overflow-hidden mb-6">
      <video
        src={BannerMovies[count].video}
        autoPlay
        muted={muted}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />

      <button
        onClick={() => setMuted(!muted)}
        title={muted? "UnMute":"Mute"}
        className=" absolute flex w-max bottom-12 right-2 sm:bottom-16 sm:right-5 z-30 bg-white p-3 rounded-md shadow-lg hover:bg-opacity-80 transition duration-200 font-manrope font-bold"
      >
        {muted ? <VolumeOffIcon fontSize="small" className='h-max my-auto'/> : <VolumeUpIcon fontSize="small" className='h-max my-auto'/>}
        <span className='hidden sm:flex h-max my-auto'>{muted ? "Unmute":"Mute"}</span>
      </button>

      <div className="absolute inset-0 flex justify-between items-center px-4 z-20">
        <button
          onClick={handleLeftClick}
          className="text-white text-2xl bg-black bg-opacity-50 px-3 py-2 rounded-full"
        >
          <WestIcon />
        </button>
        <button
          onClick={handleRightClick}
          className="text-white text-2xl bg-black bg-opacity-50 px-3 py-2 rounded-full"
        >
          <EastIcon />
        </button>
      </div>

      <div className="absolute bottom-14 left-4 sm:left-10 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] z-20 text-white space-y-4"  data-aos="fade-bottom" data-aos-duration="1000">
        <p className="font-nunito bg-black bg-opacity-50 px-4 py-2 rounded-full w-max text-[.9rem]">
          {BannerMovies[count].banner_tag}
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold font-manrope">{BannerMovies[count].title}</h1>
        <p className="text-sm line-clamp-3 sm:text-[1.5rem] sm:leading-[30px] max-w-[90%] font-nunito">
          {BannerMovies[count].desc}
        </p>
        <div className="flex flex-wrap text-[1.2rem] items-center gap-3 font-nunito w-max">
          <button className="flex items-center bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition">
            <PlayCircleOutlineRoundedIcon className="mr-2 text-base" />
            Watch Movie
          </button>
          <Link
            to={`/${BannerMovies[count].link}`}
            className="text-white bg-white bg-opacity-30 hover:bg-opacity-50 px-4 py-2 rounded-full text-sm transition"
          >
            More Info <EastIcon className="inline text-sm ml-1" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 flex space-x-2 z-30 w-full">
        <div className="w-[95%] relative flex items-end justify-end">
          {BannerMovies.map((_, index) => (
            <div
              key={index}
              className="w-12 h-[5px] mx-2 rounded-full bg-white transition-all duration-300"
              style={{ opacity: index === count ? 1 : 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
