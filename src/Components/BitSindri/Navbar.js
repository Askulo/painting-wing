"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRestoringState, setIsRestoringState] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBack = () => {
    try {
      // Save current UI state
      const stateToSave = {
        scrollPosition: window.scrollY,
        isMenuOpen,
        isScrolled,
        pathname: window.location.pathname,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(
        "navbarPreviousState",
        JSON.stringify(stateToSave)
      );
      router.back();
    } catch (error) {
      console.error("Error saving navbar state:", error);
      router.back();
    }
  };

  useEffect(() => {
    if (!isRestoringState) {
      try {
        const savedState = sessionStorage.getItem("navbarPreviousState");
        if (savedState) {
          setIsRestoringState(true);
          const parsedState = JSON.parse(savedState);

          // Only restore if state is less than 5 minutes old
          if (Date.now() - parsedState.timestamp < 300000) {
            setTimeout(() => {
              window.scrollTo(0, parsedState.scrollPosition);
              setIsMenuOpen(parsedState.isMenuOpen);
              setIsScrolled(parsedState.isScrolled);
              setIsRestoringState(false);
            }, 100);
          }

          // Clean up
          sessionStorage.removeItem("navbarPreviousState");
        }
      } catch (error) {
        console.error("Error restoring navbar state:", error);
        setIsRestoringState(false);
      }
    }
  }, [isRestoringState]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Events", href: "/events" },
    { name: "BIT Sindri", href: "/bit-sindri" },
    { name: "Gallery", href: "/gallery" },
    { name: "Bearers", href: "/members" },
    { name: "Join Us", href: "/modelviewer" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50  transition-all duration-300 md:bg-transparent bg-white/60 md:backdrop-blur-none backdrop-blur-xl  md:shadow-none shadow-lg"
      >
        <div className="container  mx-auto px-2 md:py-4 py-2 flex items-center justify-between">
          <Link href="#home" className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="hidden md:block">
                <Image src="/pw_logo.png" alt="logo" width={100} height={100} />
              </div>

              <div className="py-1 md:hidden  leading-1">
                <div
                  href="/"
                  className="text-lg md:text-2xl  font-medium tracking-widest"
                >
                  PAINTING WING
                </div>
                <h4 className="text-[12px] md:text-sm font-medium tracking-wider">
                  Let Satisfaction Prevail
                </h4>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div
            className={`hidden md:flex items-center space-x-8 border-2 border-gray-500 rounded-lg p-3 px-7
            ${isScrolled ? " backdrop-blur-xl shadow-lg" : "backdrop-blur-md"}
      `}
          >
            <nav className="flex items-center space-x-6 text-3/2xl  text-black ">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`link-6  p-2 rounded-sm hover:bg-slate-300 hover:text-gray-900 ${
                      isScrolled
                        ? "text-gray-500"
                        : "text-gray-500 dark:text-gray-500"
                    }`}
                    onClick={(e) => {
                      if (link.name === "Home") {
                        e.preventDefault();
                        window.location.href = "/";
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          <Button
            onClick={handleBack}
            className="bg-[#d25c25]   hidden md:block hover:bg-orange-700 text-white tracking-widest"
          >
            Back
          </Button>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button> */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className={`transition-all duration-200 hover:bg-white hover:text-black ${
                isMenuOpen
                  ? "bg-white text-black"
                  : "bg-transparent hover:bg-white hover:text-black"
              }`}
            >
              {isMenuOpen ? (
                <X className="h-30 w-30" />
              ) : (
                <Menu className="h-30 w-30" />
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white   shadow-lg md:hidden"
          >
            <nav className="container mx-auto px-4 py-6   flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block py-2 text-gray-700  hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors  cursor-none"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
