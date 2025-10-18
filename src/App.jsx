// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import TawkToChat from "./components/TawkToChat";
import Home from "./pages/Home";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProjectShowcase from "./components/ProjectShowcase";

const Projects = () => (
  <div className="pt-20 text-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        🎬 Our Projects
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Explore our creative video editing portfolio featuring cinematic wedding
        films, corporate brand stories, and captivating commercial videos.
      </p>
    </div>
  </div>
);

const About = () => (
  <div className="pt-20 text-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        👨‍💻 About Us
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        We are passionate video editors dedicated to crafting compelling visual
        stories that connect with audiences and elevate brands.
      </p>
    </div>
  </div>
);

const Contact = () => (
  <div className="pt-20 text-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        📞 Contact Us
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Get in touch with our team to discuss your next video project. We're
        excited to bring your vision to life!
      </p>
    </div>
  </div>
);

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectShowcase />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        {/* <ScrollToTop /> */}
        <TawkToChat />
      </div>
    </ThemeProvider>
  );
};

export default App;