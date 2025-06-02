"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { BookOpen, Code, Cpu, Database, FlaskRoundIcon as Flask, Lightbulb, Radio, Zap } from "lucide-react";

export default function AcademicsSection() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
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
      icon: <Code className="h-6 w-6" />,
      description:
        "The Department of Computer Science & Engineering offers undergraduate and postgraduate programs focusing on software development, algorithms, artificial intelligence, and more.",
      courses: ["B.Tech in Computer Science & Engineering", "M.Tech in Computer Science & Engineering"],
    },
    {
      id: "ece",
      name: "Electronics & Communication",
      icon: <Radio className="h-6 w-6" />,
      description:
        "The Department of Electronics & Communication Engineering provides education in electronic systems, communication networks, signal processing, and embedded systems.",
      courses: ["B.Tech in Electronics & Communication Engineering", "M.Tech in Communication Systems"],
    },
    {
      id: "ee",
      name: "Electrical Engineering",
      icon: <Zap className="h-6 w-6" />,
      description:
        "The Electrical Engineering Department focuses on power systems, electrical machines, control systems, and renewable energy technologies.",
      courses: ["B.Tech in Electrical Engineering", "M.Tech in Power Systems"],
    },
    {
      id: "me",
      name: "Mechanical Engineering",
      icon: <Cpu className="h-6 w-6" />,
      description:
        "The Mechanical Engineering Department offers programs covering thermodynamics, manufacturing processes, machine design, and industrial engineering.",
      courses: ["B.Tech in Mechanical Engineering", "M.Tech in Thermal Engineering"],
    },
    {
      id: "ce",
      name: "Chemical Engineering",
      icon: <Flask className="h-6 w-6" />,
      description:
        "The Chemical Engineering Department provides education in process engineering, chemical reactions, plant design, and environmental engineering.",
      courses: ["B.Tech in Chemical Engineering", "M.Tech in Chemical Engineering"],
    },
    {
      id: "it",
      name: "Information Technology",
      icon: <Database className="h-6 w-6" />,
      description:
        "The Information Technology Department focuses on data management, networking, web technologies, and information systems.",
      courses: ["B.Tech in Information Technology", "M.Tech in Information Technology"],
    },
  ];

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

  return (
    <section id="academics" ref={ref} className="py-20 bg-white  overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16" 
          style={{ y }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 "
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
            className="max-w-3xl mx-auto text-lg text-gray-700 "
          >
            BIT Sindri offers a wide range of undergraduate and postgraduate programs across various engineering
            disciplines. Our curriculum is designed to provide both theoretical knowledge and practical skills.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <Tabs defaultValue="cse" className="max-w-5xl mx-auto">
            <motion.div 
              className="flex justify-center mb-14"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-gray-200 ">
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
                      className="flex flex-col items-center gap-1 py-3 px-4 data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                    >
                      {dept.icon}
                      <span className="text-xs md:text-sm text-center">{dept.name.split(" ")[0]}</span>
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </motion.div>

            {departments.map((dept) => (
              <TabsContent key={dept.id} value={dept.id}>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 pt-20 md:pt-0 gap-8"
                >
                  <motion.div variants={itemVariants}>
                    <Card className="h-full transition-all duration-300 hover:shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {dept.icon}
                          </motion.div>
                          <span>{dept.name}</span>
                        </CardTitle>
                        <CardDescription>Department Overview</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 ">{dept.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Card className="h-full transition-all duration-300 hover:shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <BookOpen className="h-5 w-5" />
                          </motion.div>
                          <span>Programs Offered</span>
                        </CardTitle>
                        <CardDescription>Undergraduate and Postgraduate Courses</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
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
                              >
                                <Lightbulb className="h-5 w-5 text-orange-600 mt-0.5" />
                              </motion.div>
                              <span className="text-gray-700 ">{course}</span>
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
    </section>
  );
}