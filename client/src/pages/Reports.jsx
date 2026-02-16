import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Reports = () => {
    // Mock Data for Military Spending Breakdown
    const militaryData = {
        labels: ['USA', 'China', 'Russia', 'India', 'Saudi Arabia'],
        datasets: [
            {
                label: 'Military Spending (Billion USD)',
                data: [877, 292, 86.4, 81.4, 75],
                backgroundColor: 'rgba(239, 68, 68, 0.7)', // geo-red
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 1,
            },
        ],
    };

    const militaryOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: '#9ca3af' } },
            title: { display: true, text: 'Top 5 Global Military Spenders (2025)', color: '#d1d5db', font: { size: 16 } },
        },
        scales: {
            y: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } },
            x: { ticks: { color: '#9ca3af' }, grid: { display: false } }
        }
    };

    // Mock Data for Regional Instability Index
    const instabilityData = {
        labels: ['Middle East', 'Eastern Europe', 'Asia Pacific', 'Africa', 'Latin America'],
        datasets: [
            {
                label: '# of Active Conflicts',
                data: [12, 4, 6, 15, 3],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(139, 92, 246, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const instabilityOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'right', labels: { color: '#9ca3af' } },
            title: { display: true, text: 'Active Conflicts by Region', color: '#d1d5db', font: { size: 16 } },
        },
    };

    return (
        <div className="min-h-screen bg-geo-dark text-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-8 border-l-4 border-blue-500 pl-4">Strategic Intelligence Reports</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Military Chart */}
                <div className="bg-geo-navy p-6 rounded-lg border border-gray-800 shadow-xl">
                    <Bar data={militaryData} options={militaryOptions} />
                </div>

                {/* Instability Pie Chart */}
                <div className="bg-geo-navy p-6 rounded-lg border border-gray-800 shadow-xl flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <Pie data={instabilityData} options={instabilityOptions} />
                    </div>
                </div>
            </div>

            <div className="bg-geo-navy p-6 rounded-lg border border-gray-800 shadow-xl">
                <h3 className="text-xl font-bold mb-4">Economic Forecast Analysis</h3>
                <p className="text-gray-400 mb-4">
                    Global economic indicators suggest a shift in trade alliances. Emerging markets in the Global South are decoupling from traditional western financial systems, leading to increased volatility in currency markets.
                    <br /><br />
                    Key trends to watch:
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                        <li><span className="text-geo-yellow">Gold Reserves:</span> Central banks increasing holdings by 15% YoY.</li>
                        <li><span className="text-geo-red">Energy Sector:</span> Diversification of supply chains reducing reliance on single-source producers.</li>
                        <li><span className="text-blue-400">Tech Regulation:</span> Semiconductor export controls tightening globally.</li>
                    </ul>
                </p>
            </div>
        </div>
    );
};

export default Reports;
