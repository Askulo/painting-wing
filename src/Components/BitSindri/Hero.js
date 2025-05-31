"use client";

import React from "react";
import { useRef, Suspense, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const ref = useRef(null);
  const [isRestoringState, setIsRestoringState] = useState(false);
  
  // Add refs for scroll reveal sections
  const infoSectionRef = useRef(null);
  const featuredSectionRef = useRef(null);
  const statsSectionRef = useRef(null);
  
  // Track if sections are in view
  const infoSectionInView = useInView(infoSectionRef, { once: true, amount: 0.3 });
  const featuredSectionInView = useInView(featuredSectionRef, { once: true, amount: 0.3 });
  const statsSectionInView = useInView(statsSectionRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleBack = () => {
    try {
      // Save current UI state
      const stateToSave = {
        scrollPosition: window.scrollY,
        scrollYProgress: scrollYProgress.get(),
        pathname: window.location.pathname,
        timestamp: Date.now(),
      };
      sessionStorage.setItem("previousPageState", JSON.stringify(stateToSave));
      router.back();
    } catch (error) {
      console.error("Error saving state:", error);
      // Fallback to simple navigation if state saving fails
      router.back();
    }
  };

  useEffect(() => {
    try {
      const savedState = sessionStorage.getItem("previousPageState");
      if (savedState && !isRestoringState) {
        setIsRestoringState(true);
        const parsedState = JSON.parse(savedState);

        // Only restore if state is less than 5 minutes old
        if (Date.now() - parsedState.timestamp < 300000) {
          // Restore scroll position with a small delay to ensure content is rendered
          setTimeout(() => {
            window.scrollTo(0, parsedState.scrollPosition);
            // Restore other UI state as needed
            scrollYProgress.set(parsedState.scrollYProgress);
            setIsRestoringState(false);
          }, 100);
        }
        // Clean up
        sessionStorage.removeItem("previousPageState");
      }
    } catch (error) {
      console.error("Error restoring state:", error);
      setIsRestoringState(false);
    }
  }, [scrollYProgress, isRestoringState]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <section
        id="home"
        ref={ref}
        className="relative h-screen bg-[#26282A] flex items-center justify-center overflow-hidden"
      >
        {/* Content */}
        <motion.div
          className="relative z-10 text-center font-sans px-4 max-w-7xl"
          style={{ y, opacity }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-6"
          >
           Birsa Institute of Technology, Sindri
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-8"
          >
            Empowering Minds, Engineering Futures
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://www.bitsindri.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium"
              >
                Visit Site
              </Button>
            </a>

            <a
              href="https://youtu.be/MmA5Y7S_aHk?si=B3PUX3slVZu3PFMC"
              target="_blank"
              rel="noopener noreferrer"
            >
            <Button
              size="lg"
              variant="outline"
              className="bg-white/20 backdrop-blur-sm text-white border-white hover:bg-white/30 font-medium"
            >
              Explore More
            </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <ChevronDown className="h-8 w-8 text-white drop-shadow-md" />
        </motion.div>
      </section>

      {/* About Section with Scroll Reveal */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={infoSectionRef}
            initial="hidden"
            animate={infoSectionInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              About BIT Sindri
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-24 h-1 bg-orange-600 mx-auto mb-8"
            ></motion.div>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700 max-w-3xl mx-auto"
            >
              Established in 1949,Birsa Institute of Technology, Sindri is one of the oldest engineering colleges in India. 
              The institute offers undergraduate and postgraduate programs in various engineering disciplines,
              fostering excellence in education, research, and innovation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={featuredSectionRef}
            initial="hidden"
            animate={featuredSectionInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="mb-12 text-center"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Featured Programs
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="w-24 h-1 bg-orange-600 mx-auto mb-8"
            ></motion.div>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={featuredSectionInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Computer Science & Engineering",
                description: "Learn algorithms, software engineering, and cutting-edge technologies."
              },
              {
                title: "Mechanical Engineering",
                description: "Study thermodynamics, manufacturing processes, and machine design."
              },
              {
                title: "Electrical Engineering",
                description: "Master power systems, control theory, and electrical machines."
              }
            ].map((program, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{program.title}</h3>
                <p className="text-gray-700">{program.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={statsSectionRef}
            variants={staggerContainer}
            initial="hidden"
            animate={statsSectionInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "1949", label: "Established" },
              { value: "12+", label: "Departments" },
              { value: "95%", label: "Placement Rate" },
              { value: "20,000+", label: "Alumni Network" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-4"
              >
                <p className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-lg uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}