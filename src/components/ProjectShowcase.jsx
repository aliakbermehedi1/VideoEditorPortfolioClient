// src/components/ProjectShowcase.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const ProjectShowcase = () => {
  const { t } = useTranslation();

  const projects = [
    {
      id: 1,
      title: "Corporate Brand Video",
      category: "Commercial",
      thumbnail: "/api/placeholder/400/300",
      duration: "2:30",
    },
    {
      id: 2,
      title: "Music Video - 'Echoes'",
      category: "Music",
      thumbnail: "/api/placeholder/400/300",
      duration: "4:15",
    },
    {
      id: 3,
      title: "Short Film - 'Moments'",
      category: "Narrative",
      thumbnail: "/api/placeholder/400/300",
      duration: "12:45",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          {t("recent_projects")}
        </h2>
        <p className="text-xl text-center mb-12 text-gray-600 dark:text-gray-300">
          Showcasing our best work in video editing and production
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative group">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-black px-6 py-3 rounded-full font-semibold">
                    ▶ Play Video
                  </button>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm">
                  {project.duration}
                </div>
              </div>
              <div className="p-6">
                <span className="text-blue-500 text-sm font-medium">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mt-2">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300">
            {t("view_all")} Projects →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
