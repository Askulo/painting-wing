"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "@/Components/BitSindri/Navbar";
import Footer from "./BitSindri/Footer";

const PaintingWing = () => {
  const mainRef = useRef(null);
  const fixedImageRef = useRef(null);
  const loaderRef = useRef(null);
  const fullScrRef = useRef(null);
  const navImgRef = useRef(null);
  const [revealedSections, setRevealedSections] = useState({});
  let locomotiveScroll = null;
  let swiper = null;
  let menuFlag = 0;

  useEffect(() => {
    // Initialize locomotive scroll
    const initLocomotiveScroll = async () => {
      if (typeof window !== "undefined") {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        locomotiveScroll = new LocomotiveScroll({
          el: mainRef.current,
          smooth: true,
        });

        // Set up scroll observer for reveal animations
        setupScrollObserver();
      }
    };

    // Initialize swiper
    const initSwiper = async () => {
      if (typeof window !== "undefined") {
        const Swiper = (await import("swiper")).default;
        const SwiperModules = await import("swiper");

        swiper = new Swiper(".mySwiper", {
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: window.innerWidth < 768 ? 30 : 100,
          breakpoints: {
            320: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 1.5,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: "auto",
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: "auto",
              spaceBetween: 100,
            },
          },
        });
      }
    };

    // Set up Intersection Observer for scroll reveal animations
    const setupScrollObserver = () => {
      const sections = document.querySelectorAll(".reveal-section");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setRevealedSections((prev) => ({
                ...prev,
                [entry.target.dataset.section]: true,
              }));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      sections.forEach((section) => {
        observer.observe(section);
      });
    };

    // Page4 functionality - handle fixed image display
    const setupPage4Animation = () => {
      const elemC = document.querySelector("#elem-container");
      const fixed = fixedImageRef.current;

      if (elemC && fixed) {
        elemC.addEventListener("mouseenter", () => {
          fixed.style.display = "block";
        });

        elemC.addEventListener("mouseleave", () => {
          fixed.style.display = "none";
        });

        const elems = document.querySelectorAll(".elem");
        elems.forEach((e) => {
          e.addEventListener("mouseenter", () => {
            const image = e.getAttribute("data-image");
            fixed.style.backgroundImage = `url(${image})`;
          });
        });
      }
    };

    // Handle touchscreen interactions for event items
    const setupTouchInteractions = () => {
      const elems = document.querySelectorAll(".elem");
      const fixed = fixedImageRef.current;

      elems.forEach((elem) => {
        elem.addEventListener("touchstart", () => {
          const image = elem.getAttribute("data-image");
          fixed.style.backgroundImage = `url(${image})`;
          fixed.style.display = "block";

          // Hide image after 3 seconds on touch devices
          setTimeout(() => {
            fixed.style.display = "none";
          }, 3000);
        });
      });
    };

    // Initialize everything
    initLocomotiveScroll();
    initSwiper();
    setupPage4Animation();
    // setupMenuAnimation();
    // setupLoaderAnimation();
    setupTouchInteractions();

    // Handle window resize for responsive adjustments
    const handleResize = () => {
      if (swiper) {
        swiper.update();
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/locomotive-scroll@3.5.4/dist/locomotive-scroll.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
        strategy="beforeInteractive"
      />

      {/* Fixed Image for hover effects */}
      <div
        ref={fixedImageRef}
        className="hidden fixed h-[40vw] w-[35vw] md:h-[30vw] md:w-[24vw] rounded-2xl z-40 left-1/2 top-1/3 md:top-1/4 transform -translate-x-1/2 bg-cover bg-center"
      ></div>

      <div ref={mainRef} className="relative z-10">
        {/* Page 1 */}
        <div
          className="min-h-screen w-full bg-[#efeae3] relative px-2 md:px-8 md:py-16 py-28 reveal-section"
          data-section="hero"
        >
          {/* Center Content */}
          <div
            className={`h-[40vh] sm:h-[65vh] md:h-[40vw] lg:h-[65vh] w-full flex flex-col-reverse md:flex-row md:items-end justify-between border-b border-black/25 pb-10 md:pb-16 px-5 md:px-0 relative z-10 transition-all duration-1000 ${
              revealedSections.hero
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="md:w-1/4 w-full">
              <h3 className="text-[4vw] md:text-[1.8vw] leading-[6vw] md:leading-[2vw] mt-6 md:mt-0">
                Painting Wing is one of BIT Sindris well-known clubs. The only
                fine-arts club in the college and is the torchbearer for all
                things related to art..
              </h3>
            </div>
            <div>
              <h1   className="font-roashe mt-6 font-bold text-5xl md:text-7xl lg:text-8xl text-right leading-[10vw] md:leading-[7vw]">
                LET <br />
                SATISFACTION <br />
                PREVAIL
              </h1>
            </div>
          </div>

          {/* Hero Shape */}
          <div className="absolute w-[60vw] h-[50vw] md:w-[46vw] md:h-[36vw] right-0 top-[65vh] opacity-90">
            <div className="absolute bg-[#fe320a] h-full w-full rounded-l-full blur-md"></div>
            <div className="absolute bg-gradient-to-br from-[#fe320a] to-[#fe3f0a] h-[40vw] w-[40vw] md:h-[30vw] md:w-[30vw] rounded-full blur-[25px] animate-[anime2_5s_linear_infinite_alternate]"></div>
            <div className="absolute bg-gradient-to-br from-[#fe320a] to-[#fe3f0a] h-[40vw] w-[40vw] md:h-[30vw] md:w-[30vw] rounded-full blur-[25px] animate-[anime1_5s_linear_infinite_alternate]"></div>
          </div>

          {/* Video */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              revealedSections.hero
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              src="./novax7 .mp4"
              className="relative rounded-lg md:rounded-3xl mt-4 md:mt-16 w-[92%] md:w-full ml-[4%] md:ml-0 h-[40vh] md:h-[90vh] object-cover"
            ></video>
          </div>
        </div>

        {/* Page 2 */}
        <div className="min-h-screen w-full bg-[#efeae3] py-8 md:py-32 relative">
          {/* Moving Text */}
          <div className="overflow-x-auto whitespace-nowrap scrollbar-none">
            <div className="inline-block whitespace-nowrap animate-[move_10s_linear_infinite]">
              <h1 className="text-[15vw] md:text-[9vw] inline-block">
                CREATIVITY
              </h1>
              <div className="inline-block h-6 w-6 md:h-[70px] md:w-[70px] rounded-full bg-[#fe320a] mx-2 md:mx-8"></div>
              <h1 className="text-[15vw] md:text-[9vw] inline-block">
                EXPLORATION
              </h1>
              <div className="inline-block h-6 w-6 md:h-[70px] md:w-[70px] rounded-full bg-[#fe320a] mx-2 md:mx-8"></div>
              <h1 className="text-[15vw] md:text-[9vw] inline-block">
                COMMUNITY
              </h1>
              <div className="inline-block h-6 w-6 md:h-[70px] md:w-[70px] rounded-full bg-[#fe320a] mx-2 md:mx-8"></div>
            </div>
            <div className="inline-block whitespace-nowrap animate-[move_10s_linear_infinite]">
              <h1 className="text-[15vw] md:text-[9vw] inline-block">ARTIST</h1>
              <div className="inline-block h-6 w-6 md:h-[70px] md:w-[70px] rounded-full bg-[#fe320a] mx-2 md:mx-8"></div>
              <h1 className="text-[15vw] md:text-[9vw] inline-block">
                DESIGNERS
              </h1>
              <div className="inline-block h-6 w-6 md:h-[70px] md:w-[70px] rounded-full bg-[#fe320a] mx-2 md:mx-8"></div>
              <h1 className="text-[15vw] md:text-[9vw] inline-block">
                ENVIRONMENTS
              </h1>
              <div className="inline-block h-6 w-6 md:h-[70px] md:w-[70px] rounded-full bg-[#fe320a] mx-2 md:mx-8"></div>
            </div>
            <div className="inline-block whitespace-nowrap animate-[move_10s_linear_infinite]">
              <h1 className="text-[15vw] md:text-[9vw] inline-block">
                EXPERIENCES
              </h1>
              <div className="inline-block h-6 w-6 md:h-[70px] md:w-[70px] rounded-full bg-[#fe320a] mx-2 md:mx-8"></div>
              <h1 className="text-[15vw] md:text-[9vw] inline-block">
                CONTENT
              </h1>
              <div className="inline-block h-6 w-6 md:h-[70px] md:w-[70px] rounded-full bg-[#fe320a] mx-2 md:mx-8"></div>
              <h1 className="text-[15vw] md:text-[9vw] inline-block">
                ENVIRONMENTS
              </h1>
              <div className="inline-block h-6 w-6 md:h-[70px] md:w-[70px] rounded-full bg-[#fe320a] mx-2 md:mx-8"></div>
            </div>
          </div>

          {/* Page 2 Bottom Content */}
          <div
            className="min-h-[80vh] w-full p-6 md:p-10 lg:p-18 flex flex-col md:flex-row md:items-center justify-between relative z-10 reveal-section"
            data-section="about"
          >
            <h1
              className={`text-[5vw] md:text-4xl w-full md:w-3.5/5 leading-[9vw] md:leading-[5vw] lg:leading-[4vw] transition-all duration-1000 ${
                revealedSections.about
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              We make life at BIT Sindri more colorful, fun, and fascinating by
              organizing events such as street painting, wall painting, Rangoli
              making, caricature, clay modeling, body painting, oil painting,
              and so on.
            </h1>
            <div
              className={`w-[90%] md:w-1.5/5 mt-8 md:mt-0 transition-all duration-1000 delay-300 ${
                revealedSections.about
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <Image
                src="/img/23.jpg"
                width={500}
                height={500}
                className="w-full rounded-2xl"
                alt="Painting wing artwork"
              />
              <p className="font-light mt-8 text-[3.5vw] md:text-lg">
                We love to create, we love to solve, we love to collaborate, and
                we love to turn amazing ideas into reality. The clubs goal has
                been to develop and promote art culture among students on
                campus.
              </p>
            </div>
          </div>

          {/* Gooey Effect */}
          <div className="h-[62vw] w-[62vw] md:h-[32vw] md:w-[32vw] absolute rounded-full bg-gradient-to-tr from-[#ff2d03] to-[#ff5c0b] top-[58%] left-[25%] blur-[20px] md:blur-[30px] animate-[gooey_6s_ease-in-out_infinite_alternate]"></div>
        </div>

        {/* Page 3 */}
        <div
          className="min-h-screen w-full bg-[#efeae3] py-16 reveal-section"
          data-section="events"
        >
          <p
            className={`text-4xl md:text-6xl ml-5 mb-8 transition-all duration-1000 ${
              revealedSections.events
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Our Events
          </p>
          <div
            id="elem-container"
            className={`transition-all duration-1000 delay-300 ${
              revealedSections.events
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div
              className="elem h-[120px] md:h-[150px] w-full relative border-b border-[#38383864] overflow-hidden flex items-center px-4 md:px-8"
              data-image="/creations.jpg"
            >
              <div className="overlay absolute h-full w-full bg-orange-500 left-0 top-[-100%] transition-all duration-250 ease-in"></div>
              <h2 className="text-2xl md:text-3xl lg:text-[3vw] relative z-10">
                Creations
              </h2>
            </div>
            <div
              className="elem h-[120px] md:h-[150px] w-full relative border-b border-[#38383864] overflow-hidden flex items-center px-4 md:px-8"
              data-image="/samarpan.jpg"
            >
              <div className="overlay absolute h-full w-full bg-orange-500 left-0 top-[-100%] transition-all duration-250 ease-in"></div>
              <h2 className="text-2xl md:text-3xl lg:text-[3vw] relative z-10">
                Samarpan
              </h2>
            </div>
            <div
              className="elem h-[120px] md:h-[150px] w-full relative border-b border-[#38383864] overflow-hidden flex items-center px-4 md:px-8"
              data-image="/graffiti.jpg"
            >
              <div className="overlay absolute h-full w-full bg-orange-500 left-0 top-[-100%] transition-all duration-250 ease-in"></div>
              <h2 className="text-2xl md:text-3xl lg:text-[3vw] relative z-10">
                Graffiti
              </h2>
            </div>
            <div
              className="elem h-[120px] md:h-[150px] w-full relative border-b border-[#38383864] overflow-hidden flex items-center px-4 md:px-8"
              data-image="/shades.jpg"
            >
              <div className="overlay absolute h-full w-full bg-orange-500 left-0 top-[-100%] transition-all duration-250 ease-in"></div>
              <h2 className="text-2xl md:text-3xl lg:text-[3vw] relative z-10">
                Shades
              </h2>
            </div>
            <div
              className="elem h-[120px] md:h-[150px] w-full relative border-b border-[#38383864] overflow-hidden flex items-center px-4 md:px-8"
              data-image="face-off.jpg"
            >
              <div className="overlay absolute h-full w-full bg-orange-500 left-0 top-[-100%] transition-all duration-250 ease-in"></div>
              <h2 className="text-2xl md:text-3xl lg:text-[3vw] relative z-10">
                Face off
              </h2>
            </div>
            <div
              className="elem h-[120px] md:h-[150px] w-full relative border-b border-[#38383864] overflow-hidden flex items-center px-4 md:px-8"
              data-image="insignia.jpg"
            >
              <div className="overlay absolute h-full w-full bg-orange-500 left-0 top-[-100%] transition-all duration-250 ease-in"></div>
              <h2 className="text-2xl md:text-3xl lg:text-[3vw] relative z-10">
                Insignia
              </h2>
            </div>
            <div
              className="elem h-[120px] md:h-[150px] w-full relative border-b border-[#38383864] overflow-hidden flex items-center px-4 md:px-8"
              data-image="/akriti.jpg"
            >
              <div className="overlay absolute h-full w-full bg-orange-500 left-0 top-[-100%] transition-all duration-250 ease-in"></div>
              <h2 className="text-2xl md:text-3xl lg:text-[3vw] relative z-10">
                Akriti
              </h2>
            </div>
            <div
              className="elem h-[120px] md:h-[150px] w-full relative border-b border-[#38383864] overflow-hidden flex items-center px-4 md:px-8"
              data-image="sketcher-saturday.jpg"
            >
              <div className="overlay absolute h-full w-full bg-orange-500 left-0 top-[-100%] transition-all duration-250 ease-in"></div>
              <h2 className="text-2xl md:text-3xl lg:text-[3vw] relative z-10">
                Sketchers Saturday
              </h2>
            </div>
          </div>
        </div>

        {/* Page 4 */}
        <div
          className="min-h-[50vh] w-full bg-[#efeae3] py-10 px-2 md:px-8 md:py-40 reveal-section"
          data-section="descriptions"
        >
          <div
            className={`swiper mySwiper h-full w-full transition-all duration-1000 ${
              revealedSections.descriptions
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="swiper-wrapper">
              <div className="swiper-slide w-full md:w-[30%] border-l border-[#aeadad] px-2 md:px-8">
                <h1 className="text-2xl md:text-3xl font-bold">Samarpan:</h1>
                <br />
                <p className="text-sm md:text-base">
                  The flagship event Samarpan is our annual mega event which,
                  provides the young gushing talents from our college and
                  outside, an opportunity to showcase their artistic skills. It
                  is an alluring 2-day art exhibition during which different art
                  competitions are also organized such as the face painting
                  competition, wall painting competition, and many more.
                </p>
              </div>
              <div className="swiper-slide w-full md:w-[30%] border-l border-[#aeadad] px-2 md:px-8">
                <h1 className="text-2xl md:text-3xl font-bold">Creations:</h1>
                <br />
                <p className="text-sm md:text-base">
                  It is our annual inter-school event. In this event, all the
                  nearby schools outside our college including the Government
                  schools participate, where the students get a platform to
                  compete with the students of various schools. We also provide
                  free painting and sketching workshops for students who cannot
                  afford to take professional classes
                </p>
              </div>
              <div className="swiper-slide w-full md:w-[30%] border-l border-[#aeadad] px-2 md:px-8">
                <h1 className="text-2xl md:text-3xl font-bold">Akriti:</h1>
                <br />
                <p className="text-sm md:text-base">
                  Akriti is an exciting event organized exclusively for girls of
                  the first year. The event comprises various sections like ●
                  Best Dress <br />● Card and Craft making <br />● 1min Act{" "}
                  <br />● Rangoli and a few other events.
                </p>
              </div>
              <div className="swiper-slide w-full md:w-[30%] border-l border-[#aeadad] px-2 md:px-8">
                <h1 className="text-2xl md:text-3xl font-bold">Graffiti:</h1>
                <br />
                <p className="text-sm md:text-base">
                  In near words means drawings that are done on the wall or on
                  other surface in a public space. Every year we choose a theme
                  for the event, last year it was science and technology.
                  Painting is done on the wall of MC ground of Bit Sindri.
                  Students from each year participate in this to paint the walls
                  of the MC ground and enhance the beauty of BIT Sindri.
                </p>
              </div>
              <div className="swiper-slide w-full md:w-[30%] border-l border-[#aeadad] px-2 md:px-8">
                <h1 className="text-2xl md:text-3xl font-bold">Face-Off:</h1>
                <br />
                <p className="text-sm md:text-base">
                  It is one of the major online events of the painting wing.
                  This competition is mainly for our freshers. The aim of this
                  event is just to make familiarize freshers with their
                  batchmates from all the departments of BIT in a fun way. The
                  most influential person gets merited, winning a prize at the
                  end.
                </p>
              </div>
              <div className="swiper-slide w-full md:w-[30%] border-l border-[#aeadad] px-2 md:px-8">
                <h1 className="text-2xl md:text-3xl font-bold">Shades:</h1>
                <br />
                <p className="text-sm md:text-base">
                  Every year we conduct a national event Shades, which is an
                  online drawing & painting competition, where participants
                  submit their creations to the Painting Wing. This competition
                  is a one-month-long event and is open to anyone from any
                  college or school. This competition basically comprises of 5
                  divisions: <br />
                  Sketching, Painting Digital art, Doodling, Grafitti
                </p>
              </div>
              <div className="swiper-slide w-full md:w-[30%] border-l border-[#aeadad] px-2 md:px-8">
                <h1 className="text-2xl md:text-3xl font-bold">Insignia:</h1>
                <br />
                <p className="text-sm md:text-base">
                  A logo-designing competition in which contestants have to
                  redesign and recreate a logo from the pool of companies
                  provided.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Club Incharge Section */}
        <div
          className="min-h-[60vh] w-full bg-[#efeae3] py-6 px-6 md:px-16 reveal-section"
          data-section="incharge"
        >
          <div
            className={`transition-all duration-1000 ${
              revealedSections.incharge
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-6xl mb-16 text-center">
              Club Prof. Incharge
            </h2>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-1/3 bg-gradient-to-br from-[#fe320a] to-[#fe5c0b] p-8 flex items-center justify-center">
                  <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Image
                      src="https://www.bitsindri.ac.in/old/faculty-profile/images/faculty/nayak.png"
                      alt="Dr. Rajen Kumar Nayak"
                      width={500} // Set your desired width
                      height={700} // Set your desired height
                      className="w-full h-full object-fill  rounded-lg"
                    />

                    {/* <div className="text-6xl text-[#fe320a] font-bold">RKN</div> */}
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-2/3 p-8 md:p-12">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        Dr. Rajen Kumar Nayak
                      </h3>
                      <p className="text-lg text-[#fe320a] font-semibold mb-4">
                        Assistant Professor | Department of Mechanical
                        Engineering
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#fe320a] rounded-full flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">
                            Qualifications:
                          </p>
                          <p className="text-gray-600">
                            Ph.D (Mechanical), M.Tech in Production Engineering,
                            B.Sc Engineering (Mechanical)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#fe320a] rounded-full flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">
                            Areas of Expertise:
                          </p>
                          <p className="text-gray-600">
                            Heat Transfer, Solar Energy, Thermodynamics,
                            Manufacturing Engineering
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#fe320a] rounded-full flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">
                            Contact:
                          </p>
                          {/* <p className="text-gray-600">Mobile: +91-9939709574</p> */}
                          <p className="text-gray-600">
                            Email: rknayak@bitsindri.ac.in
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#fe320a] rounded-full flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">
                            Experience:
                          </p>
                          <p className="text-gray-600">
                            Assistant Professor at BIT Sindri since 2006
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-gray-600 italic">
                        &quot;Under Dr. Nayak&apos;s guidance, the Painting Wing continues
                        to flourish as a platform for artistic expression and
                        creativity, fostering the development of art culture
                        among students.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       
        {/* Footer */}
        <div className=" w-full bg-black text-white bottom-0 flex justify-end flex-col px-3 md:px-12 py-4">
          <Footer />
        </div>
      </div>

      {/* Custom Animation Keyframes */}
      <style jsx>{`
        @keyframes load {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes move {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        @keyframes anime1 {
          from {
            transform: translate(55%, -3%);
          }
          to {
            transform: translate(0%, 10%);
          }
        }

        @keyframes anime2 {
          from {
            transform: translate(5%, -5%);
          }
          to {
            transform: translate(-20%, 30%);
          }
        }

        @keyframes gooey {
          from {
            filter: blur(20px);
            transform: translate(10%, -10%) skew(0);
          }
          to {
            filter: blur(30px);
            transform: translate(-10%, 10%) skew(-12deg);
          }
        }

        .elem:hover .overlay {
          top: 0;
        }

        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};
export default PaintingWing;
