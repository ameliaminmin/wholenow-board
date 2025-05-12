/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        p: {
                            whiteSpace: 'pre-wrap',
                        },
                        li: {
                            whiteSpace: 'pre-wrap',
                        },
                        'p:first-of-type': {
                            marginTop: 0,
                        },
                        'p:last-of-type': {
                            marginBottom: 0,
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        // ... other plugins ...
    ],
}