import React from 'react';
import NotFoundImage from '../../assets/NotFound.png';
import { useNavigate } from 'react-router-dom';
import Header from '../Header'
import { FaAnglesRight } from "react-icons/fa6";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen">
      <Header/>
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        className="h-full w-full object-cover object-right sm:object-center"
      />

      <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-20 bg-black bg-opacity-30">
        <p className="text-6xl sm:text-[6.5rem] font-extrabold text-white mb-4 font-manrope">
          Error: <br /> Page Not Found
        </p>
        <button
          onClick={() => navigate('/')}
          className="flex px-6 py-3 mt-2 bg-black text-white rounded-lg hover:bg-black transition-all duration-300 font-nunito text-[1.3rem] sm:text-[1.7rem]"
        >
          Back to Home
          <span className=' h-max ml-2 my-auto'><FaAnglesRight /></span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
