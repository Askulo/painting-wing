"use client";

import React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Award, BookOpen, Users, Lightbulb, GraduationCap, Building } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  const ref = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const historyRef = useRef(null);
  const facilityRef = useRef(null);
  
  // Track if sections are in view
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const visionInView = useInView(visionRef, { once: true, amount: 0.3 });
  const historyInView = useInView(historyRef, { once: true, amount: 0.3 });
  const facilityInView = useInView(facilityRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const stats = [
    { icon: <BookOpen className="h-8 w-8 text-orange-600" />, value: "1949", label: "Established" },
    { icon: <Users className="h-8 w-8 text-orange-600" />, value: "3000+", label: "Students" },
    { icon: <Award className="h-8 w-8 text-orange-600" />, value: "12", label: "Departments" },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const fadeInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut"
      },
    }),
  };

  return (
    <section id="about" ref={ref} className="py-20 bg-gray-50 ">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" style={{ y }}>
          {/* <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            About BIT Sindri
          </motion.h2> */}
          {/* <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="h-1 bg-orange-600 mx-auto mb-6"
          /> */}
          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl mx-auto text-lg text-gray-700"
          >
            Birsa Institute of Technology, Sindri was established in 1949 and is one of the oldest engineering colleges
            in India. Located in Sindri, Jharkhand, the institute has been consistently producing quality engineers who
            have contributed significantly to the nations development.
          </motion.p> */}
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              className="bg-white  rounded-lg shadow-lg p-8 text-center transform transition-transform hover:scale-105"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-900  mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            ref={historyRef}
            initial="hidden"
            animate={historyInView ? "visible" : "hidden"}
            variants={fadeInLeft}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Legacy</h3>
            <p className="text-gray-700 mb-4">
              BIT Sindri has a rich legacy of academic excellence and innovation. The institute was established with a
              vision to create a center of excellence for engineering education in Eastern India.
            </p>
            <p className="text-gray-700 mb-4">
              Over the decades, BIT Sindri has evolved into a premier institution known for its quality education,
              research facilities, and industry connections. Our alumni have made significant contributions in various
              fields both in India and abroad.
            </p>
            <p className="text-gray-700">
              The institute continues to uphold its tradition of excellence while adapting to the changing needs of the
              industry and society.
            </p>
          </motion.div>

          <motion.div
            ref={historyRef}
            initial="hidden"
            animate={historyInView ? "visible" : "hidden"}
            variants={fadeInRight}
            className="relative h-80 rounded-lg overflow-hidden shadow-xl"
          >
            <Image src='/Bit.jpeg' alt="BIT Sindri Campus" className="w-full h-full object-cover" width={110} height={110} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6">
                <p className="text-white text-lg font-medium">The historic main building of BIT Sindri</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Vision & Mission Section */}
        <div className="mb-24">
          <motion.div 
            ref={visionRef}
            initial="hidden"
            animate={visionInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl font-bold mb-4 text-gray-900"
            >
              Vision & Mission
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="h-1 bg-orange-600 w-24 mx-auto mb-6"
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              ref={visionRef}
              initial="hidden"
              animate={visionInView ? "visible" : "hidden"}
              variants={fadeInLeft}
              className="bg-white  rounded-lg shadow-lg p-8"
            >
              <div className="flex justify-center mb-4">
                <Lightbulb className="h-12 w-12 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Our Vision</h3>
              <p className="text-gray-700">
                To establish BIT Sindri as a center of excellence in engineering education and research, 
                producing globally competitive professionals who contribute to the advancement of society and industry.
                The institute aims to foster innovation, critical thinking, and ethical leadership.
              </p>
            </motion.div>
            
            <motion.div 
              ref={missionRef}
              initial="hidden"
              animate={missionInView ? "visible" : "hidden"}
              variants={fadeInRight}
              className="bg-white  rounded-lg shadow-lg p-8"
            >
              <div className="flex justify-center mb-4">
                <GraduationCap className="h-12 w-12 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Our Mission</h3>
              <p className="text-gray-700">
                To provide quality technical education through innovative teaching methods, 
                state-of-the-art infrastructure, and industry collaboration. 
                We aim to nurture students to become technically competent, socially responsible, 
                and environmentally conscious professionals.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Facilities Section */}
        <motion.div 
          ref={facilityRef}
          initial="hidden"
          animate={facilityInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div className="text-center mb-12">
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl font-bold mb-4 text-gray-900"
            >
              Campus Facilities
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="h-1 bg-orange-600 w-24 mx-auto mb-6"
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Building className="h-8 w-8 text-orange-600" />,
                title: "Modern Infrastructure",
                description: "State-of-the-art laboratories, classrooms, and research facilities."
              },
              {
                icon: <BookOpen className="h-8 w-8 text-orange-600" />,
                title: "Central Library",
                description: "Extensive collection of books, journals, and digital resources."
              },
              {
                icon: <Users className="h-8 w-8 text-orange-600" />,
                title: "Student Amenities",
                description: "Sports complex, gymnasium, hostels, and recreation facilities."
              }
            ].map((facility, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white  rounded-lg shadow-lg p-8 text-center"
              >
                <div className="flex justify-center mb-4">{facility.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{facility.title}</h3>
                <p className="text-gray-700">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}