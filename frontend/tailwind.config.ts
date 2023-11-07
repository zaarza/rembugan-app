import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './features/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            colors: {
                primary: '#696EEC',
                background: '#F4F4F4',
            },
            width: {
                inherit: 'inherit',
            },
            maxWidth: {
                inherit: 'inherit',
            },
        },
    },
    plugins: [],
};

export default config;
