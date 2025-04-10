import React, { useState } from 'react';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { Link } from 'react-router-dom';

import Banner_1 from '../assets/Banner_1.mp4';
import Banner_2 from '../assets/Banner_2.mp4';
import Banner_3 from '../assets/Banner_3.mp4';
import Banner_4 from '../assets/Banner_4.mp4';

const Banner = () => {
  const [count, setCount] = useState(0);

  const BannerMovies = [
    {
      title: 'Dune: Part Two',
      desc: 'The epic saga continues as Paul Atreides faces political intrigue, mystical powers and the desert planet Arrakis, where spice flows like liquid gold.',
      video: Banner_1,
      link: 'movie/693134',
    },
    {
      title: '12th Fail',
      desc: 'A heartfelt coming-of-age story set in India. A young student grapples with academic pressures, societal expectations, and the pursuit of dreams.',
      video: Banner_2,
      link: 'movie/1163258',
    },
    {
      title: 'Oppenheimer',
      desc: 'A gripping historical drama centered around J. Robert Oppenheimer, the brilliant physicist behind the development of the atomic bomb during World War II.',
      video: Banner_3,
      link: 'movie/872585',
    },
    {
      title: 'Spider-Man: Across the Spider-Verse',
      desc: 'An animated adventure that transcends dimensions. Follow Miles Morales as he encounters alternate versions of Spider-Man, unraveling a web of multiverse mysteries.',
      video: Banner_4,
      link: 'movie/569094',
    },
  ];

  const handleLeftClick = () => {
    setCount((prev) => (prev === 0 ? BannerMovies.length - 1 : prev - 1));
  };

  const handleRightClick = () => {
    setCount((prev) => (prev === BannerMovies.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-[100vh] w-full overflow-hidden mb-6">
      {/* Video Background */}
      <video
        src={BannerMovies[count].video}
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />

      {/* Arrows */}
      <div className="absolute inset-0 flex justify-between items-center px-4 z-20">
        <button
          onClick={handleLeftClick}
          className="text-white w-max text-2xl bg-black bg-opacity-50 px-3 py-2 rounded-full"
        >
          <WestIcon />
        </button>
        <button
          onClick={handleRightClick}
          className="text-white w-max text-2xl bg-black bg-opacity-50 px-3 py-2  rounded-full"
        >
          <EastIcon />
        </button>
      </div>

      {/* Content */}
      <div className="absolute bottom-20 left-4 sm:left-10 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] z-30 text-white space-y-4">
        <p className="bg-black bg-opacity-50 px-4 py-2 rounded-full w-max text-sm">
          New Movie
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold">{BannerMovies[count].title}</h1>
        <p className="text-sm sm:text-base max-w-[90%]">
          {BannerMovies[count].desc}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex w-max items-center bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition">
            <PlayCircleOutlineRoundedIcon className="mr-2 text-base" />
            Watch Movie
          </button>
          <Link
            to={`/${BannerMovies[count].link}`}
            className="text-white w-max bg-white bg-opacity-30 hover:bg-opacity-50 px-4 py-2 rounded-full text-sm transition"
          >
            More Info <EastIcon className="inline text-sm ml-1" />
          </Link>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 flex space-x-2 z-30 w-full">
        <div className=' w-[95%] relative flex items-end justify-end'>
            {BannerMovies.map((_, index) => (
              <div key={index} className=" right-10 w-12 h-2 mx-2 rounded-full bg-white transition-all duration-300" style={{
                opacity: index === count ? 1 : 0.3
              }} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
