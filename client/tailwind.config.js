/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                geo: {
                    navy: '#0a192f',
                    dark: '#020c1b',
                    red: '#ef4444',
                    mutedRed: '#7f1d1d',
                    yellow: '#f59e0b',
                }
            }
        },
    },
    plugins: [],
}
