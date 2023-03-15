/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'secondary': '#000a1f',
        'sectionBlue': '#2E3F5F',
      },
      backgroundImage: {
        'hero': "linear-gradient( rgba(0, 10, 31, 0.0), rgba(0, 10, 31, 0.55) ), url('../public/Hero_LCD_v2.jpg')",
        'about': "linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 10, 31, 0.85) ), url('../public/page_headers_oath.jpg')",
        'events': "linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 10, 31, 0.85) ), url('../public/img_LCD_event-hug.png')",
        'forProfessionalsStudents': "linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 10, 31, 0.85) ), url('../public/for_professionals_students_header.jpg')",
        'blueTransition': 'linear-gradient(to bottom, #000a1f, #2E3F5F)',
      },
      padding: {
        '30pcnt': "30%",
        '90pcnt': "90%",
      },
      zIndex: {
        '100': "100",
      },
      backgroundColor: {
        'secondary': "#000a1f",
        'secondaryHover': '#142a40',
        'lcdYellow': '#FFFEF7',
        'lcdGray': "#F2F2F2",
        'lcdBlue': '#2E415D',
        'sectionBlue': '#2E3F5F',
      },
      maxWidth: {
        'link': '1000px',
      },
      borderColor: {
        'secondary': 'rgb(0, 10, 31)',
      },
      height: {
        'eventWidget': '584px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
