import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
// import "antd/dist/reset.css";

import { useTheme } from "../contexts/ThemeContext";

const VIDEOS = [
  { id: "yqaLSlPOUxM", title: "Epic Cinematic", category: "Action" },
  { id: "CEdGKeo85bk", title: "Nature's Beauty", category: "Documentary" },
  { id: "kXYiU_JCYtU", title: "Urban Stories", category: "Lifestyle" },
  { id: "ScMzIvxBSi4", title: "Travel Adventure", category: "Travel" },
  { id: "ysz5S6PUM-U", title: "Creative Vision", category: "Art" },
];

const Hero = () => {
  const { getThemeClass } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Auto-play carousel
  useEffect(() => {
    if (!isModalOpen) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isModalOpen]);

  // Navigate carousel
  const navigate = (direction) => {
    if (direction === "next") {
      setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
    } else {
      setActiveIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
    }
  };

  // Open modal and play video
  const playVideo = (video, index) => {
    setActiveIndex(index);
    setPlayingVideo(video);
    setIsModalOpen(true);
    setIsPlayerReady(false);

    // Clear autoplay when modal opens
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsPlayerReady(false);
    
    // Destroy YouTube player
    if (playerRef.current && playerRef.current.destroy) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
    
    setPlayingVideo(null);
  };

  // Initialize YouTube player when modal opens
  useEffect(() => {
    if (isModalOpen && playingVideo) {
      const initPlayer = () => {
        if (window.YT && window.YT.Player) {
          if (playerRef.current && playerRef.current.destroy) {
            playerRef.current.destroy();
          }

          playerRef.current = new window.YT.Player("yt-player-antd", {
            height: "100%",
            width: "100%",
            videoId: playingVideo.id,
            playerVars: {
              autoplay: 1,
              controls: 1,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
            },
            events: {
              onReady: (event) => {
                console.log("Player ready");
                setIsPlayerReady(true);
                event.target.playVideo();
              },
              onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.ENDED) {
                  setTimeout(handleModalClose, 2000);
                }
              },
            },
          });
        } else {
          // Retry if API not ready
          setTimeout(initPlayer, 100);
        }
      };

      const timer = setTimeout(initPlayer, 500);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, playingVideo]);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      // Set up callback for when API is ready
      window.onYouTubeIframeAPIReady = () => {
        console.log("YouTube API Ready");
      };
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isModalOpen) {
        if (e.key === "ArrowLeft") navigate("prev");
        if (e.key === "ArrowRight") navigate("next");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen]);

  return (
    <div
      className={`relative w-full min-h-screen overflow-hidden ${getThemeClass(
        "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100",
        "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"
      )}`}
    >
      {/* Subtle grid background */}
      <div
        className={`absolute inset-0 ${getThemeClass(
          "opacity-5",
          "opacity-10"
        )}`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Animated glow orbs */}
      <div
        className={`absolute top-20 left-20 w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse ${getThemeClass(
          "bg-blue-300/20",
          "bg-blue-500/10"
        )}`}
      ></div>
      <div
        className={`absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full blur-[120px] ${getThemeClass(
          "bg-purple-300/20",
          "bg-purple-500/10"
        )}`}
        style={{
          animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          animationDelay: "2s",
        }}
      ></div>

      <div className="relative z-10 w-full min-h-screen flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 lg:pr-12">
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${getThemeClass(
                  "bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-300/50",
                  "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20"
                )}`}
              >
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${getThemeClass(
                    "bg-blue-600",
                    "bg-blue-400"
                  )}`}
                ></div>
                <span
                  className={`text-sm font-medium ${getThemeClass(
                    "text-blue-700",
                    "text-blue-300"
                  )}`}
                >
                  Visual Storyteller
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  <span
                    className={getThemeClass("text-gray-800", "text-white/90")}
                  >
                    Creating
                  </span>
                  <br />
                  <span
                    className={getThemeClass(
                      "bg-gradient-to-r from-blue-800 via-purple-400 to-pink-600 bg-clip-text text-transparent",
                      "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    )}
                  >
                    Cinematic Magic
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p
                className={`text-lg md:text-xl leading-relaxed max-w-xl ${getThemeClass(
                  "text-slate-600",
                  "text-slate-400"
                )}`}
              >
                Transforming ideas into captivating visual experiences through
                expert editing, color grading, and storytelling.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => playVideo(VIDEOS[activeIndex], activeIndex)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Featured
                  </span>
                </button>

                <button
                  className={`px-8 py-4 backdrop-blur-sm rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${getThemeClass(
                    "bg-slate-200/80 border border-slate-300 text-gray-800 hover:bg-slate-300/90 hover:border-slate-400",
                    "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                  )}`}
                >
                  View All Projects
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Stats */}
              <div
                className={`flex items-center gap-8 pt-3 border-t ${getThemeClass(
                  "border-blue-400",
                  "border-white/5"
                )}`}
              >
                <div>
                  <div
                    className={getThemeClass(
                      "text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
                      "text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                    )}
                  >
                    50+
                  </div>
                  <div
                    className={`text-sm mt-1 ${getThemeClass(
                      "text-slate-500",
                      "text-slate-500"
                    )}`}
                  >
                    Projects
                  </div>
                </div>
                <div
                  className={`w-px h-12 ${getThemeClass(
                    "bg-blue-300",
                    "bg-white/10"
                  )}`}
                ></div>
                <div>
                  <div
                    className={getThemeClass(
                      "text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
                      "text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                    )}
                  >
                    25+
                  </div>
                  <div
                    className={`text-sm mt-1 ${getThemeClass(
                      "text-slate-500",
                      "text-slate-500"
                    )}`}
                  >
                    Clients
                  </div>
                </div>
                <div
                  className={`w-px h-12 ${getThemeClass(
                    "bg-blue-300",
                    "bg-white/10"
                  )}`}
                ></div>
                <div>
                  <div
                    className={getThemeClass(
                      "text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent",
                      "text-4xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent"
                    )}
                  >
                    5+
                  </div>
                  <div
                    className={`text-sm mt-1 ${getThemeClass(
                      "text-slate-500",
                      "text-slate-500"
                    )}`}
                  >
                    Years
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Modern Card Carousel */}
            <div className="relative h-[600px] flex items-center justify-center">
              <div className="relative w-full max-w-[600px] h-full flex items-center">
                {/* Cards Stack */}
                <div
                  className="relative w-full h-[400px] flex items-center justify-center"
                  style={{ perspective: "1200px" }}
                >
                  {VIDEOS.map((video, index) => {
                    const offset = index - activeIndex;
                    const absOffset = Math.abs(offset);
                    const isActive = index === activeIndex;

                    return (
                      <div
                        key={`${video.id}-${index}`}
                        className="absolute cursor-pointer group"
                        style={{
                          transform: `
                            translateX(${offset * 100}px) 
                            translateZ(${-absOffset * 100}px)
                            scale(${isActive ? 1 : 0.9 - absOffset * 0.05})
                            rotateY(${offset * 5}deg)
                          `,
                          opacity:
                            absOffset > 2
                              ? 0
                              : isActive
                              ? 1
                              : 0.6 - absOffset * 0.15,
                          zIndex: 10 - absOffset,
                          transition:
                            "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                          transformStyle: "preserve-3d",
                        }}
                        onClick={() => playVideo(video, index)}
                      >
                        <div
                          className={`relative w-[400px] h-[260px] rounded-2xl overflow-hidden shadow-2xl ${getThemeClass(
                            "bg-slate-200",
                            "bg-slate-900"
                          )} ${
                            isActive
                              ? "ring-2 ring-blue-400/50 shadow-blue-500/30"
                              : ""
                          }`}
                        >
                          {/* Thumbnail */}
                          <img
                            src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            draggable={false}
                          />

                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                          {/* Category badge */}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-blue-500/90 backdrop-blur-md rounded-lg text-xs text-white font-semibold shadow-lg">
                              {video.category}
                            </span>
                          </div>

                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute top-4 right-4">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50"></div>
                            </div>
                          )}

                          {/* Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <h3 className="text-white font-bold text-xl mb-1.5">
                              {video.title}
                            </h3>
                            <p className="text-blue-300 text-sm font-medium">
                              Click to watch
                            </p>
                          </div>

                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50 backdrop-blur-sm">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-2xl">
                              <svg
                                className="w-9 h-9 text-white ml-1"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={() => navigate("prev")}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-xl ${getThemeClass(
                    "bg-white/80 border border-slate-200 text-gray-800 hover:bg-white hover:scale-110",
                    "bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-110"
                  )}`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => navigate("next")}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-xl ${getThemeClass(
                    "bg-white/80 border border-slate-200 text-gray-800 hover:bg-white hover:scale-110",
                    "bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-110"
                  )}`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2.5">
                  {VIDEOS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === activeIndex
                          ? "w-10 h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50"
                          : getThemeClass(
                              "w-2.5 h-2.5 bg-slate-400 hover:bg-slate-600",
                              "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
                            )
                      }`}
                    />
                  ))}
                </div>

                {/* Hint text */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
                  <p
                    className={`text-sm flex items-center gap-2 ${getThemeClass(
                      "text-slate-500",
                      "text-slate-500"
                    )}`}
                  >
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
                        d="M15 19l-7-7 7-7M9 19l7-7-7-7"
                      />
                    </svg>
                    Navigate | Click to play
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ant Design Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={600}
        centered
        closeIcon={
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-xl">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        }
        styles={{
          mask: { backdropFilter: "blur(8px)" },
          content: {
             background:  `${getThemeClass(
                      "linear-gradient(to bottom right, #4f177b, #7b1b6c)",
                      "linear-gradient(to bottom right, #0f172a, #1e1b4b)"
                    )}`, // or any light fallback
            padding: "32px",
            borderRadius: "24px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        {/* Modal Header */}
        <div className="mb-6 text-center space-y-3">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {playingVideo?.title}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-sm font-medium text-blue-300">
              {playingVideo?.category}
            </span>
            <span className="text-slate-400 text-sm flex items-center gap-2">
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Press ESC to close
            </span>
          </div>
        </div>

        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black ring-2 ring-white/10">
          <div
            className="relative w-full bg-black"
            style={{ paddingBottom: "56.25%" }}
          >
            {/* Loading State */}
            {!isPlayerReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-slate-400 font-medium">
                    Loading video...
                  </p>
                </div>
              </div>
            )}

            {/* YouTube Player Container */}
            <div
              id="yt-player-antd"
              className="absolute inset-0 w-full h-full"
            ></div>
          </div>
        </div>

        {/* Video Info Footer */}
        <div className="mt-6 flex items-center justify-between text-slate-400 text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
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
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Click video for controls
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span>Video ready</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Hero;