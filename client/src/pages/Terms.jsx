const Terms = () => {
    return (
        <div className="min-h-screen bg-geo-dark text-gray-100 p-6 pb-20">
            <div className="max-w-4xl mx-auto bg-geo-navy border border-gray-800 rounded-lg p-8 shadow-2xl">
                <h1 className="text-3xl font-bold mb-8 border-l-4 border-geo-red pl-4 uppercase tracking-wider">Terms and Conditions</h1>

                <div className="space-y-6 text-gray-400 leading-relaxed">
                    <p>Accessing the Geopolitics Intelligence Platform implies acceptance of the following terms.</p>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Use of Intelligence</h2>
                        <p>All intelligence reports, strategic analysis, and geospatial data provided on this platform are for informational purposes only. GeoIntel Systems is not responsible for decisions made based on this data.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. User Conduct</h2>
                        <p>Users are prohibited from attempting to scrape data, disrupt the automated news engine, or unauthorized access to classified reports.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. Intellectual Property</h2>
                        <p>The "GEOINTEL" brand, the interactive world map implementation, and the proprietary strategic briefing algorithms are protected intellectual property.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. Limitation of Liability</h2>
                        <p>GeoIntel Systems shall not be liable for any systemic errors in the automated RSS ingestion or AI-based sentiment analysis.</p>
                    </section>

                    <section className="pt-8 border-t border-gray-800 italic">
                        <p>Failure to comply with these terms may result in immediate suspension of dashboard access.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
