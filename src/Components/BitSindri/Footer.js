"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Palette,
  X,
  Github,
  Youtube,
} from "lucide-react";

export default function Footer() {
  const [isPaintingWingOpen, setIsPaintingWingOpen] = useState(false);
  const footerRef = useRef(null);

  const socialLinks = [
    {
      icon: <Facebook className="h-5 w-5" />,
      href: "#",
      label: "Facebook",
      color: "hover:bg-orange-500",
    },
    // {
    //   icon: <Twitter className="h-5 w-5" />,
    //   href: "#",
    //   label: "Twitter",
    //   color: "hover:bg-sky-500",
    // },
    {
      icon: <Instagram className="h-5 w-5" />,
     href:'https://www.instagram.com/pw_bitsindri/',
      label: "Instagram",
      color: "hover:bg-orange-500",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href:'https://www.linkedin.com/company/painting-wing-bit-sindri/',
      label: "LinkedIn",
      color: "hover:bg-orange-500",
    },
    // {
    //   icon: <Github className="h-5 w-5" />,
    //   href: "#",
    //   label: "Github",
    //   color: "hover:bg-gray-600",
    // },
    // {
    //   icon: <Youtube className="h-5 w-5" />,
    //   href: "#",
    //   label: "Youtube",
    //   color: "hover:bg-red-600",
    // },
  ];

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      text: "paintingwingbit22@gmail.com",
      label: "Email",
    },
    // {
    //   icon: <Phone className="h-5 w-5" />,
    //   text: "+91 99396612",
    //   label: "Phone",
    // },
    {
      icon: <MapPin className="h-5 w-5" />,
      text: "Sindri, Dhanbad, Jharkhand, India - 828123",
      label: "Address",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const paintingWingContent = `
    The Painting Wing at BIT Sindri is a vibrant hub for students passionate about visual arts. 
    Established in 1992, this creative space allows students to explore various artistic mediums including oil painting, 
    watercolors, digital art, and mixed media. The wing regularly organizes exhibitions, workshops with visiting artists, 
    and participates in inter-college competitions.
    
    Members of the Painting Wing have contributed to campus beautification through murals and installations that reflect 
    the institution's values and heritage. Annual events include the 'Chromatic Canvas' exhibition and the 'Art for Change' 
    initiative that raises awareness about social issues through visual storytelling.
    
    The Painting Wing welcomes students from all departments, regardless of prior artistic experience, fostering a 
    collaborative environment where technical skills and creative expression are equally valued.
  `;

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="bg-black text-white pt-12 pb-6 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <svg
          className="absolute -right-24 -bottom-24 w-96 h-96"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FF9D00"
            d="M46.9,-58.5C62,-50.8,76.5,-39.3,81.2,-24.5C85.9,-9.7,80.8,8.4,73.3,24.8C65.8,41.2,55.9,56,42.3,63.7C28.7,71.5,11.3,72.3,-4.6,68.5C-20.5,64.8,-34.9,56.4,-47.8,45.3C-60.6,34.2,-71.8,20.4,-76.7,4.1C-81.6,-12.2,-80.1,-31,-70.5,-43.9C-61,-56.8,-43.5,-63.8,-27.9,-70.8C-12.4,-77.9,2.2,-84.9,15.8,-81.3C29.4,-77.6,48.5,-71,63.5,-60.2C78.4,-49.4,89.2,-34.4,90.1,-18.7C90.9,-3,81.7,12.4,73.3,27.3C64.9,42.1,57.3,56.3,45.6,67.2C33.9,78.1,17,85.6,0.7,84.7C-15.5,83.7,-31,74.3,-42.2,63.3C-53.4,52.3,-60.3,39.7,-65.6,26.2C-71,12.7,-74.7,-1.6,-73.5,-16.3C-72.3,-31.1,-66.2,-46.2,-55.4,-56.8C-44.7,-67.4,-29.4,-73.5,-13.8,-74.7C1.8,-75.9,17.7,-72.2,30.9,-65.7C44,-59.1,54.5,-49.6,64.9,-38.8C75.4,-28,85.7,-15.9,88.2,-2C90.7,11.9,85.3,28.6,76.3,42.9C67.3,57.2,54.7,69.2,40.3,75C25.9,80.9,9.8,80.7,-2.7,84.1C-15.2,87.5,-24.1,94.5,-38.2,93.8C-52.3,93.1,-71.7,84.6,-78.9,69.7C-86.1,54.8,-81.2,33.4,-80.8,14.4C-80.5,-4.6,-84.8,-22.4,-77.8,-33.9C-70.8,-45.5,-52.6,-51,-37.9,-59C-23.2,-67,-12,-77.6,1.7,-80C15.4,-82.4,30.9,-76.6,43.4,-68.3C55.9,-59.9,65.5,-48.9,72.1,-36.4C78.7,-23.9,82.4,-9.9,76.9,1.3C71.4,12.5,56.7,20.9,47.8,34.2C38.9,47.6,35.8,65.9,26.3,72.9C16.8,79.9,1,75.6,-13,71.8C-27,68,-39.2,64.7,-52.8,57.9C-66.5,51.1,-81.7,40.8,-88.2,26.2C-94.7,11.6,-92.6,-7.3,-86.1,-24.7C-79.7,-42,-68.8,-57.8,-54.5,-66.2C-40.1,-74.6,-22.3,-75.6,-6.7,-71.5C8.9,-67.3,17.9,-57.9,29.4,-51.9C40.9,-45.9,55,-43.1,62.5,-34.8C70,-26.5,71,-12.6,72.6,1.5C74.3,15.6,76.5,30.1,71.1,42.3C65.7,54.6,52.7,64.5,38.9,68.7C25.1,72.9,10.6,71.2,-1.5,73.4C-13.6,75.5,-23.7,81.5,-37.4,82.3C-51.1,83.1,-68.5,78.7,-74.7,67.6C-80.9,56.4,-76,38.5,-73.5,23.8C-71.1,9.1,-71.1,-2.4,-71.7,-16.3C-72.3,-30.1,-73.5,-46.3,-66.8,-56.1C-60,-65.8,-45.3,-69.1,-31.2,-72.6C-17.1,-76,-3.4,-79.5,11.6,-79.2C26.6,-78.9,43,-74.7,54.1,-65.5C65.2,-56.4,71,-42.3,71.8,-28.2C72.5,-14.1,68.2,0,63.4,13.6C58.7,27.2,53.6,40.2,45,51.5C36.5,62.8,24.5,72.3,9.7,76.8C-5.1,81.3,-23,80.8,-38.8,75.7C-54.6,70.6,-68.2,60.9,-71.4,47.8C-74.5,34.6,-67.2,18,-64.6,3.2C-62,-11.7,-64.1,-24.7,-60.4,-36.3C-56.7,-47.9,-47.3,-58.1,-35.6,-64.5C-23.9,-71,-10,-73.6,2.3,-76.6C14.7,-79.5,25.3,-82.8,34.3,-78C43.3,-73.2,50.6,-60.3,60.4,-49.3C70.2,-38.2,82.5,-29.1,84.5,-18C86.5,-6.9,78.3,6.2,72.6,19.5C66.9,32.9,63.7,46.5,55.1,54.8C46.5,63.2,32.4,66.4,19.1,67.6C5.8,68.8,-6.8,68,-17.9,65C-29,62,-38.5,56.9,-50.3,51.3C-62,45.7,-75.8,39.7,-81.3,29.4C-86.8,19.1,-83.9,4.7,-79.7,-8.5C-75.5,-21.7,-69.9,-33.6,-61.3,-43.3C-52.7,-53,-41,-60.6,-28.4,-67.5C-15.8,-74.5,-2.3,-80.9,13.1,-84.1C28.5,-87.3,45.8,-87.4,55.7,-78.4C65.6,-69.5,68.2,-51.5,70.2,-35.7C72.1,-19.9,73.5,-6.2,69.9,4.9C66.3,16,57.7,24.6,50.9,35.2C44.1,45.9,39.1,58.6,29.8,69.7C20.4,80.8,6.7,90.1,-3.7,94.6C-14.2,99.1,-21.3,98.9,-30.7,98.2C-40.1,97.6,-51.7,96.5,-59.8,90.1C-68,83.7,-72.7,71.9,-77.9,60.4C-83.1,48.8,-88.8,37.5,-87.2,25.8C-85.6,14.1,-76.8,2.1,-74.1,-11.4C-71.5,-24.9,-75,-39.9,-69.3,-48.9C-63.7,-57.9,-48.8,-60.9,-35.5,-68.6C-22.2,-76.3,-10.4,-88.7,0.8,-89.8C12,-91,20.5,-80.9,31.9,-73.8C43.3,-66.7,57.6,-62.5,63.8,-53.1C70,-43.8,68.1,-29.2,72.7,-15.1C77.2,-1,88.4,12.7,87.2,24.5C86,36.2,72.5,46.1,60.8,55.8C49.1,65.6,39.1,75.2,27.1,82.3C15.1,89.5,1.1,94.3,-13.3,92.8C-27.7,91.3,-42.5,83.6,-54.5,74C-66.5,64.3,-75.6,52.7,-79.6,39.7C-83.5,26.7,-82.3,12.4,-81.4,-2C-80.5,-16.3,-80,-30.7,"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-12"
        >
          {/* College Information */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-6">
              {/* <motion.img
                src="/placeholder.svg?height=50&width=50"
                alt="BIT Sindri Logo"
                className="h-12 w-12 mr-3"
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
              /> */}
              {/* <div>
                <h2 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">
                  BIT Sindri
                </h2>
                <p className="text-sm text-gray-400">
                  Excellence in Engineering Education
                </p>
              </div> */}
            </div>

            <motion.button
              onClick={() => setIsPaintingWingOpen(true)}
              className="flex items-center space-x-2 mb-6 bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-2 rounded-md hover:from-orange-500 hover:to-orange-400 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Palette className="h-5 w-5" />
              <span>Painting Wing</span>
            </motion.button>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  aria-label={link.label}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className={`bg-gray-800 ${link.color} p-2 rounded-full transition-all`}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Contact Us
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-orange-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              ></motion.span>
            </h3>

            <ul className="space-y-6">
              {contactInfo.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-orange-600 text-white p-3 rounded-full mr-4"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <p className="text-gray-400 text-sm font-semibold mb-1">
                      {item.label}
                    </p>
                    <p className="text-white">{item.text}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Location with Google Maps iframe */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Our Location
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-orange-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              ></motion.span>
            </h3>

            <motion.div
              className="h-[300px] bg-gray-800 rounded-lg overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4346.015944540128!2d86.47110645210748!3d23.656309097541204!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f696e966e2cdf9%3A0x7103adfb5691300c!2sPainting%20Wing!5e0!3m2!1sen!2sin!4v1747201207882!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Painting Wing Location"
                className="w-full h-full"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm">
                  Painting Wing, BIT Sindri
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-6 text-center"
        >
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Painting Wing, BIT Sindri. All
            rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Painting Wing Popup */}
      <AnimatePresence>
        {isPaintingWingOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPaintingWingOpen(false)}
          >
            <motion.div
              className="bg-gray-900 border border-orange-500 rounded-lg max-w-3xl w-full p-6 relative"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Palette className="h-6 w-6 text-orange-500 mr-2" />
                  <span>Painting Wing</span>
                </h2>
                <motion.button
                  onClick={() => setIsPaintingWingOpen(false)}
                  className="text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Image
                    src="/pw_logo.png"
                    alt="Painting Wing"
                    width={400}
                    height={300}
                    className="w-full rounded-lg col-span-1 md:col-span-1 object-cover"
                  />
                  <div className="md:col-span-2 space-y-4">
                    {paintingWingContent.split("\n\n").map((paragraph, i) => (
                      <motion.p
                        key={i}
                        className="text-gray-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <motion.button
                    className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPaintingWingOpen(false)}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
