import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // persist selected language
  };

  const links = [
    { name: t("home"), path: "/" },
    { name: t("projects"), path: "/projects" },
    { name: t("about"), path: "/about" },
    { name: t("contact"), path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-10 py-4 flex justify-between items-center bg-white/10 dark:bg-gray-900/50 backdrop-blur-md">
      <div className="text-2xl font-bold tracking-wide text-blue-500">
        {t("brand")}
      </div>

      <ul className="hidden md:flex space-x-8 text-lg font-medium items-center">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`transition-colors duration-300 cursor-pointer ${
                location.pathname === link.path
                  ? "text-blue-500"
                  : "text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* 🌐 Language Switch */}
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => changeLanguage("en")}
          className={`px-2 py-1 rounded ${
            i18n.language === "en"
              ? "bg-blue-500 text-white"
              : "border hover:bg-blue-500 hover:text-white"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage("bn")}
          className={`px-2 py-1 rounded ${
            i18n.language === "bn"
              ? "bg-blue-500 text-white"
              : "border hover:bg-blue-500 hover:text-white"
          }`}
        >
          বাংলা
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
