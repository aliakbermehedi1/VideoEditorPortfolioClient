// src/components/ScrollToTop.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDark } = useTheme();

  // Show button after 300px scroll
  const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);

  // Calculate scroll %
  const calculateScrollProgress = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setScrollProgress((winScroll / height) * 100);
  };

  // Smooth scroll
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("scroll", calculateScrollProgress);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("scroll", calculateScrollProgress);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`group relative w-14 h-14 rounded-full overflow-hidden 
          flex items-center justify-center transition-all duration-500 ease-out
          ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}
          ${isDark ? "bg-gray-900/60" : "bg-white/70"}
          backdrop-blur-2xl shadow-[0_0_25px_rgba(0,0,0,0.15)] 
          hover:shadow-[0_0_35px_rgba(99,102,241,0.5)]
          border border-white/10 hover:scale-105
        `}
      >
        {/* Rotating lens frame */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-dashed 
            animate-spin-slow opacity-30
            ${isDark ? "border-fuchsia-400/30" : "border-indigo-500/30"}
          `}
        ></div>

        {/* Progress ring - like a timeline circle */}
        <svg
          className="absolute inset-0 w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke={isDark ? "#1f2937" : "#e5e7eb"}
            strokeWidth="3"
          />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="290"
            strokeDashoffset={290 - (scrollProgress * 290) / 100}
            className="transition-all duration-300 ease-linear"
            style={{
              stroke: isDark
                ? "url(#darkTimelineGrad)"
                : "url(#lightTimelineGrad)",
            }}
          />
          <defs>
            <linearGradient id="lightTimelineGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="darkTimelineGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Lens shimmer (soft moving light reflection) */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br 
            from-transparent via-white/20 to-transparent opacity-0 
            group-hover:opacity-40 transition-opacity duration-700`}
        ></div>

        {/* Arrow icon - like “rewind to top” */}
        <svg
          className={`w-6 h-6 z-10 transition-transform duration-300 
            ${
              isDark
                ? "text-blue-300 drop-shadow-[0_0_5px_#2563eb]"
                : "text-indigo-600"
            } 
            group-hover:-translate-y-1`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>

        {/* Modern cinematic REC light (soft blinking) */}
        <div
          className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full 
            ${
              isDark ? "bg-red-500/90" : "bg-red-500/80"
            } shadow-[0_0_10px_rgba(255,0,0,0.7)]`}
          style={{
            animation:
              "blink-record 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1)",
          }}
        ></div>

        {/* Tooltip */}
        <span
          className={`absolute bottom-full mb-2 px-2 py-1 text-xs rounded-md 
            opacity-0 group-hover:opacity-100 transition-all duration-300 
            ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}
            shadow-md whitespace-nowrap`}
        >
          Back to Top 🎬
        </span>
      </button>

      {/* Keyframes for custom record blink */}
      <style>
        {`
          @keyframes blink-record {
            0%, 60%, 100% { opacity: 0.3; transform: scale(0.9); }
            30% { opacity: 1; transform: scale(1.1); }
          }
          .animate-spin-slow {
            animation: spin 8s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ScrollToTop;
