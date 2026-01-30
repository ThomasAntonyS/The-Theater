import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';
import { PiSealCheckFill } from 'react-icons/pi';
import { IoClose } from 'react-icons/io5';

const FloatingPopup = ({ message, isError, onClose }) => {
  return (
    <div
      role="alert"
      className={`fixed top-6 right-4 z-[200] font-manrope shadow-2xl rounded-xl overflow-hidden border border-white/10 backdrop-blur-2xl bg-[#0a0a0a]/90 w-[90%] sm:w-[24rem] transition-all duration-500 ease-out animate-in slide-in-from-right-8`}
    >
      <div className={`absolute left-0 top-0 h-full w-1.5 ${isError ? 'bg-red-600' : 'bg-emerald-500'}`} />

      <div className="flex items-start gap-4 p-5">
        <div className="mt-0.5">
          {isError ? (
            <FiAlertTriangle className="text-red-600 w-6 h-6" />
          ) : (
            <PiSealCheckFill className="text-emerald-500 w-6 h-6" />
          )}
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-start w-full">
            <p className="text-white text-sm md:text-base leading-snug font-bold uppercase italic tracking-tight break-words max-w-[90%]">
              {isError ? "System Alert" : "Success"}
            </p>
            <button
              onClick={onClose}
              className="text-white/20 hover:text-white transition-colors focus:outline-none"
              aria-label="Close popup"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-white/70 text-sm font-nunito mt-1 leading-relaxed">
            {message}
          </p>

          {!isError && (
            <Link
              to="/watchlist"
              onClick={onClose}
              className="inline-block text-red-600 font-manrope font-black text-[10px] uppercase tracking-[0.2em] mt-4 hover:text-white transition-colors"
            >
              View Watchlist &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingPopup;