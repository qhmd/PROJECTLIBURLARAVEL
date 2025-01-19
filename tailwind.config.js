// filepath: /C:/projectLibur/projectLiburLaravel/tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.jsx',
        './resources/**/*.vue',
    ],
    theme: {
    	extend: {
    		fontFamily: {
    			sans: [
    				['Arial','Figtree']
                ]
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
            keyframes: {
                "caret-blink": {
                  "0%,70%,100%": { opacity: "1" },
                  "20%,50%": { opacity: "0" },
                },
              },
            animation: {
                "caret-blink": "caret-blink 1.25s ease-out infinite",
            },
    		colors: {}
    	}
    },
    plugins: [require("tailwindcss-animate")],
};