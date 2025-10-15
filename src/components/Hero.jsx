// src/components/Hero.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

const Hero = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const { isDark, getThemeClass } = useTheme();

  return (
    <section
      className={`h-screen flex flex-col justify-center items-center relative ${getThemeClass(
        "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50",
        "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      )}`}
    >
      {/* Animated Background Gradient */}
      <div
        className={`absolute inset-0 ${getThemeClass(
          "bg-gradient-to-r from-transparent via-white/50 to-transparent",
          "bg-gradient-to-r from-transparent via-gray-700/20 to-transparent"
        )} animate-pulse`}
      ></div>

      {/* Background pattern */}
      <div
        className={`absolute inset-0 ${getThemeClass(
          "opacity-10",
          "opacity-20"
        )}`}
      >
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1
          className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${getThemeClass(
            "from-blue-600 via-purple-600 to-pink-600",
            "from-blue-400 via-purple-400 to-pink-400"
          )} bg-clip-text text-transparent`}
        >
          {t("hero_title")}
        </h1>

        <p
          className={`text-xl md:text-2xl mb-8 ${getThemeClass(
            "text-gray-600",
            "text-gray-300"
          )} leading-relaxed`}
        >
          {t("hero_subtitle")}
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            className={`group relative bg-gradient-to-r ${getThemeClass(
              "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
              "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            )} text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${getThemeClass(
              "hover:shadow-blue-500/30",
              "hover:shadow-purple-500/30"
            )} overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="relative flex items-center space-x-2">
              <span>🎬</span>
              <span>{t("watch_showreel")}</span>
            </span>
          </button>

          <button
            className={`group border-2 ${getThemeClass(
              "border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800",
              "border-gray-300 hover:bg-gray-300 hover:text-gray-900 text-gray-300"
            )} px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105`}
          >
            <span className="relative flex items-center space-x-2">
              <span>📁</span>
              <span>{t("our_work")}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div
            className={`w-6 h-10 border-2 ${getThemeClass(
              "border-gray-400",
              "border-gray-500"
            )} rounded-full flex justify-center group cursor-pointer`}
          >
            <div
              className={`w-1 h-3 ${getThemeClass(
                "bg-gray-400",
                "bg-gray-500"
              )} rounded-full mt-2 group-hover:${getThemeClass(
                "bg-blue-500",
                "bg-purple-400"
              )} transition-colors duration-300`}
            ></div>
          </div>
          <p
            className={`text-xs ${getThemeClass(
              "text-gray-500",
              "text-gray-400"
            )} mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          >
            Scroll down
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
