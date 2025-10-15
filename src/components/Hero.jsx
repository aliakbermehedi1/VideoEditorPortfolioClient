import React, { useEffect, useRef, useState } from "react";

const VIDEOS = [
  { id: "yqaLSlPOUxM", title: "Epic Cinematic", category: "Action" },
  { id: "CEdGKeo85bk", title: "Nature's Beauty", category: "Documentary" },
  { id: "kXYiU_JCYtU", title: "Urban Stories", category: "Lifestyle" },
  { id: "ScMzIvxBSi4", title: "Travel Adventure", category: "Travel" },
  { id: "ysz5S6PUM-U", title: "Creative Vision", category: "Art" },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const playerRef = useRef(null);
  const autoPlayRef = useRef(null);
  const modalRef = useRef(null);

  // Auto-play carousel
  useEffect(() => {
    if (!isPlaying && !isModalVisible) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPlaying, isModalVisible]);

  // Navigate carousel
  const navigate = (direction) => {
    if (direction === "next") {
      setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
    } else {
      setActiveIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
    }
  };

  // Play video
  const playVideo = (video, index) => {
    setActiveIndex(index);
    setPlayingVideo(video);
    setIsModalVisible(true);
    setIsClosing(false);

    // Clear autoplay when modal opens
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  // Close video with animation
  const closeVideo = () => {
    setIsClosing(true);
    setIsPlaying(false);

    setTimeout(() => {
      setIsModalVisible(false);
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      setPlayingVideo(null);
      setIsClosing(false);
    }, 300);
  };

  // Initialize YouTube player when modal becomes visible
  useEffect(() => {
    if (isModalVisible && playingVideo && !isClosing) {
      const timer = setTimeout(() => {
        setIsPlaying(true);

        if (window.YT && window.YT.Player) {
          if (playerRef.current && playerRef.current.destroy) {
            playerRef.current.destroy();
          }

          playerRef.current = new window.YT.Player("yt-player", {
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
              onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.ENDED) {
                  // Auto-close when video ends
                  setTimeout(closeVideo, 2000);
                }
              },
            },
          });
        }
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isModalVisible, playingVideo, isClosing]);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isModalVisible && e.key === "Escape") {
        closeVideo();
      } else if (!isModalVisible) {
        if (e.key === "ArrowLeft") navigate("prev");
        if (e.key === "ArrowRight") navigate("next");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalVisible]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        isModalVisible
      ) {
        closeVideo();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalVisible]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Animated glow orbs */}
      <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"
        style={{
          animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          animationDelay: "2s",
        }}
      ></div>

      <div className="relative z-10 w-full min-h-screen flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - unchanged */}
            <div className="space-y-8 lg:pr-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-blue-300 text-sm font-medium">
                  Visual Storyteller
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  <span className="text-white/90">Creating</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Cinematic Magic
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">
                Transforming ideas into captivating visual experiences through
                expert editing, color grading, and storytelling.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
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

                <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2">
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
              <div className="flex items-center gap-8 pt-8 border-t border-white/5">
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    50+
                  </div>
                  <div className="text-sm text-slate-500 mt-1">Projects</div>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    25+
                  </div>
                  <div className="text-sm text-slate-500 mt-1">Clients</div>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                    5+
                  </div>
                  <div className="text-sm text-slate-500 mt-1">Years</div>
                </div>
              </div>
            </div>

            {/* Right - Modern Card Carousel - unchanged */}
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
                          className={`relative w-[400px] h-[260px] rounded-2xl overflow-hidden bg-slate-900 shadow-2xl ${
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
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-xl"
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
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-xl"
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
                          : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                {/* Hint text */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-slate-500 text-sm flex items-center gap-2">
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

      {/* Enhanced Video Dialog/Modal */}
      {isModalVisible && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
            isClosing
              ? "bg-black/0 backdrop-blur-0"
              : "bg-black/90 backdrop-blur-xl"
          }`}
          style={{
            animation: isClosing ? "none" : "fadeIn 0.5s ease-out",
          }}
        >
          <div
            ref={modalRef}
            className={`relative w-full max-w-6xl mx-auto transition-all duration-500 ${
              isClosing
                ? "opacity-0 scale-95 translate-y-8"
                : "opacity-100 scale-100 translate-y-0"
            }`}
            style={{
              animation: isClosing
                ? "none"
                : "modalSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Enhanced Close button */}
            <button
              onClick={closeVideo}
              className="absolute -top-4 -right-4 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white hover:scale-110 hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 group shadow-xl border border-red-400/30"
            >
              <svg
                className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
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
            </button>

            {/* Dialog Header */}
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

            {/* Video Container with Enhanced Styling */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black ring-2 ring-white/10 ring-inset">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                {/* Loading State */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-slate-400 font-medium">
                        Loading video...
                      </p>
                    </div>
                  </div>
                )}

                {/* YouTube Player */}
                <div
                  id="yt-player"
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isPlaying ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>

              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50"></div>
            </div>

            {/* Video Controls Info */}
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
          </div>
        </div>
      )}

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
