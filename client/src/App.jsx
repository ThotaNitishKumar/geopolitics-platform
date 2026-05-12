import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import News from './pages/News';
import MapPage from './pages/MapPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ConflictTracker from './pages/ConflictTracker';
import ArticlePage from './pages/ArticlePage';
import Reports from './pages/Reports';
import Comparison from './pages/Comparison';
import ConflictDetail from './pages/ConflictDetail';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ReportDetail from './pages/ReportDetail';
import PredictionEngine from './pages/PredictionEngine';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import LoginPopup from './components/Auth/LoginPopup';

const ProtectedRoute = ({ children, onOpenPopup }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        if (!loading && !user) {
            onOpenPopup();
        }
    }, [user, loading, onOpenPopup]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-geo-red"></div>
        </div>
    );

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

function AppContent() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <div className="bg-geo-dark min-h-screen text-gray-100 font-sans flex flex-col">
            <Navbar />
            <LoginPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/world-map" element={
                        <ProtectedRoute onOpenPopup={() => setIsPopupOpen(true)}>
                            <MapPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/conflicts" element={
                        <ProtectedRoute onOpenPopup={() => setIsPopupOpen(true)}>
                            <ConflictTracker />
                        </ProtectedRoute>
                    } />
                    <Route path="/conflicts/:id" element={
                        <ProtectedRoute onOpenPopup={() => setIsPopupOpen(true)}>
                            <ConflictDetail />
                        </ProtectedRoute>
                    } />
                    <Route path="/comparison" element={
                        <ProtectedRoute onOpenPopup={() => setIsPopupOpen(true)}>
                            <Comparison />
                        </ProtectedRoute>
                    } />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/reports/:slug" element={<ReportDetail />} />
                    <Route path="/predictions" element={
                        <ProtectedRoute onOpenPopup={() => setIsPopupOpen(true)}>
                            <PredictionEngine />
                        </ProtectedRoute>
                    } />
                    <Route path="/article/:id" element={<ArticlePage />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

export default App;
