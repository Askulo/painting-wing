"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code, Cpu, Database, Lightbulb, Radio, Zap, Shield, Building, Pickaxe, Factory, Wrench, FlaskConical, ChevronLeft, ChevronRight } from "lucide-react";

export default function AcademicsSection() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const departments = [
    {
      id: "cse",
      name: "Computer Science & Engineering",
      shortName: "CSE",
      icon: <Code className="h-4 w-4 md:h-5 md:w-5" />,
      description:
        "The Department of Computer Science & Engineering offers comprehensive programs in software development, algorithms, artificial intelligence, machine learning, data structures, and emerging technologies. Students gain expertise in programming languages, database management, software engineering, and computer networks.",
      courses: [
        "B.Tech in Computer Science & Engineering",
        "M.Tech in Computer Science & Engineering",
        "M.Tech in Software Engineering",
        "M.Tech in Data Science & Analytics"
      ],
      specializations: ["Artificial Intelligence", "Machine Learning", "Cybersecurity", "Software Engineering", "Data Science"]
    },
    {
      id: "cse-cyber",
      name: "CSE (Cyber Security)",
      shortName: "Cyber",
      icon: <Shield className="h-4 w-4 md:h-5 md:w-5" />,
      description:
        "Specialized program in Computer Science with focus on Cybersecurity, covering network security, cryptography, ethical hacking, digital forensics, and information security management. Students learn to protect digital assets and combat cyber threats.",
      courses: [
        "B.Tech in CSE (Cyber Security)",
        "M.Tech in Cyber Security",
        "Certificate in Ethical Hacking",
        "Advanced Diploma in Information Security"
      ],
      specializations: ["Network Security", "Ethical Hacking", "Digital Forensics", "Cryptography", "Information Security Management"]
    },
    {
      id: "it",
      name: "Information Technology",
      shortName: "IT",
      icon: <Database className="h-4 w-4 md:h-5 md:w-5" />,
      description:
        "The Information Technology Department focuses on data management, networking, web technologies, information systems, cloud computing, and IT infrastructure. Students develop skills in system administration, database design, and enterprise solutions.",
      courses: [
        "B.Tech in Information Technology",
        "M.Tech in Information Technology",
        "M.Tech in Cloud Computing",
        "PG Diploma in IT Management"
      ],
      specializations: ["Cloud Computing", "Web Development", "Database Management", "Network Administration", "IT Infrastructure"]
    },
    {
      id: "ece",
      name: "Electronics & Communication",
      shortName: "ECE",
      icon: <Radio className="h-4 w-4 md:h-5 md:w-5" />,
      description:
        "The Department of Electronics & Communication Engineering provides comprehensive education in electronic systems, communication networks, signal processing, embedded systems, VLSI design, and wireless technologies.",
      courses: [
        "B.Tech in Electronics & Communication Engineering",
        "M.Tech in Communication Systems",
        "M.Tech in VLSI Design",
        "M.Tech in Signal Processing"
      ],
      specializations: ["VLSI Design", "Embedded Systems", "Wireless Communication", "Signal Processing", "Microwave Engineering"]
    },
    {
      id: "me",
      name: "Mechanical Engineering",
      shortName: "Mech",
      icon: <Cpu className="h-4 w-4 md:h-5 md:w-5" />,
      description:
        "The Mechanical Engineering Department offers comprehensive programs covering thermodynamics, manufacturing processes, machine design, industrial engineering, robotics, and automation. Focus on both traditional and modern manufacturing techniques.",
      courses: [
        "B.Tech in Mechanical Engineering",
        "M.Tech in Thermal Engineering",
        "M.Tech in Manufacturing Technology",
        "M.Tech in Machine Design"
      ],
      specializations: ["Thermal Engineering", "Manufacturing Technology", "Machine Design", "Robotics & Automation", "Industrial Engineering"]
    },
    {
      id: "ee",
      name: "Electrical Engineering",
      shortName: "EE",
      icon: <Zap className="h-4 w-4 md:h-5 md:w-5" />,
      description:
        "The Electrical Engineering Department focuses on power systems, electrical machines, control systems, renewable energy technologies, power electronics, and smart grid systems. Emphasis on sustainable energy solutions.",
      courses: [
        "B.Tech in Electrical Engineering",
        "M.Tech in Power Systems",
        "M.Tech in Power Electronics",
        "M.Tech in Renewable Energy Systems"
      ],
      specializations: ["Power Systems", "Power Electronics", "Renewable Energy", "Control Systems", "Smart Grid Technology"]
    },
    {
      id: "ce",
      name: "Civil Engineering",
      shortName: "Civil",
      icon: <Building className="h-4 w-4 md:h-5 md:w-5" />,
      description:
        "The Civil Engineering Department provides education in structural engineering, construction management, transportation engineering, environmental engineering, geotechnical engineering, and urban planning. Focus on sustainable infrastructure development.",
      courses: [
        "B.Tech in Civil Engineering",
        "M.Tech in Structural Engineering",
        "M.Tech in Transportation Engineering",
        "M.Tech in Environmental Engineering"
      ],
      specializations: ["Structural Engineering", "Transportation Engineering", "Environmental Engineering", "Geotechnical Engineering", "Construction Management"]
    },
    {
      id: "che",
      name: "Chemical Engineering",
      shortName: "Chemical",
      icon: <FlaskConical className="h-4 w-4 md:h-5 md:w-5" />,
      description:
        "The Chemical Engineering Department provides education in process engineering, chemical reactions, plant design, environmental engineering, petrochemicals, and process optimization. Strong emphasis on industrial processes and safety.",
      courses: [
        "B.Tech in Chemical Engineering",
        "M.Tech in Chemical Engineering",
        "M.Tech in Process Engineering",
        "PG Diploma in Petrochemical Engineering"
      ],
      specializations: ["Process Engineering", "Petrochemical Engineering", "Environmental Engineering", "Process Safety", "Biochemical Engineering"]
    },
    {
      id: "met",
      name: "Metallurgical Engineering",
      shortName: "Metal",
      icon: <Wrench className="h-4 w-4 md:h-5 md:w-5" />,
      description:
        "The Metallurgical Engineering Department focuses on extractive metallurgy, physical metallurgy, materials science, corrosion engineering, and advanced materials. Strong industry connections with steel and metal industries.",
      courses: [
        "B.Tech in Metallurgical Engineering",
        "M.Tech in Metallurgical Engineering",
        "M.Tech in Materials Science",
        "Advanced Diploma in Steel Technology"
      ],
      specializations: ["Extractive Metallurgy", "Physical Metallurgy", "Materials Science", "Corrosion Engineering", "Steel Technology"]
    },
    {
      id: "pie",
      name: "Production & Industrial Engineering",
      shortName: "PIE",
      icon: <Factory className="h-4 w-4 md:h-5 md:w-5" />,
      description:
        "The Production & Industrial Engineering Department covers manufacturing processes, industrial management, operations research, quality control, lean manufacturing, and supply chain management. Focus on optimizing industrial processes.",
      courses: [
        "B.Tech in Production & Industrial Engineering",
        "M.Tech in Industrial Engineering",
        "M.Tech in Production Engineering",
        "PG Diploma in Operations Management"
      ],
      specializations: ["Operations Research", "Quality Management", "Lean Manufacturing", "Supply Chain Management", "Industrial Automation"]
    },
    {
      id: "mining",
      name: "Mining Engineering",
      shortName: "Mining",
      icon: <Pickaxe className="h-4 w-4 md:h-5 md:w-5" />,
      description:
        "The Mining Engineering Department provides education in mineral extraction, mine planning, rock mechanics, mining safety, environmental impact assessment, and mineral processing. Strong focus on sustainable mining practices.",
      courses: [
        "B.Tech in Mining Engineering",
        "M.Tech in Mining Engineering",
        "M.Tech in Mine Planning",
        "Certificate in Mining Safety"
      ],
      specializations: ["Mine Planning & Design", "Rock Mechanics", "Mineral Processing", "Mining Safety", "Environmental Mining"]
    }
  ];

  // Handle scroll navigation
  const scrollTabs = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = 200;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    
    // Update scroll button states
    setTimeout(() => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }, 300);
  };

  // Check scroll position on scroll
  const handleTabsScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  // Staggered animation variants for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const specializationVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="academics" ref={ref} className="py-3 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16" 
          style={{ y }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 px-4"
          >
            Academic Programs
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1 bg-orange-600 mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-base sm:text-lg md:text-xl text-gray-700 px-4"
          >
            BIT Sindri offers comprehensive undergraduate and postgraduate programs across 11 engineering
            disciplines. Our curriculum combines theoretical knowledge with practical skills, preparing students for industry leadership.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <Tabs defaultValue="cse" className="max-w-7xl mx-auto">
            <motion.div 
              className="flex justify-center mb-8 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Desktop: Show all tabs in grid */}
              <div className="hidden xl:block w-full">
                <TabsList className="grid grid-cols-11 w-full bg-gray-100 mx-auto p-1  py-2">
                  {departments.map((dept, index) => (
                    <motion.div
                      key={dept.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <TabsTrigger
                        value={dept.id}
                        className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-md transition-all duration-200 min-h-[70px] text-center"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {dept.icon}
                        </motion.div>
                        <span className="text-xs font-medium leading-tight">
                          {dept.shortName}
                        </span>
                      </TabsTrigger>
                    </motion.div>
                  ))}
                </TabsList>
              </div>

              {/* Mobile/Tablet: Horizontal scroll with navigation buttons */}
              <div className="xl:hidden w-full relative">
                {/* Left scroll button */}
                {canScrollLeft && (
                  <button
                    onClick={() => scrollTabs('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}

                {/* Scrollable tabs container */}
                <div className="mx-8 sm:mx-12">
                  <div 
                    ref={scrollContainerRef}
                    className="overflow-x-auto overflow-y-visible scrollbar-hide"
                    onScroll={handleTabsScroll}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    <TabsList className="flex w-max bg-gray-100 p-1 gap-1">
                      {departments.map((dept, index) => (
                        <motion.div
                          key={dept.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <TabsTrigger
                            value={dept.id}
                            className="flex flex-col items-center gap-1 py-3 px-3 sm:px-4 data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-md transition-all duration-200 min-w-[80px] sm:min-w-[90px] text-center whitespace-nowrap"
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {dept.icon}
                            </motion.div>
                            <span className="text-xs font-medium leading-tight">
                              {dept.shortName}
                            </span>
                          </TabsTrigger>
                        </motion.div>
                      ))}
                    </TabsList>
                  </div>
                </div>

                {/* Right scroll button */}
                {canScrollRight && (
                  <button
                    onClick={() => scrollTabs('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>

            {departments.map((dept) => (
              <TabsContent key={dept.id} value={dept.id}>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 pt-8 pb-8"
                >
                  {/* Department Overview */}
                  <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="h-full transition-all duration-300 hover:shadow-xl border-l-4 border-l-orange-600">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-3 bg-orange-100 rounded-lg flex-shrink-0"
                          >
                            {dept.icon}
                          </motion.div>
                          <div className="min-w-0 flex-grow">
                            <span className="text-lg sm:text-xl font-bold block">{dept.name}</span>
                            <p className="text-sm text-gray-600 font-normal mt-1">Department Overview</p>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{dept.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Programs Offered */}
                  <motion.div variants={itemVariants}>
                    <Card className="h-full transition-all duration-300 hover:shadow-xl">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                          <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-2 bg-blue-100 rounded-lg flex-shrink-0"
                          >
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </motion.div>
                          <div className="min-w-0 flex-grow">
                            <span className="text-lg font-bold block">Programs Offered</span>
                            <p className="text-sm text-gray-600 font-normal mt-1">Degree Courses</p>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {dept.courses.map((course, i) => (
                            <motion.li 
                              key={i} 
                              className="flex items-start gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <motion.div
                                whileHover={{ scale: 1.2, color: "#f97316" }}
                                transition={{ type: "spring", stiffness: 400 }}
                                className="flex-shrink-0"
                              >
                                <Lightbulb className="h-4 w-4 text-orange-600 mt-0.5" />
                              </motion.div>
                              <span className="text-gray-700 text-sm leading-relaxed">{course}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}