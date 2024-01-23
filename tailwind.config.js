/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "profile-photo":"url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Freflection%2F&psig=AOvVaw3OPGiNWKiQQbfdY_wHRvAL&ust=1704734458356000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCICc2_Dky4MDFQAAAAAdAAAAABAD')"
      },
      spacing:{
        '100px':'100px',
        '200px':'200px',
        '350px':'350px',
        '400px':'400px',
        '500px':'500px',
        '700px':"700px",
        '800px':'800px',
        '900px':'900px',
        '1100px':"1100px",
        '1200px':'1200px',
        '1300px':'1300px',
        '1500px':'1500px'
      },
      transitionProperty:{
        'display':'display'
      }
    },
  },
  plugins: [],
}

