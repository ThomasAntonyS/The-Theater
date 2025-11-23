import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';
import { PiSealCheckFill } from 'react-icons/pi';
import { IoClose } from 'react-icons/io5';

const FloatingPopup = ({ message, isError, onClose }) => {
  return (
    <div
      role="alert"
      className="fixed top-5 right-1 sm:right-4 z-[100] bg-white font-manrope shadow-lg px-5 py-4 rounded-lg border border-gray-300 w-[95%] sm:w-[26rem] md:w-[30rem] lg:w-[34rem] xl:w-[38rem] max-w-full transition-all duration-300 ease-in-out"
    >
      <div className="flex items-start gap-4">
        <div>
          {isError ? (
            <FiAlertTriangle className="text-red-600 w-7 h-7" />
          ) : (
            <PiSealCheckFill className="text-green-600 w-7 h-7" />
          )}
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-start w-full mt-[2px]">
            <p className="text-gray-800 text-[1.1rem] leading-snug font-medium break-words max-w-[90%]">
              {message}
            </p>
            <button
              onClick={onClose}
              className="my-auto text-gray-500 hover:text-gray-700 focus:outline-none ml-2"
              aria-label="Close popup"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>

          {!isError && (
            <Link
              to="/watchlist"
              className="text-blue-600 hover:underline text-[1rem] mt-2 font-semibold"
            >
              Go to Watchlist →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingPopup;
