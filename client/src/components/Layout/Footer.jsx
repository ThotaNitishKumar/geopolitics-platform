import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black py-8 border-t border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <Globe className="h-6 w-6 text-geo-red mr-2" />
                        <span className="text-lg font-bold text-gray-200 tracking-wider">GEO<span className="text-geo-red">INTEL</span></span>
                    </div>

                    <div className="flex space-x-6">
                        <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">Contact Analyst</a>
                    </div>

                    <div className="mt-4 md:mt-0 text-sm text-gray-600">
                        &copy; {new Date().getFullYear()} GeoIntel Systems. Classified.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
