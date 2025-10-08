/* eslint-disable no-unused-vars */
// src/pages/Home.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import Hero from "../components/Hero";
import ProjectShowcase from "../components/ProjectShowcase";
import Services from "../components/Services";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Hero />
      <ProjectShowcase />
      <Services />
    </div>
  );
};

export default Home;
