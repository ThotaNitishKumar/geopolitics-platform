const Privacy = () => {
    return (
        <div className="min-h-screen bg-geo-dark text-gray-100 p-6 pb-20">
            <div className="max-w-4xl mx-auto bg-geo-navy border border-gray-800 rounded-lg p-8 shadow-2xl">
                <h1 className="text-3xl font-bold mb-8 border-l-4 border-geo-red pl-4 uppercase tracking-wider">Privacy Policy</h1>

                <div className="space-y-6 text-gray-400 leading-relaxed">
                    <p>Last Updated: February 16, 2026</p>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
                        <p>GeoIntel Systems collects minimal user data required for authentication and personalized intelligence feeds. This includes your email address and basic profile information provided during registration.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. How We Use Information</h2>
                        <p>Data collected is used exclusively for:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Providing access to advanced geospatial intelligence.</li>
                            <li>Maintaining the security of our intelligence dashboard.</li>
                            <li>Analyzing general usage trends to improve data delivery.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. Data Security</h2>
                        <p>We implement military-grade encryption for all stored data. Our system uses JWT-based authentication to ensure that intelligence reports are only accessible by authorized personnel.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. Cookies</h2>
                        <p>We use essential cookies to maintain your login session. No third-party tracking cookies are utilized on this platform.</p>
                    </section>

                    <section className="pt-8 border-t border-gray-800">
                        <p>For any privacy-related inquiries, please contact our lead data analyst.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
