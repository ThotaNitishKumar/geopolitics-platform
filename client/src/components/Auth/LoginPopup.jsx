import { useNavigate } from 'react-router-dom';
import { Lock, X } from 'lucide-react';

const LoginPopup = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative max-w-md w-full bg-geo-navy border border-gray-800 rounded-lg shadow-2xl p-8 transform transition-all animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-geo-red/10 rounded-full mb-6">
                        <Lock className="text-geo-red" size={32} />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-100 mb-2">Restricted Access</h2>
                    <p className="text-gray-400 mb-8">
                        This operation requires active clearance. Please login or register to access the intelligence platform.
                    </p>

                    <div className="space-y-4">
                        <button
                            onClick={() => {
                                onClose();
                                navigate('/login');
                            }}
                            className="w-full py-3 px-4 bg-geo-red hover:bg-red-700 text-white font-medium rounded-md transition-colors"
                        >
                            Login to Account
                        </button>

                        <button
                            onClick={() => {
                                onClose();
                                navigate('/register');
                            }}
                            className="w-full py-3 px-4 border border-gray-700 hover:border-gray-500 text-gray-300 font-medium rounded-md transition-colors"
                        >
                            Request Clearance (Signup)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPopup;
