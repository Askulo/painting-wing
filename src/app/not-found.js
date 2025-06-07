"use client";
import React, { useState, useRef, useEffect } from 'react';

const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = (e.clientY - centerY) / 10;
    const rotateY = (centerX - e.clientX) / 10;
    
    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-red-700 flex items-center justify-center overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-black rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-36 sm:w-48 md:w-72 h-36 sm:h-48 md:h-72 bg-black rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div 
        ref={containerRef}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`,
          transition: isHovered ? 'none' : 'transform 0.5s ease-out',
        }}
      >
        {/* Error Page Label */}
        <div className="mb-4 sm:mb-6">
          <span className="text-white text-xs sm:text-sm font-bold tracking-widest uppercase opacity-80">
            404
          </span>
          <br />
          <span className="text-white text-[10px] sm:text-xs font-medium tracking-widest uppercase opacity-60">
            Error Page
          </span>
        </div>

        {/* Large 404 Text */}
        <div className="relative mb-8 sm:mb-12">
          <h1 
            className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[25rem] font-black text-transparent bg-clip-text leading-none select-none"
            style={{
              WebkitTextStroke: '2px rgba(0, 0, 0, 0.3)',
              textShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
              transform: `translateZ(${isHovered ? '50px' : '0px'})`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            404
          </h1>
          
          {/* Floating shadow effect */}
          <div 
            className="absolute inset-0 text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[25rem] font-black text-black opacity-20 leading-none select-none"
            style={{
              transform: `translate(6px, 6px) translateZ(-20px)`,
              filter: 'blur(1px)',
            }}
          >
            404
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 tracking-wide px-2">
            SORRY, WE COULDN&apos;T FIND THIS PAGE
          </h2>
          
          {/* Decorative line with "GO BACK" */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6">
            <div className="h-px bg-white opacity-40 flex-1 max-w-16 sm:max-w-24"></div>
            <span className="text-white text-xs sm:text-sm font-medium tracking-wider opacity-70">
              GO BACK
            </span>
            <div className="h-px bg-white opacity-40 flex-1 max-w-16 sm:max-w-24"></div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          className="group relative px-6 sm:px-8 py-2 sm:py-3 bg-white text-red-600 font-bold text-xs sm:text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:bg-red-600 hover:text-white border-2 border-transparent hover:border-white"
          style={{
            transform: `translateZ(${isHovered ? '30px' : '0px'})`,
            transition: 'transform 0.3s ease-out, background-color 0.3s ease, color 0.3s ease',
          }}
          onClick={() => window.history.back()}
        >
          <span className="relative z-10">Return Home</span>
          <div className="absolute inset-0 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 text-center px-4">
        <p className="text-white text-[10px] sm:text-xs opacity-50 tracking-wider">
          THE PAGE YOU&apos;RE LOOKING FOR DOESN&apos;T EXIST
        </p>
        <p className="text-white text-[9px] sm:text-xs opacity-30 tracking-wider mt-1">
          LOST OR A TYPO IN THE URL ADDRESS
        </p>
      </div>

      {/* Animated particles */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => {
            const positions = [
              { left: 15, top: 25 },
              { left: 75, top: 15 },
              { left: 85, top: 70 },
              { left: 25, top: 85 },
              { left: 60, top: 40 },
              { left: 45, top: 60 }
            ];
            
            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white opacity-20 rounded-full animate-pulse"
                style={{
                  left: `${positions[i].left}%`,
                  top: `${positions[i].top}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2.5 + (i * 0.3)}s`,
                }}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotFoundPage;