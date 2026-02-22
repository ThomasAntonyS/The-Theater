import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="bg-[#050505] h-screen flex flex-col font-manrope overflow-hidden">
            <Header />
            <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 w-full h-full pt-[10vh]">

                <div className="hidden lg:flex relative items-center justify-center p-12 overflow-hidden border-r border-white/5">
                    <img 
                        src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059" 
                        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                        alt="Cinema"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent" />
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                            Access <br /> Your <span className="text-red-600">Theater.</span>
                        </h2>
                        <p className="font-nunito text-white/50 text-xl max-w-md leading-relaxed">
                            Log in to access your saved movies and trending hits.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center px-8 py-6 sm:p-12 bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-md space-y-8" data-aos="fade-left">
                        <header>
                            <h1 className="text-4xl font-black uppercase tracking-tighter text-white italic">Log in</h1>
                            <div className="h-1 w-12 bg-red-600 mt-2"></div>
                        </header>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/70 uppercase tracking-widest ml-2">Email</label>
                                <div className="flex items-center border-b border-white/70 bg-white/5 focus-within:border-red-600 transition-all duration-500 p-2">
                                    <EmailIcon className="text-white/70" fontSize="small" />
                                    <input type="email" required className="w-full px-4 text-white bg-transparent font-bold focus:outline-none placeholder:text-white/70 tracking-tighter" placeholder="EMAIL" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/70 uppercase tracking-widest ml-2">Password</label>
                                <div className="flex items-center border-b border-white/70 bg-white/5 focus-within:border-red-600 transition-all duration-500 p-2">
                                    <LockIcon className="text-white/70" fontSize="small" />
                                    <input type={showPassword ? "text" : "password"} required className="w-full px-4 text-white bg-transparent font-bold focus:outline-none placeholder:text-white/70 tracking-tighter" placeholder="PASSWORD" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/70 hover:text-red-600">
                                        {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                    </button>
                                </div>
                            </div>

                            <button className="w-full bg-red-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-500 shadow-xl">
                                Log In
                            </button>
                        </form>

                        <div className="text-center">
                            <div className="text-xs text-white/70 uppercase tracking-wider ">
                                New User ? <Link to="/signup" className="text-white font-black underline hover:text-red-600 decoration-red-600 underline-offset-4 ml-2">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;