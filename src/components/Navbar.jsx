// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const langDropdownRef = useRef(null);

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
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setLangDropdownOpen(false);
      }
      setActiveMegaMenu(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangDropdownOpen(false);
  };

  const toggleLangDropdown = () => {
    setLangDropdownOpen(!langDropdownOpen);
  };

  // Compact navigation data
  const mainNav = [
    { name: t("home"), path: "/", key: "home" },
    {
      name: t("services"),
      path: "/services",
      hasMega: true,
      key: "services",
    },
    {
      name: t("our_work"),
      path: "/showcase",
      hasMega: true,
      key: "showcase",
    },
    { name: t("who_we_are"), path: "/about", key: "about" },
    { name: t("contact"), path: "/contact", key: "contact" },
  ];

  // Compact language options
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  // Compact showcase data
  const showcaseData = {
    left: {
      title: t("featured_work"),
      items: [
        {
          name: "🎬 " + t("featured_work"),
          path: "/featured",
          description: "Award-winning projects",
          color: "from-amber-400 to-orange-500",
        },
        {
          name: "🔥 " + t("latest_projects"),
          path: "/latest",
          description: "Recent projects",
          color: "from-red-400 to-pink-500",
        },
        {
          name: "💼 " + t("clients"),
          path: "/clients",
          description: "120+ clients",
          color: "from-blue-400 to-cyan-500",
        },
        {
          name: "📰 " + t("our_news"),
          path: "/news",
          description: "Updates & blogs",
          color: "from-purple-400 to-pink-500",
        },
      ],
    },
    middle: {
      title: "Spotlight Reel",
      content: [
        {
          title: "Wedding Film",
          duration: "2:30",
          views: "15K",
          thumbnail: "from-rose-400 to-pink-600",
        },
        {
          title: "Brand Story",
          duration: "1:45",
          views: "8.2K",
          thumbnail: "from-blue-400 to-indigo-600",
        },
        {
          title: "Music Video",
          duration: "4:15",
          views: "25K",
          thumbnail: "from-purple-400 to-fuchsia-600",
        },
      ],
    },
    right: {
      title: t("who_we_are"),
      items: [
        {
          name: "👥 " + t("team"),
          path: "/team",
          description: "Meet experts",
          color: "from-green-400 to-emerald-500",
        },
        {
          name: "💼 " + t("career"),
          path: "/career",
          description: "Join team",
          color: "from-indigo-400 to-purple-500",
        },
        {
          name: "📞 " + t("contact_us"),
          path: "/contact",
          description: "Get in touch",
          color: "from-blue-400 to-cyan-500",
        },
        {
          name: "📍 " + t("location"),
          path: "/location",
          description: "Visit studio",
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
          { name: "Social Reels", duration: "15-60s", price: "$199" },
          { name: "YT Shorts", duration: "15-60s", price: "$179" },
          { name: "TikTok", duration: "15-90s", price: "$169" },
          { name: "IG Stories", duration: "15-30s", price: "$149" },
        ],
      },
      {
        title: "Long Form",
        icon: "🎬",
        gradient: "from-purple-500 to-pink-500",
        services: [
          { name: "Documentary", duration: "10-60min", price: "Custom" },
          { name: "Corporate", duration: "2-10min", price: "$799" },
          { name: "Features", duration: "60+ min", price: "Custom" },
          { name: "YT Episodes", duration: "5-20min", price: "$499" },
        ],
      },
      {
        title: "Events",
        icon: "💝",
        gradient: "from-rose-500 to-pink-500",
        services: [
          { name: "Wedding", duration: "3-10min", price: "$1299" },
          { name: "Birthday", duration: "2-5min", price: "$399" },
          { name: "Anniversary", duration: "2-8min", price: "$599" },
          { name: "Baby Shower", duration: "2-5min", price: "$349" },
        ],
      },
      {
        title: "Commercial",
        icon: "🏢",
        gradient: "from-amber-500 to-orange-500",
        services: [
          { name: "Product Ads", duration: "30-120s", price: "$899" },
          { name: "Brand Story", duration: "1-3min", price: "$699" },
          { name: "Testimonials", duration: "1-2min", price: "$299" },
          { name: "Explainer", duration: "1-3min", price: "$799" },
        ],
      },
    ],
    featured: {
      title: "Popular",
      service: "Wedding Films",
      description: "Complete cinematic coverage",
      price: "From $1299",
      rating: "⭐ 4.9/5",
    },
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-sm dark:shadow-gray-900/20 py-1"
          : "bg-white/98 dark:bg-gray-900/98 backdrop-blur-sm py-2"
      } border-b border-gray-200/30 dark:border-gray-700/30`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Compact Logo */}
          <Link
            to="/"
            className="group flex items-center space-x-2 transition-transform duration-200 hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-1.5 rounded-lg transform group-hover:scale-110 transition-all duration-300 shadow">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                {t("brand")}
              </span>
              <span className="text-[9px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                Video Studio
              </span>
            </div>
          </Link>

          {/* Compact Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-0.5">
            {mainNav.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => item.hasMega && setActiveMegaMenu(item.key)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  to={item.path}
                  className={`relative px-3 py-2 rounded-lg font-medium text-xs transition-all duration-200 flex items-center space-x-1.5 group ${
                    location.pathname === item.path
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="text-sm transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="font-semibold">{item.name}</span>

                  {/* Active Indicator */}
                  {location.pathname === item.path && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  )}
                </Link>

                {/* Compact Mega Menus */}
                {activeMegaMenu === item.key && (
                  <div
                    className="absolute top-full left-0 mt-2 w-[700px] animate-in fade-in-0 zoom-in-95 duration-150"
                    onMouseEnter={() => setActiveMegaMenu(item.key)}
                  >
                    <div className="relative bg-white/98 dark:bg-gray-800/98 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/40 dark:border-gray-700/40 p-4">
                      {/* Services Mega Menu */}
                      {item.key === "services" && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-4 gap-3">
                            {servicesData.categories.map((category, index) => (
                              <div key={index} className="group/cat">
                                <div className="flex items-center mb-2">
                                  <div
                                    className={`w-6 h-6 bg-gradient-to-br ${category.gradient} rounded-md flex items-center justify-center text-xs mr-1.5 group-hover/cat:scale-110 transition-transform duration-200 shadow-sm`}
                                  >
                                    {category.icon}
                                  </div>
                                  <h3 className="font-bold text-gray-900 dark:text-white text-xs">
                                    {category.title}
                                  </h3>
                                </div>
                                <div className="space-y-1.5">
                                  {category.services.map((service, sIdx) => (
                                    <div
                                      key={sIdx}
                                      className="group/service p-1.5 rounded-md hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-150 cursor-pointer"
                                    >
                                      <div className="font-medium text-gray-900 dark:text-white text-xs group-hover/service:text-blue-600 dark:group-hover/service:text-blue-400 transition-colors">
                                        {service.name}
                                      </div>
                                      <div className="flex justify-between items-center text-[10px] mt-0.5">
                                        <span className="text-gray-500 dark:text-gray-400">
                                          {service.duration}
                                        </span>
                                        <span className="text-green-600 dark:text-green-400 font-bold px-1.5 py-0.5 bg-green-50 dark:bg-green-900/20 rounded text-[10px]">
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
                          <div className="relative overflow-hidden p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg text-white group/featured hover:shadow-lg transition-all duration-200">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover/featured:translate-x-[200%] transition-transform duration-700"></div>
                            <div className="relative flex justify-between items-center">
                              <div className="flex-1">
                                <div className="text-xs opacity-90 flex items-center space-x-1">
                                  <span className="animate-pulse">🔥</span>
                                  <span>{servicesData.featured.title}</span>
                                </div>
                                <div className="font-bold text-sm mt-0.5 mb-1">
                                  {servicesData.featured.service}
                                </div>
                                <div className="text-xs opacity-90">
                                  {servicesData.featured.description}
                                </div>
                                <div className="text-[10px] mt-1">
                                  {servicesData.featured.rating}
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <div className="font-bold text-base mb-1">
                                  {servicesData.featured.price}
                                </div>
                                <button className="bg-white text-blue-600 px-2.5 py-1 rounded text-xs font-bold hover:bg-gray-100 transition-all duration-150 transform hover:scale-105 shadow flex items-center space-x-1">
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
                      )}

                      {/* Showcase Mega Menu */}
                      {item.key === "showcase" && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            {/* Left Section */}
                            <div>
                              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                                <div className="w-0.5 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-1.5"></div>
                                {showcaseData.left.title}
                              </h3>
                              <div className="space-y-1.5">
                                {showcaseData.left.items.map((item, idx) => (
                                  <Link
                                    key={idx}
                                    to={item.path}
                                    className="group/item relative block p-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-150"
                                  >
                                    <div
                                      className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b ${item.color} opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 rounded-r-full`}
                                    ></div>
                                    <div className="font-semibold text-gray-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors text-xs">
                                      {item.name}
                                    </div>
                                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                                      {item.description}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Middle Section */}
                            <div className="border-l border-r border-gray-200 dark:border-gray-700 px-4">
                              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                                <div className="w-0.5 h-3 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-1.5"></div>
                                {showcaseData.middle.title}
                              </h3>
                              <div className="space-y-2">
                                {showcaseData.middle.content.map(
                                  (video, idx) => (
                                    <div
                                      key={idx}
                                      className="group/video cursor-pointer"
                                    >
                                      <div className="relative overflow-hidden rounded-lg transition-all duration-150 hover:shadow-md">
                                        <div
                                          className={`h-14 bg-gradient-to-br ${video.thumbnail} flex items-center justify-center relative overflow-hidden group-hover/video:scale-105 transition-transform duration-200`}
                                        >
                                          <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/10 transition-colors duration-150"></div>
                                          <div className="relative w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover/video:scale-110 transition-transform duration-200">
                                            <svg
                                              className="w-3 h-3 text-white ml-0.5"
                                              fill="currentColor"
                                              viewBox="0 0 20 20"
                                            >
                                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                            </svg>
                                          </div>
                                        </div>
                                        <div className="p-1.5">
                                          <div className="font-semibold text-gray-900 dark:text-white text-xs leading-tight group-hover/video:text-purple-600 dark:group-hover/video:text-purple-400 transition-colors">
                                            {video.title}
                                          </div>
                                          <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 flex items-center space-x-1.5">
                                            <span>{video.duration}</span>
                                            <span>•</span>
                                            <span>{video.views}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Right Section */}
                            <div>
                              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                                <div className="w-0.5 h-3 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-1.5"></div>
                                {showcaseData.right.title}
                              </h3>
                              <div className="space-y-1.5">
                                {showcaseData.right.items.map((item, idx) => (
                                  <Link
                                    key={idx}
                                    to={item.path}
                                    className="group/item relative block p-2 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-150"
                                  >
                                    <div
                                      className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b ${item.color} opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 rounded-r-full`}
                                    ></div>
                                    <div className="font-semibold text-gray-900 dark:text-white group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors text-xs">
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
                          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                            <button className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 rounded-lg text-xs font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-[1.01] flex items-center justify-center space-x-1.5">
                              <span className="text-sm">🎥</span>
                              <span>View All Showcase</span>
                              <svg
                                className="w-3 h-3 group-hover/cta:translate-x-0.5 transition-transform duration-200"
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
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Compact Right Controls */}
          <div className="flex items-center space-x-2">
            {/* Compact Get Started Button */}
            <button className="relative group/cta bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 hidden md:flex items-center space-x-1.5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-200"></div>
              <span className="relative text-sm">🎬</span>
              <span className="relative">{t("hire_expert")}</span>
            </button>

            {/* Compact Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative p-1.5 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:shadow-md transition-all duration-200 group/dark"
              aria-label="Toggle dark mode"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-blue-900 dark:to-purple-900 opacity-0 group-hover/dark:opacity-100 transition-opacity duration-200 rounded-lg"></div>
              {darkMode ? (
                <svg
                  className="relative w-4 h-4 text-yellow-400 transform group-hover/dark:rotate-180 transition-transform duration-300"
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
                  className="relative w-4 h-4 text-gray-600 group-hover/dark:text-purple-600 transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Enhanced Language Switcher - Proper Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={toggleLangDropdown}
                className="p-1.5 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:shadow-md transition-all duration-200 flex items-center space-x-1 text-xs font-semibold min-w-[50px] justify-center hover:scale-105"
              >
                <span className="text-sm">🌐</span>
                <span>{i18n.language.toUpperCase()}</span>
                <svg
                  className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${
                    langDropdownOpen ? "rotate-180" : ""
                  }`}
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

              {/* Dropdown Menu */}
              {langDropdownOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-32 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200/40 dark:border-gray-700/40 py-1 animate-in fade-in-0 zoom-in-95 duration-150 origin-top-right">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full px-3 py-2 text-left transition-all duration-150 flex items-center space-x-2 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 group ${
                        i18n.language === lang.code
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-semibold"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="flex-1">{lang.name}</span>
                      {i18n.language === lang.code && (
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Compact Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:shadow-md transition-all duration-200 group/mobile"
            >
              <div className="relative w-4 h-4">
                <div
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                    mobileMenuOpen ? "rotate-45 scale-90" : "-translate-y-1.5"
                  }`}
                >
                  <div className="w-3 h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full transition-all duration-200"></div>
                </div>
                <div
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="w-3 h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full"></div>
                </div>
                <div
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                    mobileMenuOpen ? "-rotate-45 scale-90" : "translate-y-1.5"
                  }`}
                >
                  <div className="w-3 h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full transition-all duration-200"></div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Compact Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pb-3 animate-in slide-in-from-top duration-200">
            <div className="space-y-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-3 border border-gray-200 dark:border-gray-600 shadow-md">
              {mainNav.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-semibold transition-all duration-200 group text-sm ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                      : "text-gray-700 hover:bg-white dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              ))}

              <div className="pt-2 mt-2 border-t border-gray-300 dark:border-gray-600">
                <button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:shadow transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-1.5">
                  <span className="text-base">🎬</span>
                  <span>{t("hire_expert")}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
