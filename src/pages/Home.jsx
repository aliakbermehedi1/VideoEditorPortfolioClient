// src/pages/Home.jsx
import React from "react";
import Hero from "../components/Hero";
import { useTheme } from "../contexts/ThemeContext";

const Home = () => {
  const { getThemeClass } = useTheme();

  return (
    <div
      className={`min-h-screen ${getThemeClass(
        "bg-white text-gray-900",
        "bg-gray-900 text-white"
      )}`}
    >
      <Hero />
      {/* Other sections */}
      <section
        className={`py-20 ${getThemeClass("bg-gray-50", "bg-gray-800")}`}
      >
        <div className="container mx-auto px-6 mb-96">
          <h2
            className={`text-3xl font-bold text-center ${getThemeClass(
              "text-gray-800",
              "text-white"
            )}`}
          >
            Our Services
          </h2>
        </div>
      </section>
    </div>
  );
};

export default Home;
