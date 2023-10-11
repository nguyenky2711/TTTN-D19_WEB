/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        screens: {
          sm: { min: "0px", max: "767px" },
          // => @media (min-width: 640px and max-width: 767px) { ... }
  
          md: { min: "768px", max: "1023px" },
          // => @media (min-width: 768px and max-width: 1023px) { ... }
  
          lg: { min: "1024px" },
        },
        fontFamily: {
          Karla: ["Karla", "sans-serif"],
        },
        colors: {
          "text-link": "#25aae1",
          "color-second": "#a25f4b",
          "light-coffee": "#C89F94",
          "text-white": "#fff",
          organe: "rgba(162, 95, 75, 0.2)",
          main: "rgba(29, 31, 46, 0.7)",
          "text-gray":"#1d1f2e"
        },
        backgroundImage: {
          button_bg:"linear-gradient(to right, black, gray, black, gray)",
          img__overplay:"linear-gradient(180deg, rgba(29, 31, 46, 0.1), rgba(29, 31, 46, 0.1))"
        },
        boxShadow: {
          header_shadow: "1px 2px 12px #888888",
          avt_shadow: "1px 6px 3px 7px #1e2a3f",
          button_shadow: "0 4px 15px 0 rgba(236 116 149 0.75)",
          menu_shadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
          retangle_shadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;",
        },
        backgroundPosition: {
          button_hover: "100% 0",
          sliderPosition: "0px 0px 50% 50%",
        },
        backgroundSize: {
          button_size: "300% 100%",
        },
        keyframes: {
          slideDown: {
            "0%": { transform: "translateY(-40%)" },
            "100%": { transform: "translateY(0%)" },
          },
          btnShow:{
            "0%": { transform: "translateY(70%)" },
            "100%": { transform: "translateY(0%)" },
          }
        },
        animation: {
          slideDown: "slideDown 0.3s ease-out ",
          btnShow:  "btnShow 0.6s linear"
        },
        margin: {
          "100px": "100px",
        },
      },
    },
    plugins: [],
  };
  