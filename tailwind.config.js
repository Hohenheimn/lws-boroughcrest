/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                DarkBlue: "#2e4364",
                LightBlue: "#dde6ff",
                Orange: "#c84c32",
                Blue: "#218fd3",
                Red: "#EC4242",
                ThemeRed: "#8F384D",
                Green: "#1C9F11",
                ThemeRed50: "#8F384D8F",
                LiteBlack: "#2B2B2B",
                Gray: "#ECECEC",
                Gray_5: "#d9d9d9",
                Gray1: "#9F9F9F",
                Gray2: "#626262",
                RegularColor: "#545454",
            },
            width: {
                "300px": "300px",
                "350px": "350px",
                "258px": "258px",
            },
            backgroundColor: {
                DarkBlue: "#2e4364",
                LightBlue: "#dde6ff",
                Orange: "#c84c32",
                Blue: "#218fd3",
                Gray: "#f3f5fa",
                ThemeRed: "#8F384D",
                Green: "#1C9F11",
                LightRed: "#8F384D40",
                LiteBlack: "#2B2B2B",
                GrayLight: "#f5f5f5",
            },
            backgroundImage: {
                YellowOrange: "linear-gradient(#ff626d, #ffc271)",
                BlueLightBlue: "linear-gradient(#1689cd, #63b3f4)",
                VioletBlue: "linear-gradient(#b893d6, #8ca6db)",
                MainBG: "url('/Images/Background.png')",
                GradientGreen:
                    "linear-gradient(270deg, rgba(25, 209, 66, 0.26) 1.47%, rgba(25, 209, 66, 0) 78.72%)",
            },
            maxWidth: {
                "1920px": "1920px",
            },
            minWidth: {
                "400px": "400px",
            },
            minHeight: {
                container: "calc(100vh - 3.5rem)",
            },
            screens: {
                "2500px": { max: "2500px" },
                "1920px": { max: "1920px" },
                "1550px": { max: "1550px" },
                "1366px": { max: "1366px" },
                "1280px": { max: "1280px" },
                "1024px": { max: "1024px" },
                "820px": { max: "820px" },
                "640px": { max: "640px" },
                "480px": { max: "480px" },
                "390px": { max: "390px" },
                "375px": { max: "375px" },
                "320px": { max: "320px" },
            },
            fontFamily: {
                "NHU-black": "NHU-black",
                "NHU-bold": "NHU-bold",
                "NHU-medium": "NHU-medium",
                "NHU-regular": "NHU-regular",
                "NHU-light": "NHU-thin",
            },
            padding: {
                "350px": "350px",
                "258px": "258px",
            },
        },
    },
    plugins: [],
};
