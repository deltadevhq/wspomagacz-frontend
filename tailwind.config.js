/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            'colors': {
                'primary': '#F87171',
                'primary-shade': '#da6363',
                'primary-tint': '#f97f7f',
            }
        },
    },
    plugins: [],
}

