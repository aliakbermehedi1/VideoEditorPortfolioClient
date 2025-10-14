import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Initialize darkMode from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Set initial theme on component mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Listen for system preference changes (optional)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      // Only if user hasn't set a preference in localStorage
      if (!localStorage.getItem("theme")) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const mainNav = [
    { name: t("home"), path: "/", icon: "🏠" },
    { name: t("services"), path: "/services", hasMega: true, icon: "⚡" },
    { name: t("showcase"), path: "/showcase", hasMega: true, icon: "🎬" },
    { name: t("about_us"), path: "/about", icon: "👥" },
    { name: t("contact"), path: "/contact", icon: "📞" },
  ];

  const showcaseData = {
    left: {
      title: "Our Work",
      items: [
        {
          name: "🎬 Feature Work",
          path: "/featured",
          description: "Award-winning projects",
          color: "from-amber-400 to-orange-500",
        },
        {
          name: "🔥 Latest Work",
          path: "/latest",
          description: "Recently completed projects",
          color: "from-red-400 to-pink-500",
        },
        {
          name: "💼 Happy Clients",
          path: "/clients",
          description: "120+ satisfied clients",
          color: "from-blue-400 to-cyan-500",
        },
        {
          name: "📰 Latest News",
          path: "/news",
          description: "Studio updates & blogs",
          color: "from-purple-400 to-pink-500",
        },
      ],
    },
    middle: {
      title: "Spotlight Reel",
      content: [
        {
          title: "Cinematic Wedding Film",
          duration: "2:30",
          views: "15K",
          thumbnail: "from-rose-400 to-pink-600",
        },
        {
          title: "Corporate Brand Story",
          duration: "1:45",
          views: "8.2K",
          thumbnail: "from-blue-400 to-indigo-600",
        },
        {
          title: "Music Video - 'Echoes'",
          duration: "4:15",
          views: "25K",
          thumbnail: "from-purple-400 to-fuchsia-600",
        },
      ],
    },
    right: {
      title: "Who We Are",
      items: [
        {
          name: "👥 Our Team",
          path: "/team",
          description: "Meet the experts",
          color: "from-green-400 to-emerald-500",
        },
        {
          name: "💼 Career",
          path: "/career",
          description: "Join our team",
          color: "from-indigo-400 to-purple-500",
        },
        {
          name: "📞 Contact Us",
          path: "/contact",
          description: "Get in touch",
          color: "from-blue-400 to-cyan-500",
        },
        {
          name: "📍 Location",
          path: "/location",
          description: "Visit our studio",
          color: "from-orange-400 to-red-500",
        },
      ],
    },
  };

  const servicesData = {
    categories: [
      {
        title: "Short Form",
        icon: "🎯",
        gradient: "from-cyan-500 to-blue-500",
        services: [
          { name: "Social Media Reels", duration: "15-60s", price: "$199" },
          { name: "YouTube Shorts", duration: "15-60s", price: "$179" },
          { name: "TikTok Videos", duration: "15-90s", price: "$169" },
          { name: "Instagram Stories", duration: "15-30s", price: "$149" },
        ],
      },
      {
        title: "Long Form",
        icon: "🎬",
        gradient: "from-purple-500 to-pink-500",
        services: [
          { name: "Documentary Films", duration: "10-60min", price: "Custom" },
          { name: "Corporate Videos", duration: "2-10min", price: "$799" },
          { name: "Feature Films", duration: "60+ min", price: "Custom" },
          { name: "YouTube Episodes", duration: "5-20min", price: "$499" },
        ],
      },
      {
        title: "Special Events",
        icon: "💝",
        gradient: "from-rose-500 to-pink-500",
        services: [
          { name: "Wedding Films", duration: "3-10min", price: "$1299" },
          { name: "Birthday Celebrations", duration: "2-5min", price: "$399" },
          { name: "Anniversary Videos", duration: "2-8min", price: "$599" },
          { name: "Baby Showers", duration: "2-5min", price: "$349" },
        ],
      },
      {
        title: "Commercial",
        icon: "🏢",
        gradient: "from-amber-500 to-orange-500",
        services: [
          { name: "Product Commercials", duration: "30-120s", price: "$899" },
          { name: "Brand Stories", duration: "1-3min", price: "$699" },
          { name: "Testimonial Videos", duration: "1-2min", price: "$299" },
          { name: "Explainer Videos", duration: "1-3min", price: "$799" },
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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 py-2"
          : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl py-3"
      } border-b border-gray-200/50 dark:border-gray-700/50`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Compact Logo */}
          <Link to="/" className="group flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-lg transform group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
            </div>
            <div className="text-xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t("brand")}
              </span>
            </div>
          </Link>

          {/* Compact Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNav.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() =>
                  item.hasMega && setActiveMegaMenu(item.name.toLowerCase())
                }
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  to={item.path}
                  className={`relative px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center space-x-1.5 ${
                    location.pathname === item.path
                      ? "text-white"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  }`}
                >
                  {location.pathname === item.path && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
                  )}
                  <span className="relative text-base">{item.icon}</span>
                  <span className="relative">{item.name}</span>
                  {location.pathname !== item.path && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  )}
                </Link>

                {/* Compact Showcase Mega Menu */}
                {activeMegaMenu === "showcase" &&
                  item.name.toLowerCase() === "showcase" && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[720px]">
                      <div className="relative bg-white/98 dark:bg-gray-800/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-5 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                        <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white dark:bg-gray-800 rotate-45 border-l border-t border-gray-200 dark:border-gray-700"></div>

                        <div className="grid grid-cols-3 gap-4">
                          {/* Left Section - Compact */}
                          <div>
                            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                              <div className="w-0.5 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-1.5"></div>
                              {showcaseData.left.title}
                            </h3>
                            <div className="space-y-1">
                              {showcaseData.left.items.map((item, idx) => (
                                <Link
                                  key={idx}
                                  to={item.path}
                                  className="group/item relative block p-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-200"
                                >
                                  <div
                                    className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b ${item.color} opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 rounded-r-full`}
                                  ></div>
                                  <div className="font-medium text-gray-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors text-xs">
                                    {item.name}
                                  </div>
                                  <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                                    {item.description}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Middle Section - Compact Videos */}
                          <div className="border-l border-r border-gray-200 dark:border-gray-700 px-4">
                            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                              <div className="w-0.5 h-3 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-1.5"></div>
                              {showcaseData.middle.title}
                            </h3>
                            <div className="space-y-2">
                              {showcaseData.middle.content.map((video, idx) => (
                                <div
                                  key={idx}
                                  className="group/video cursor-pointer"
                                >
                                  <div className="relative overflow-hidden rounded-lg transition-all duration-200 hover:shadow-md">
                                    <div
                                      className={`h-16 bg-gradient-to-br ${video.thumbnail} flex items-center justify-center relative overflow-hidden group-hover/video:scale-105 transition-transform duration-300`}
                                    >
                                      <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/10 transition-colors duration-200"></div>
                                      <div className="relative w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover/video:scale-110 transition-transform duration-200">
                                        <svg
                                          className="w-4 h-4 text-white ml-0.5"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                        </svg>
                                      </div>
                                    </div>
                                    <div className="p-1.5">
                                      <div className="font-medium text-gray-900 dark:text-white text-[11px] leading-tight group-hover/video:text-purple-600 dark:group-hover/video:text-purple-400 transition-colors">
                                        {video.title}
                                      </div>
                                      <div className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5 flex items-center space-x-1.5">
                                        <span>⏱ {video.duration}</span>
                                        <span>•</span>
                                        <span>👁 {video.views}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right Section - Compact */}
                          <div>
                            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                              <div className="w-0.5 h-3 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-1.5"></div>
                              {showcaseData.right.title}
                            </h3>
                            <div className="space-y-1">
                              {showcaseData.right.items.map((item, idx) => (
                                <Link
                                  key={idx}
                                  to={item.path}
                                  className="group/item relative block p-2 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-200"
                                >
                                  <div
                                    className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b ${item.color} opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 rounded-r-full`}
                                  ></div>
                                  <div className="font-medium text-gray-900 dark:text-white group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors text-xs">
                                    {item.name}
                                  </div>
                                  <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                                    {item.description}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Compact CTA */}
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <button className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 rounded-lg text-xs font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center space-x-1.5">
                            <span>🎥</span>
                            <span>View All Showcase</span>
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Compact Services Mega Menu */}
                {activeMegaMenu === "services" &&
                  item.name.toLowerCase() === "services" && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[780px]">
                      <div className="relative bg-white/98 dark:bg-gray-800/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-5 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                        <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white dark:bg-gray-800 rotate-45 border-l border-t border-gray-200 dark:border-gray-700"></div>

                        <div className="grid grid-cols-4 gap-3">
                          {servicesData.categories.map((category, index) => (
                            <div key={index} className="group/cat">
                              <div className="flex items-center mb-2">
                                <div
                                  className={`w-7 h-7 bg-gradient-to-br ${category.gradient} rounded-lg flex items-center justify-center text-sm mr-2 group-hover/cat:scale-110 transition-transform duration-200 shadow-md`}
                                >
                                  {category.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-xs leading-tight">
                                  {category.title}
                                </h3>
                              </div>
                              <div className="space-y-1">
                                {category.services.map((service, sIdx) => (
                                  <div
                                    key={sIdx}
                                    className="group/service p-1.5 rounded-md hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200/50 dark:hover:border-gray-600"
                                  >
                                    <div className="font-medium text-gray-900 dark:text-white text-[11px] leading-tight group-hover/service:text-blue-600 dark:group-hover/service:text-blue-400 transition-colors">
                                      {service.name}
                                    </div>
                                    <div className="flex justify-between items-center text-[9px] mt-0.5">
                                      <span className="text-gray-500 dark:text-gray-400">
                                        ⏱ {service.duration}
                                      </span>
                                      <span className="text-green-600 dark:text-green-400 font-bold px-1.5 py-0.5 bg-green-50 dark:bg-green-900/20 rounded">
                                        {service.price}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Compact Featured Banner */}
                        <div className="mt-4 relative overflow-hidden p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl text-white group/featured hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover/featured:translate-x-[200%] transition-transform duration-1000"></div>
                          <div className="relative flex justify-between items-center">
                            <div className="flex-1">
                              <div className="text-[10px] opacity-90 flex items-center space-x-1">
                                <span className="animate-pulse">🔥</span>
                                <span>{servicesData.featured.title}</span>
                              </div>
                              <div className="font-bold text-base mt-0.5 mb-1">
                                {servicesData.featured.service}
                              </div>
                              <div className="text-[10px] opacity-90">
                                {servicesData.featured.description}
                              </div>
                              <div className="text-[9px] mt-1">
                                {servicesData.featured.rating}
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <div className="font-bold text-lg mb-1">
                                {servicesData.featured.price}
                              </div>
                              <button className="bg-white text-blue-600 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center space-x-1">
                                <span>Get Quote</span>
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* Compact Right Controls */}
          <div className="flex items-center space-x-2">
            {/* Compact CTA Button */}
            <button className="relative group/cta bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:shadow-xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 hidden md:flex items-center space-x-1.5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"></div>
              <span className="relative text-base">🎥</span>
              <span className="relative">Get Started</span>
              <svg
                className="relative w-4 h-4 group-hover/cta:translate-x-0.5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>

            {/* Compact Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative p-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:shadow-md transition-all duration-300 group/dark"
              aria-label="Toggle dark mode"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-blue-900 dark:to-purple-900 opacity-0 group-hover/dark:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              {darkMode ? (
                <svg
                  className="relative w-4 h-4 text-yellow-500 transform group-hover/dark:rotate-180 transition-transform duration-500"
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
                <svg
                  className="relative w-4 h-4 text-gray-700 group-hover/dark:text-purple-600 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Compact Language Switcher */}
            <div className="relative group/lang">
              <button className="p-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:shadow-md transition-all duration-300 flex items-center space-x-1 text-xs font-bold min-w-[60px] justify-center group-hover/lang:scale-105">
                <span className="text-sm">🌐</span>
                <span>{i18n.language === "en" ? "EN" : "BN"}</span>
              </button>

              <div className="absolute top-full right-0 mt-2 w-28 bg-white/98 dark:bg-gray-800/98 backdrop-blur-2xl rounded-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 py-1 opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-300 transform origin-top scale-95 group-hover/lang:scale-100">
                <button
                  onClick={() => changeLanguage("en")}
                  className={`w-full px-3 py-2 text-xs text-left transition-all duration-200 flex items-center space-x-2 ${
                    i18n.language === "en"
                      ? "text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 dark:text-blue-400 font-bold"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-base">🇬🇧</span>
                  <span>English</span>
                </button>
                <button
                  onClick={() => changeLanguage("bn")}
                  className={`w-full px-4 py-2.5 text-sm text-left transition-all duration-200 flex items-center space-x-3 ${
                    i18n.language === "bn"
                      ? "text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 dark:text-blue-400 font-bold"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-xl">🇧🇩</span>
                  <span>বাংলা</span>
                </button>
              </div>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:shadow-lg transition-all duration-300 group/mobile"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${
                  mobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-in slide-in-from-top duration-300">
            <div className="space-y-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
              {mainNav.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-white dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}

              <div className="pt-3 mt-3 border-t border-gray-300 dark:border-gray-600">
                <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>🎥</span>
                  <span>Get Started</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
