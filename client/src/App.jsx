import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ConflictTracker from './pages/ConflictTracker';
import ArticlePage from './pages/ArticlePage';
import Reports from './pages/Reports';
import Comparison from './pages/Comparison';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="bg-geo-dark min-h-screen text-gray-100 font-sans flex flex-col">
                    <Navbar />
                    <div className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/map" element={<MapPage />} />
                            <Route path="/conflicts" element={<ConflictTracker />} />
                            <Route path="/reports" element={<Reports />} />
                            <Route path="/article/:id" element={<ArticlePage />} />
                            <Route path="/comparison" element={<Comparison />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
