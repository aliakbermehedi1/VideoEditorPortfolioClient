import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", !darkMode);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  // Simple navigation items
  const mainNav = [
    { name: t("home"), path: "/" },
    { name: t("services"), path: "/services", hasMega: true },
    { name: t("showcase"), path: "/showcase", hasMega: true },
    { name: t("about_us"), path: "/about" },
    { name: t("contact"), path: "/contact" },
  ];

  // Showcase Mega Menu Data
  const showcaseData = {
    left: {
      title: "Our Work",
      items: [
        {
          name: "🎬 Feature Work",
          path: "/featured",
          description: "Award-winning projects",
        },
        {
          name: "🔥 Latest Work",
          path: "/latest",
          description: "Recently completed projects",
        },
        {
          name: "💼 Happy Clients",
          path: "/clients",
          description: "120+ satisfied clients",
        },
        {
          name: "📰 Latest News",
          path: "/news",
          description: "Studio updates & blogs",
        },
      ],
    },
    middle: {
      title: "Spotlight Reel",
      type: "video",
      content: [
        { title: "Cinematic Wedding Film", duration: "2:30", views: "15K" },
        { title: "Corporate Brand Story", duration: "1:45", views: "8.2K" },
        { title: "Music Video - 'Echoes'", duration: "4:15", views: "25K" },
      ],
    },
    right: {
      title: "Who We Are",
      items: [
        { name: "👥 Our Team", path: "/team", description: "Meet the experts" },
        { name: "💼 Career", path: "/career", description: "Join our team" },
        {
          name: "📞 Contact Us",
          path: "/contact",
          description: "Get in touch",
        },
        {
          name: "📍 Location",
          path: "/location",
          description: "Visit our studio",
        },
      ],
    },
  };

  // Services Mega Menu Data
  const servicesData = {
    categories: [
      {
        title: "Short Form Content",
        icon: "🎯",
        services: [
          {
            name: "Social Media Reels",
            duration: "15-60s",
            price: "Start $199",
          },
          { name: "YouTube Shorts", duration: "15-60s", price: "Start $179" },
          { name: "TikTok Videos", duration: "15-90s", price: "Start $169" },
          {
            name: "Instagram Stories",
            duration: "15-30s",
            price: "Start $149",
          },
        ],
      },
      {
        title: "Long Form Content",
        icon: "🎬",
        services: [
          {
            name: "Documentary Films",
            duration: "10-60min",
            price: "Custom Quote",
          },
          {
            name: "Corporate Videos",
            duration: "2-10min",
            price: "Start $799",
          },
          { name: "Feature Films", duration: "60+ min", price: "Custom Quote" },
          {
            name: "YouTube Episodes",
            duration: "5-20min",
            price: "Start $499",
          },
        ],
      },
      {
        title: "Special Occasions",
        icon: "💝",
        services: [
          { name: "Wedding Films", duration: "3-10min", price: "Start $1299" },
          {
            name: "Birthday Celebrations",
            duration: "2-5min",
            price: "Start $399",
          },
          {
            name: "Anniversary Videos",
            duration: "2-8min",
            price: "Start $599",
          },
          { name: "Baby Showers", duration: "2-5min", price: "Start $349" },
        ],
      },
      {
        title: "Commercial & Brand",
        icon: "🏢",
        services: [
          {
            name: "Product Commercials",
            duration: "30-120s",
            price: "Start $899",
          },
          { name: "Brand Stories", duration: "1-3min", price: "Start $699" },
          {
            name: "Testimonial Videos",
            duration: "1-2min",
            price: "Start $299",
          },
          { name: "Explainer Videos", duration: "1-3min", price: "Start $799" },
        ],
      },
    ],
    featured: {
      title: "Most Popular",
      service: "Wedding Cinematography",
      description: "Complete wedding coverage with cinematic storytelling",
      price: "Starting at $1299",
      rating: "⭐ 4.9/5 (120+ reviews)",
    },
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("brand")}
          </div>

          {/* Main Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNav.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() =>
                  item.hasMega && setActiveMegaMenu(item.name.toLowerCase())
                }
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  to={item.path}
                  className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    location.pathname === item.path
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </Link>

                {/* Showcase Mega Menu */}
                {activeMegaMenu === "showcase" &&
                  item.name.toLowerCase() === "showcase" && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 animate-in fade-in-0 zoom-in-95 duration-300">
                      <div className="grid grid-cols-3 gap-8">
                        {/* Left Section - Our Work */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            {showcaseData.left.title}
                          </h3>
                          <div className="space-y-3">
                            {showcaseData.left.items.map((item, idx) => (
                              <Link
                                key={idx}
                                to={item.path}
                                className="block p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 group"
                              >
                                <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                  {item.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {item.description}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Middle Section - Video Showcase */}
                        <div className="border-l border-r border-gray-200 dark:border-gray-700 px-6">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                            {showcaseData.middle.title}
                          </h3>
                          <div className="space-y-4">
                            {showcaseData.middle.content.map((video, idx) => (
                              <div key={idx} className="group cursor-pointer">
                                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-200">
                                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-lg">
                                      ▶
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600">
                                      {video.title}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      {video.duration} • {video.views} views
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                            🎥 View All Videos
                          </button>
                        </div>

                        {/* Right Section - Who We Are */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                            {showcaseData.right.title}
                          </h3>
                          <div className="space-y-3">
                            {showcaseData.right.items.map((item, idx) => (
                              <Link
                                key={idx}
                                to={item.path}
                                className="block p-3 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 transition-all duration-200 group"
                              >
                                <div className="font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                                  {item.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {item.description}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Services Mega Menu */}
                {activeMegaMenu === "services" &&
                  item.name.toLowerCase() === "services" && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[900px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 animate-in fade-in-0 zoom-in-95 duration-300">
                      <div className="grid grid-cols-4 gap-6">
                        {/* Service Categories */}
                        {servicesData.categories.map((category, index) => (
                          <div key={index} className="group">
                            <div className="flex items-center mb-3">
                              <span className="text-2xl mr-2">
                                {category.icon}
                              </span>
                              <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                                {category.title}
                              </h3>
                            </div>
                            <div className="space-y-2">
                              {category.services.map((service, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-gray-600"
                                >
                                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                                    {service.name}
                                  </div>
                                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <span>{service.duration}</span>
                                    <span className="text-green-600 dark:text-green-400 font-semibold">
                                      {service.price}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Featured Service Banner */}
                      <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm opacity-90">
                              🔥 {servicesData.featured.title}
                            </div>
                            <div className="font-bold text-lg">
                              {servicesData.featured.service}
                            </div>
                            <div className="text-sm opacity-90">
                              {servicesData.featured.description}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-xl">
                              {servicesData.featured.price}
                            </div>
                            <div className="text-sm opacity-90">
                              {servicesData.featured.rating}
                            </div>
                            <button className="mt-2 bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
                              Get Quote
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* CTA Button */}
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hidden md:flex">
              🎥 Get Started
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 group"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                // Sun icon for dark mode
                <svg
                  className="w-5 h-5 text-yellow-500 transform rotate-45 group-hover:rotate-90 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                // Moon icon for light mode
                <svg
                  className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Language Switcher - Compact */}
            <div className="relative group">
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 flex items-center space-x-1 text-sm font-medium">
                <span>{i18n.language === "en" ? "EN" : "BN"}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Language Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-20 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top">
                <button
                  onClick={() => changeLanguage("en")}
                  className={`w-full px-3 py-2 text-sm text-left transition-colors duration-200 ${
                    i18n.language === "en"
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage("bn")}
                  className={`w-full px-3 py-2 text-sm text-left transition-colors duration-200 ${
                    i18n.language === "bn"
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  বাংলা
                </button>
              </div>
            </div>

            {/* Mobile menu button (optional) */}
            <button className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
