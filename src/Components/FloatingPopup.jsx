import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';
import { PiSealCheckFill } from 'react-icons/pi';
import { IoClose } from 'react-icons/io5';

const FloatingPopup = ({ message, isError, onClose }) => {
  return (
    <div
      role="alert"
      className="fixed top-[10%] right-4 z-50 bg-white shadow-lg px-4 py-3 rounded-md border border-gray-200 w-[90%] sm:w-[22rem] md:w-[26rem] lg:w-[30rem] xl:w-[34rem] max-w-full flex flex-col gap-3 overflow-hidden"
    >
      <div className="flex items-center gap-3">
        {/* Icon (vertically centered with message) */}
        <div className="flex items-center justify-center">
          {isError ? (
            <FiAlertTriangle className="text-red-700 w-6 h-6" />
          ) : (
            <PiSealCheckFill className="text-green-700 w-6 h-6" />
          )}
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex items-start justify-between">
            <p className="text-gray-800 text-[1.3rem] font-poppins font-manrope break-words max-w-[85%] leading-snug">
              {message}
            </p>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none ml-2 mt-[2px]"
              aria-label="Close popup"
            >
              <IoClose className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Link to Watchlist */}
      {!isError && (
        <Link
          to="/watchlist"
          className="text-blue-600 hover:underline text-[1.2rem] font-medium self-start font-nunito"
        >
          Go to Watchlist →
        </Link>
      )}
    </div>
  );
};

export default FloatingPopup;
