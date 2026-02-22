import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="bg-[#050505] min-h-screen flex flex-col font-manrope overflow-hidden">
            <Header />
            <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 w-full h-full pt-[10vh]">
                <div className="hidden lg:flex relative items-center justify-center p-12 overflow-hidden border-r border-white/5">
                    <img 
                        src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070" 
                        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                        alt="Theater"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent" />
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                            Join The <br /> <span className="text-red-600">Theater.</span>
                        </h2>
                        <p className="font-nunito text-white/50 text-xl max-w-md leading-relaxed">
                            Engineered for film. Create your account to start your curated cinematic journey.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center px-8 py-6 sm:p-12 bg-black/40 backdrop-blur-sm overflow-hidden">
                    <div className="w-full max-w-md space-y-8 py-8" data-aos="fade-left">
                        <header>
                            <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Sign Up</h1>
                            <div className="h-1 w-12 bg-red-600 mt-2"></div>
                        </header>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/70 uppercase tracking-widest ml-2">Username</label>
                                <input type="text" placeholder="USERNAME" className="w-full bg-white/5 border-b border-white/70 py-3 px-4 text-white font-bold focus:outline-none focus:border-red-600 transition-all text-sm" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/70 uppercase tracking-widest ml-2">Email</label>
                                <input type="email" placeholder="EMAIL" className="w-full bg-white/5 border-b border-white/70 py-3 px-4 text-white font-bold focus:outline-none focus:border-red-600 transition-all text-sm" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/70 uppercase tracking-widest ml-2">Password</label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} placeholder="PASSWORD" className="w-full bg-white/5 border-b border-white/70 py-3 px-4 text-white font-bold focus:outline-none focus:border-red-600 transition-all text-sm" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3 text-white/70 hover:text-red-600">
                                        {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/70 uppercase tracking-widest ml-2">Confirm Password</label>
                                <input type="password" placeholder="CONFIRM PASSWORD" className="w-full bg-white/5 border-b border-white/70 py-3 px-4 text-white font-bold focus:outline-none focus:border-red-600 transition-all text-sm" />
                            </div>

                            <button className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-red-600 hover:text-white transition-all duration-500 shadow-xl">
                                Create Account
                            </button>
                        </form>

                        <div className="text-center">
                            <div className="text-xs text-white/70 uppercase tracking-wider">
                                Already a User? <Link to="/login" className="text-white font-black underline hover:text-red-600 decoration-red-600 underline-offset-4 ml-2">Log in</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SignUp;