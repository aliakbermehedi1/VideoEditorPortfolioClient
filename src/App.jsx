// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

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
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
