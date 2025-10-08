// src/components/Hero.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="h-screen flex flex-col justify-center items-center relative bg-gradient-to-br from-red-100 text-red-300">
      {/* Background Video/Image */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          {t("hero_title")}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          {t("hero_subtitle")}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            🎬 {t("watch_showreel")}
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
            📁 {t("our_work")}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
