// src/components/Hero.jsx
import React from "react";

const Hero = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center relative bg-white dark:bg-black">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white dark:text-black">
          Crafting Cinematic Stories
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          A creative journey through lenses by Shedlin Venture
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg">
          Watch Showreel
        </button>
      </div>
    </section>
  );
};

export default Hero;
