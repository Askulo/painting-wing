import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Carousel = ({
  images = ["/shades/slider1.jpg", "/shades/slider2.jpg"],
  autoPlay = true,
  autoPlayInterval = 9000,
  width = "80vw",
  height = "50vh",
}) => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!autoPlay) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearTimeout(timeoutRef.current);
  }, [current, autoPlay]);

  return (
    <section className="w-screen h-[65vh] md:h-[80vh] bg-[#EFEAE3] mt-20 overflow-hidden">
      <div className="pl-[10vw]" data-aos='fade-right' data-aos-duration='1500'>
        <h2 className="text-[2rem] md:text-5xl font-medium capitalize">
          participant feedback
        </h2>
        <h2 className="text-[1.8rem] md:text-4xl font-medium text-[#999] capitalize md:pb-5">
          impressions from SHADES
        </h2>
      </div>

      <div className="pt-5 md:pt-5 flex items-center justify-center">
        <div
          className="relative overflow-hidden rounded-[20px] bg-[#e2ddd6]"
          style={{ width, height }}
        >
          <div className="relative w-full h-full">
            {images.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`slide-${i}`}
                loading="lazy"
                initial={false}
                animate={{ x: `${(i - current) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute w-full h-full object-cover top-0 left-0 will-change-transform"
                style={{
                  backfaceVisibility: "hidden",
                }}
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 px-4 py-1 text-sm font-semibold rounded-full z-20 bg-[#d44829] hover:bg-[#D25940] text-white"
          >
            Prev
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 px-4 py-1 text-sm font-semibold rounded-full z-20 bg-[#d44829] hover:bg-[#D25940] text-white"
          >
            Next
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, i) => (
              <motion.div
                key={i}
                onClick={() => setCurrent(i)}
                animate={{
                  width: current === i ? 20 : 10,
                  backgroundColor: current === i ? "#EF4444" : "#9CA3AF",
                }}
                transition={{ duration: 0.3 }}
                className="h-[10px] rounded-full cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
