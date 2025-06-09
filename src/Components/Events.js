"use client";

// import type React from "react"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Check,
  Users,
  Award,
  Lightbulb,
  MessageSquare,
} from "lucide-react";
import Footer from "./BitSindri/Footer";
import Navbar from "./BitSindri/Navbar";
import ScrollIndicator from "./ScrollIndicator";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const processRef = useRef(null);
  const whyUsRef = useRef(null);
  const caseStudiesRef = useRef(null);
  const teamRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);

  const { scrollY } = useScroll();

  // Parallax effects
  // Always call hooks unconditionally
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const heroOpacityTransform = useTransform(scrollY, [0, 800], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);
  const heroOpacity = isMobile ? 1 : heroOpacityTransform;

  // Check which section is in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sections = [
        { ref: heroRef, id: "hero" },
        { ref: processRef, id: "process" },
        { ref: whyUsRef, id: "why-us" },
        { ref: caseStudiesRef, id: "case-studies" },
        { ref: testimonialsRef, id: "testimonials" },
        { ref: teamRef, id: "team" },
        { ref: faqRef, id: "faq" },
        { ref: statsRef, id: "stats" },
        { ref: contactRef, id: "contact" },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const { ref, id } = sections[i];
        if (!ref.current) continue;
        const sectionTop = ref.current.offsetTop;
        const sectionBottom = sectionTop + ref.current.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="relative">
      <ScrollIndicator />

      {/* Side Navigation */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col space-y-4">
          {[
           { ref: heroRef, id: "hero", label: "Home" },
  { ref: processRef, id: "process", label: " Events" },
  // { ref: contactRef, id: "contact", label: "Contact" },
  { ref: whyUsRef, id: "why-us", label: "Creations" },
  { ref: teamRef, id: "team", label: "Creation Glimpses" },
  { ref: caseStudiesRef, id: "case-studies", label: "Insignia" },
  { ref: faqRef, id: "faq", label: "FAQ" },
  { ref: statsRef, id: "stats", label: "Stats" },
          ].map(({ ref, id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(ref)}
              className={`flex items-center space-x-2 group ${
                activeSection === id ? "text-[#f47458]" : "text-neutral-400"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === id
                    ? "bg-[#f47458]"
                    : "bg-neutral-300 group-hover:bg-neutral-400"
                }`}
              />
              <span
                className={`text-sm transition-all duration-300 ${
                  activeSection === id
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

 

      <Navbar />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-4 bg-[#f2f0e6]"
      >
        <motion.h1
          className="text-[28px] sm:text-5xl md:text-6xl lg:text-7xl font-medium text-center max-w-5xl mb-4 md:leading-normal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="whitespace-pre-wrap">
            Fostering Creativity through{" "}
            <span className="text-[#f47458]">
              Curated&nbsp;Artistic&nbsp;Experiences
            </span>
          </span>
        </motion.h1>


          <motion.p
            className="text-[1.12rem] text-center max-w-2xl mb-12 "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From virtual competitions to campus wall art, we celebrate every form
            of expression.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
          className="bg-[#f47458] text-white px-6 py-3 rounded-lg hover:bg-[#e06348] transition-colors"
          onClick={() => scrollToSection(processRef)}
            >
          Explore Our Events
            </button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-6xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
          className="rounded-2xl overflow-hidden transform rotate-[-3deg] hover:rotate-0 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
            >
          <Image
            src="/insignia.jpg"
            alt="Person with curly hair"
            width={300}
            height={400}
            className="w-full h-full object-cover bg-[#d9734e]"
          />
            </motion.div>

            <motion.div
          className="rounded-2xl overflow-hidden transform rotate-[2deg] hover:rotate-0 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
            >
          <Image
            src="/rakhi.jpg"
            alt="Person smiling"
            width={300}
            height={400}
            className="w-full h-full object-cover bg-[#c8c5b7]"
          />
            </motion.div>

            <motion.div
          className="rounded-2xl overflow-hidden transform rotate-[5deg] hover:rotate-0 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
            >
          <Image
            src="/artExhibition.jpg"
            alt="Person with glasses"
            width={300}
            height={400}
            className="w-full h-full object-cover bg-[#6aadcf]"
          />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            onClick={() => scrollToSection(processRef)}
          >
            <ChevronDown className="text-neutral-500 cursor-pointer" />
          </motion.div>
        </motion.section>

        {/* Events Section */}
      <section
        ref={processRef}
        id="Events"
        className="min-h-screen pt-24 pb-4 px-4  bg-[#f2f0e6]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-[2rem] md:text-5xl text-center font-medium mb-10 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Offline Events
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[#f47458] text-xl mb-2">01</div>
              <h3 className="text-2xl font-medium mb-4">Samarpan</h3>
              <p className="text-neutral-700">
                An annual 2-day mega art exhibition that celebrates creativity
                and expression. Samarpan provides a vibrant platform for
                students from BIT Sindri and outside to showcase their artistic
                talents across various forms.
              </p>
              <ul className="list-disc list-inside text-neutral-700 mt-2 ml-6 space-y-1">
                <li> Exhibition of artworks from students and guest artists</li>
                <li> Face Painting Competition</li>
                <li> Wall Painting Competition</li>
                <li> Live sketching and creative contests</li>
                <li> Open for external participants as well</li>
                <li> Prizes and recognition for the best artworks</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-[#f47458] text-xl mb-2">02</div>
              <h3 className="text-2xl font-medium mb-4">Creations</h3>
              <p className="text-neutral-700">
                A heartwarming inter-school event that opens up creative
                opportunities for young students, especially from government
                schools. Through Creations, Painting Wing extends its mission
                beyond the college, offering free workshops and competitions to
                promote artistic growth.
              </p>
              <ul className="list-disc list-inside text-neutral-700 mt-2 ml-6 space-y-1">
                <li>
                  {" "}
                  Participation from local government and private schools
                </li>
                <li> Drawing and painting competitions</li>
                <li> Free sketching and painting workshops</li>
                <li> Social outreach through art</li>
                <li> Encouraging young talent at grassroots level</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-[#f47458] text-xl mb-2">03</div>
              <h3 className="text-2xl font-medium mb-4">Akriti</h3>
              <p className="text-neutral-700">
                An exclusive creative fest designed especially for the
                first-year girls. Akriti blends art, fashion, and
                self-expression into a joyful celebration that helps newcomers
                feel welcomed and empowered.
              </p>
              <ul className="list-disc list-inside text-neutral-700 mt-2 ml-6 space-y-1">
                <li> Best Dress Competition</li>
                <li> Card and Craft Making</li>
                <li> 1-Minute Acting Challenge</li>
                <li> Rangoli Art</li>
                <li> Other creative workshops and games</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-[#f47458] text-xl mb-2">04</div>
              <h3 className="text-2xl font-medium mb-4">Graffiti</h3>
              <p className="text-neutral-700">
                A signature event that transforms blank campus walls into
                mesmerizing art pieces. Based on a theme every year, Graffiti
                lets students collaborate and paint murals that stay as creative
                landmarks at BIT Sindri.
              </p>
              <ul className="list-disc list-inside text-neutral-700 mt-2 ml-6 space-y-1">
                <li> Theme-based wall painting (e.g., Science & Technology)</li>
                <li> Large-scale collaboration across all batches</li>
                {/* <li> Murals created on MC Ground walls</li> */}
                <li> Enhancing campus aesthetics</li>
                <li> Great photo opportunities and memories</li>
              </ul>
            </motion.div>
          </div>
        </div>
        <div className="max-w-6xl  mt-20 mx-auto">
          <motion.h2
            className="text-[2rem] md:text-5xl font-medium mb-10 lg:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Online Events
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[#f47458] text-xl mb-2">01</div>
              <h3 className="text-2xl font-medium mb-4">FaceOff</h3>
              <p className="text-neutral-700">
                A fun and engaging online interaction event exclusively for
                freshers. Faceoff helps newcomers get to know their batchmates
                from various departments while competing in a lighthearted,
                creative atmosphere.
              </p>
              <ul className="list-disc list-inside text-neutral-700 mt-2 ml-6 space-y-1">
                <li> Designed for freshers to bond and connect</li>
                <li> Fun challenges and interactive tasks</li>
                <li> Cross-department interaction made easy</li>
                <li> Awards for the most influential participant</li>
              
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-[#f47458] text-xl mb-2">02</div>
              <h3 className="text-2xl font-medium mb-4">Shades</h3>
              <p className="text-neutral-700">
                A month-long national-level online art competition open to
                everyone — school and college students alike. Shades provides a
                flexible, virtual space to explore and submit your art across
                multiple formats.
              </p>
              <ul className="list-disc list-inside text-neutral-700 mt-2 ml-6 space-y-1">
                <li> Open to all schools and colleges nationwide</li>
                <li> One-month submission period</li>
                <li>
                  {" "}
                  Multiple categories:
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    Painting & Sketching,
                Digital Art,
                    Doodling,
                    Graffiti
                  </ul>
                </li>
               
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-[#f47458] text-xl mb-2">03</div>
              <h3 className="text-2xl font-medium mb-4">Insignia</h3>
              <p className="text-neutral-700">
                A creative online competition where students redesign logos for
                real companies. Insignia focuses on creative problem-solving,
                branding knowledge, and digital design skills.
              </p>
              <ul className="list-disc list-inside text-neutral-700 mt-2 ml-6 space-y-1">
                <li> Redesign logos from a provided list of companies</li>
                <li> Emphasis on creativity, branding, and simplicity</li>
                <li> Digital design submission format</li>
                <li> Prizes for the most innovative designs</li>
                <li> Winners get showcased on social media</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-[#f47458] text-xl mb-2">04</div>
              <h3 className="text-2xl font-medium mb-4">Sketchers Saturday</h3>
              <p className="text-neutral-700">
                A weekly social media feature dedicated to appreciating and
                promoting art. Artists from BIT Sindri and beyond can get
                featured by submitting or tagging their artwork — making it a
                consistent celebration of creativity.
              </p>
              <ul className="list-disc list-inside text-neutral-700 mt-2 ml-6 space-y-1">
                <li> Conducted every Saturday</li>
                <li> Open to BITians and external artists</li>
                <li> Artists can tag or DM their artwork</li>
                <li> Weekly shout-outs on social media handles</li>
                <li> Boosts engagement and recognition for creative talent</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyUsRef} className="min-h-screen pt-24 pb-14 px-4 bg-[#f2f0e6]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-medium mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Recently Hosted Events
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="rounded-2xl  overflow-hidden h-[500px] relative">
                <Image
                  src="/creations.jpg"
                  alt="Our approach"
                  width={700}
                  height={500}
                  className="w-full h-full object-fill"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <h3 className="text-white text-2xl font-medium">
                   Creations – Intra-School Art Event
                  </h3>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-[#f47458]/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-[#f47458]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">
                    Hosted at Mother Teresa Academy
                    </h4>
                    <p className="text-neutral-700">
                     The event took place on May 5th, 2025 at Mother Teresa Academy High School, located in Saharpura, providing a lively and inclusive space for artistic expression.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-[#f47458]/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-[#f47458]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">300+ Students Participated</h4>
                    <p className="text-neutral-700">
                      Over 300 students from nearby schools took part in the event, channeling their creativity into powerful visual expressions on themes like Environmental conservation, Cartoon character imagination, and anti-terrorism awareness.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-[#f47458]/10 p-2 rounded-full">
                    <Award className="h-5 w-5 text-[#f47458]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Top 9 Winners Honored</h4>
                    <p className="text-neutral-700">
                      The best 9 participants were declared winners. Prizes and certificates were distributed to all participants, acknowledging their enthusiasm and talent.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-[#f47458]/10 p-2 rounded-full">
                    <Lightbulb className="h-5 w-5 text-[#f47458]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">
                    Free art supplies
                    </h4>
                    <p className="text-neutral-700">
                     Students were offered free sketching and painting workshops, helping many take their first steps into the world of art.
      
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      

      

      {/* Team Section */}
      <section ref={teamRef} className="min-h-screen pt-24 pb-12 px-4 bg-[#f2f0e6]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-medium mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Creations Glimpses
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
  {
    // name: "Alex Morgan",
    // role: "Founder & Strategy Director",
   name: "Certificate Distribution Ceremony",
    role: "Felicitating student achievers with pride"
  },
  {
    // name: "Jamie Chen",
    // role: "Creative Director",
   name: "Creative Engagement Workshop",
    role: "Sparking imagination through art activities"
  },
  {
    // name: "Taylor Reed",
    // role: "Brand Strategist",
   name: "Team Presentation & Public Interaction",
    role: "Introducing our mission to the school community"
  },
  {
    // name: "Jordan Smith",
    // role: "Content Director",
   name: "Attentive Young Audience",
    role: "Students listening during the session outdoors"
  },
  {
    // name: "Casey Williams",
    // role: "Digital Marketing Lead",
   name: "Interactive Learning Session",
    role: "Sharing art knowledge in a fun way"
  },
  {
    // name: "Riley Johnson",
    // role: "Client Success Manager",
   name: "Certificate Distribution",
    role: "Recognizing student achievements with certificates"
    // role: "Promoting team values and education together"
    }
  ]
  .map((member, index) => (
          <motion.div
          key={index}
          className="group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -10 }}
          >
          <div className="rounded-2xl overflow-hidden mb-4 aspect-[4/5] relative">
            <Image
              src={`/creationGlimses/creations${index + 1}.jpg`}
            alt={member.name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div className="text-white">
              <p className="text-sm mb-1">{member.role}</p>
              <h3 className="text-xl font-medium">{member.name}</h3>
            </div>
            </div>
          </div>
          <h3 className="text-lg font-medium group-hover:text-[#f47458] transition-colors">
            {member.name}
          </h3>
          <p className="text-neutral-500">{member.role}</p>
          </motion.div>
        ))}
        </div>

        <div className="text-center "> 
        <button
          className="mt-8 text-center px-4 py-2 bg-[#f47458] text-white rounded-md hover:bg-[#e06348] transition"
          onClick={() => window.location.href = '/gallery'}
        >
          View more
        </button>
        </div>
      </div>
      </section>
      <section ref={faqRef} className="min-h-screen pt-14 md:pb-8 px-4 bg-[#f2f0e6]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-medium mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What is the Painting Wing Club?",
                answer:
                  "The Painting Wing Club is a creative community where students explore various painting techniques, from watercolors and acrylics to oils and digital art. We provide a supportive environment for artists of all skill levels to develop their talents and express their creativity.",
              },
              {
                question: "Do I need any prior painting experience to join?",
                answer:
                  "Absolutely not! We welcome complete beginners. Our club is designed to nurture talent at every level. We provide basic workshops and mentorship programs specifically for freshers to help you get started on your artistic journey.",
              },
              {
                question: "What materials do I need to bring?",
                answer:
                  "For beginners, we provide basic supplies during your first few sessions. As you progress, we'll guide you on purchasing your own materials. We also have partnerships with local art stores for discounted supplies for club members.",
              },
              {
                question:
                  "Is this club only for artists or can non-artists join too?",
                answer:
                  "Our club welcomes everyone! Whether you're a seasoned artist or someone who's never held a paintbrush, you belong here. We have dedicated programs for both experienced artists looking to refine their skills and complete beginners who want to explore their creative side. Art is for everyone, and we believe every person has an artist within them waiting to be discovered.",
              },
              {
                question: "Are there any membership fees?",
                answer:
                  "There's a nominal annual membership fee of ₹500 which covers basic art supplies, workshop materials, and event costs. We also offer scholarships for students who need financial assistance.",
              },
              {
                question: "What kind of events and opportunities do you offer?",
                answer:
                  "We organize art exhibitions, painting competitions, collaborative mural projects, guest artist workshops, art therapy sessions, and annual art camps. Members also get opportunities to showcase their work at college festivals and external exhibitions.",
              },
              {
                question: "Can I participate in competitions through the club?",
                answer:
                  "Yes! We regularly participate in inter-college art competitions, national painting contests, and online art challenges. We provide training and support to help members prepare for these competitions.",
              },
              {
                question: "Is there mentorship available for freshers?",
                answer:
                  "Definitely! We have a buddy system where senior members mentor freshers. You'll be paired with an experienced artist who will guide you through techniques, help with project ideas, and provide personalized feedback on your work.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-neutral-300 pb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-medium mb-4 flex items-start">
                  <span className="text-[#f47458] mr-2">Q.</span>
                  {faq.question}
                </h3>
                <p className="text-neutral-700 pl-6">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-14 md:pb-20  px-4  bg-[#f2f0e6]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3  justify-between gap-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
          

            <div>
              <motion.div
                className="text-4xl md:text-6xl font-bold text-[#f47458] mb-2"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                10+
              </motion.div>
              <p className="text-neutral-700">yrs of Legacy</p>
            </div>

            <div>
              <motion.div
                className="text-4xl md:text-6xl font-bold text-[#f47458] mb-2"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                100+
              </motion.div>
              <p className="text-neutral-700">Alumni Network</p>
            </div>

            <div>
              <motion.div
                className="text-4xl md:text-6xl font-bold text-[#f47458] mb-2"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                50+
              </motion.div>
              <p className="text-neutral-700 font">Active Members</p>
            </div>
          </motion.div>
        </div>
      </section>

     
      <Footer />
    </main>
  );
}