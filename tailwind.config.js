/** @type {import("tailwindcss").Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx,svg}",
        "./src/**/*/*.svg"
    ],
    darkMode: "class",
    theme: {
        screens: {
            sm: "480px",
            smd: "840px",
            md: "750px",
            lg: "976px",
            xl: "1440px"
        },
        fontFamily: {
            'info': ['Rahovets', 'system-ui',]
        },
        extend: {}
    },
    corePlugins: {
        preflight: true, // change this to false if you don't want TailwindCSS to reset your CSS
        enabled: true
    },
    plugins: [ require("tailwindcss-primeui") ]
};