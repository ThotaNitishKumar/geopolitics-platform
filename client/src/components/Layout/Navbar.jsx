import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, AlertTriangle, FileText, BarChart3, User } from 'lucide-react';
// import AuthContext from '../../context/AuthContext'; // Commented out until context is fully ready/used

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const { user, logout } = useContext(AuthContext); 
    const user = null; // Placeholder

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-geo-navy border-b border-gray-800 text-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <Globe className="h-8 w-8 text-geo-red" />
                            <span className="font-bold text-xl tracking-wider">GEO<span className="text-geo-red">INTEL</span></span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                            <Link to="/map" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">World Map</Link>
                            <Link to="/conflicts" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"><AlertTriangle size={16} /> Conflicts</Link>
                            <Link to="/comparison" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"><BarChart3 size={16} /> Comparison</Link>
                            <Link to="/reports" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"><FileText size={16} /> Reports</Link>

                            {user ? (
                                <button className="bg-geo-red hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium ml-4 transition-colors">Logout</button>
                            ) : (
                                <Link to="/login" className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium ml-4 transition-colors flex items-center gap-2"><User size={16} /> Login</Link>
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
                <div className="md:hidden bg-geo-dark">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link to="/map" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">World Map</Link>
                        <Link to="/conflicts" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">Conflicts</Link>
                        <Link to="/comparison" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">Comparison</Link>
                        <Link to="/reports" className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">Reports</Link>
                        <Link to="/login" className="block bg-gray-700 mt-4 px-3 py-2 rounded-md text-base font-medium text-center">Login</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
