import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ConstructionIcon from '@mui/icons-material/Construction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UnderDevelopment = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#050505] flex flex-col font-manrope overflow-hidden">
            <Header />
            
            <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 w-full h-full pt-[15vh]">
                <div className="hidden lg:flex relative items-center justify-center p-12 overflow-hidden border-r border-white/5">
                    <img 
                        src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070" 
                        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale blur-sm"
                        alt="Cinema Setup"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent" />
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                            Scene <br /> In <span className="text-red-600">Progress.</span>
                        </h2>
                        <p className="font-nunito text-white/70 text-xl max-w-md leading-relaxed">
                            A new cinematic feature is currently being engineered to enhance your experience.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center p-6 md:p-12 bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-md space-y-8 text-center lg:text-left" data-aos="fade-left">
                        <header>
                            <div className="inline-block p-4 rounded-full bg-red-600/10 border border-red-600/20 mb-6">
                                <ConstructionIcon className="text-red-600" sx={{ fontSize: 40 }} />
                            </div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Feature Pending</h1>
                            <div className="h-1 w-12 bg-red-600 mt-2 mx-auto lg:mx-0"></div>
                        </header>

                        <div className="space-y-4">
                            <p className="font-nunito text-white/70 text-lg uppercase tracking-widest leading-relaxed">
                                A developer is working behind the scene.
                            </p>
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
                                <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.15em]">Status : Building</span>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button 
                                onClick={() => navigate(-1)}
                                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 hover:text-white transition-all duration-500 shadow-xl group active:scale-95"
                            >
                                <ArrowBackIcon fontSize="small" className="group-hover:-translate-x-1 transition-transform" />
                                Return to Theater
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default UnderDevelopment;