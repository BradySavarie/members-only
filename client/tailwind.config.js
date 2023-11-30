/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#43BCCD',
                secondary: '#b4e4eb',
            },
        },
    },
    plugins: [],
};
