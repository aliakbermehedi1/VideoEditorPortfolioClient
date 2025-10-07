import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md z-50 px-10 py-4 flex justify-between items-center bg-white/10 dark:bg-gray-900/50 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="text-2xl font-bold tracking-wide">
        <span className="text-blue-500 dark:text-blue-400">Shedlin</span>{" "}
        <span className="text-gray-900 dark:text-white">Venture</span>
      </div>

      <ul className="hidden md:flex space-x-8 text-lg font-medium items-center">
        {[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: "About", path: "/about" },
          { name: "Contact", path: "/contact" },
        ].map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`transition-colors duration-300 cursor-pointer ${
                location.pathname === link.path
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
