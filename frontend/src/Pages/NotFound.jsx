import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { FaAnglesRight } from "react-icons/fa6";

const NotFound = () => {
  const navigate = useNavigate();
  document.title = "LOST IN SPACE — 404";

  return (
    <div className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center">
      <Header />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-white/[0.02] text-[25rem] md:text-[40rem] font-manrope font-black italic tracking-tighter leading-none uppercase">
          404
        </h1>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="w-12 h-1 bg-red-600 mb-8 rounded-full animate-pulse" />
        
        <h2 className="text-6xl md:text-9xl font-manrope font-black italic uppercase tracking-tighter text-white leading-[0.8] mb-6">
          Lost the <br /> 
          <span className="text-red-600">Script?</span>
        </h2>
        
        <p className="font-nunito text-white/70 text-lg md:text-xl max-w-md mb-12 leading-relaxed">
          The scene you're looking for was cut from the final edit. Let's get you back to the main feature.
        </p>

        <button
          onClick={() => navigate('/')}
          className="group relative flex items-center gap-4 px-10 py-5 bg-white text-black font-manrope font-black uppercase italic tracking-widest text-sm hover:bg-red-600 hover:text-white transition-all duration-500 rounded-full"
        >
          Return to Home
          <FaAnglesRight className="transition-transform duration-300 group-hover:translate-x-2" />
        </button>

        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.03] -z-10" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/[0.03] -z-10" />
      </div>

      <div className="absolute bottom-10 left-10 hidden md:block">
        <p className="font-manrope font-bold text-[10px] tracking-[0.3em] text-white/70 uppercase rotate-90 origin-left">
          Status: 404_NOT_FOUND
        </p>
      </div>
    </div>
  );
};

export default NotFound;