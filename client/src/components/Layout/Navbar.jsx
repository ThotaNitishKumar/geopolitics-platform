import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, AlertTriangle, FileText, BarChart3, User, Activity } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-geo-navy border-b border-gray-800 text-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <Globe className="h-8 w-8 text-geo-red" />
                            <span className="font-extrabold text-2xl tracking-tighter italic uppercase">GEO<span className="text-geo-red">INTEL</span></span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-1">
                            <Link to="/" className="hover:text-geo-red px-3 py-2 text-[11px] font-black uppercase tracking-widest transition-colors">Home</Link>
                            <Link to="/world-map" className="hover:text-geo-red px-3 py-2 text-[11px] font-black uppercase tracking-widest transition-colors">World Map</Link>
                            <Link to="/conflicts" className="hover:text-geo-red px-3 py-2 text-[11px] font-black uppercase tracking-widest transition-colors">Conflicts</Link>
                            <Link to="/comparison" className="hover:text-geo-red px-3 py-2 text-[11px] font-black uppercase tracking-widest transition-colors">Comparison</Link>
                            <Link to="/reports" className="hover:text-geo-red px-3 py-2 text-[11px] font-black uppercase tracking-widest transition-colors">Reports</Link>
                            <Link to="/predictions" className="hover:text-geo-red px-3 py-2 text-[11px] font-black uppercase tracking-widest transition-colors text-geo-red">Predictions</Link>
                            <Link to="/news" className="hover:text-geo-red px-3 py-2 text-[11px] font-black uppercase tracking-widest transition-colors">Intelligence</Link>

                            {user ? (
                                <button
                                    onClick={logout}
                                    className="bg-geo-red hover:bg-red-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ml-4 transition-colors"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login" className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ml-4 transition-colors flex items-center gap-2 border border-white/10 uppercase"><User size={14} /> Login</Link>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-[#020c1b] border-t border-white/5">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 uppercase font-black text-xs tracking-widest">
                        <Link to="/" className="block hover:bg-white/5 px-3 py-2 rounded-md">Home</Link>
                        <Link to="/world-map" className="block hover:bg-white/5 px-3 py-2 rounded-md">World Map</Link>
                        <Link to="/conflicts" className="block hover:bg-white/5 px-3 py-2 rounded-md">Conflicts</Link>
                        <Link to="/comparison" className="block hover:bg-white/5 px-3 py-2 rounded-md">Comparison</Link>
                        <Link to="/reports" className="block hover:bg-white/5 px-3 py-2 rounded-md">Reports</Link>
                        <Link to="/predictions" className="block hover:bg-white/5 px-3 py-2 rounded-md text-geo-red">Predictions</Link>
                        <Link to="/news" className="block hover:bg-white/5 px-3 py-2 rounded-md">Intelligence</Link>
                        {user ? (
                            <button
                                onClick={logout}
                                className="block w-full bg-geo-red mt-4 px-3 py-2 rounded-md text-base font-medium text-center"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="block bg-gray-700 mt-4 px-3 py-2 rounded-md text-base font-medium text-center">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
