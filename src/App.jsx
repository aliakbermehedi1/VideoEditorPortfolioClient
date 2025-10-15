// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import { ThemeProvider } from "./contexts/ThemeContext";

const Projects = () => (
  <div className="pt-20 text-center min-h-screen">💼 Projects Page</div>
);

const About = () => (
  <div className="pt-20 text-center min-h-screen">👨‍💻 About Page</div>
);

const Contact = () => (
  <div className="pt-20 text-center min-h-screen">📞 Contact Page</div>
);

const App = () => {
  return (
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default App;
