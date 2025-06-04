"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, Linkedin, Dribbble, ExternalLink } from "lucide-react"

// ==================== DATA ====================
const designers = [
  {
    id: 1,
    name: "Aashish Kumar Lohra",
    title: "Intermediate 3D Developer & Designer",
    avatar: "/placeholder-avatar-1.jpg",
    experience: 1,
    location: "BIT Sindri, Dhanbad, Jharkhand",
    specializations: ["Three.js", "Next.js", "WebGL", "React Three Fiber"],
    skills: {
      "Three.js": 95,
      Blender: 50,
      "Framer Motion": 92,
      React: 90,
      TypeScript: 85,
    },
    stats: {
      projects: 11,
      clients: 3,
      awards: 2,
    },
    social: {
      github: "Askulo",
      linkedin: "aashish-kumar-lohra-a09715256",
      twitter: "AashishLohra",
    },
    portfolio: "https://alexchen3d.com",
  },
  {
    id: 2,
    name: "Nilesh Kumar Mandal",
    title: "Intermediate 3D Developer & Designer",
    avatar: "/placeholder-avatar-2.jpg",
    experience: 1,
    location: "BIT Sindri, Dhanbad, Jharkhand",
    specializations: ["Vanilla Three.js", "Interactive Design", "React Three Fiber", "AR/VR"],
    skills: {
      "Creative Coding": 92,
      "Three.js": 87,
      "Premiere Pro": 94,
      "Framer Motion": 60,
      JavaScript: 80,
    },
    stats: {
      projects: 7,
      clients: 3,
      awards: 2,
    },
    social: {
      github: "Mandal027",
      linkedin: "sarah-martinez-creative",
      twitter: "sarahcreates",
    },
    portfolio: "https://sarahcreates.studio",
  },
]

// ==================== UI COMPONENTS ====================
function Badge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}

function Button({ children, className = "", onClick, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

// ==================== ANIMATION COMPONENTS ====================
function StatsCounter({ value, duration = 2, delay = 0 }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      let startTime
      let animationFrame

      const startAnimation = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = (timestamp - startTime) / (duration * 1000)

        if (progress < 1) {
          setCount(Math.floor(value * progress))
          animationFrame = requestAnimationFrame(startAnimation)
        } else {
          setCount(value)
        }
      }

      const timeoutId = setTimeout(() => {
        animationFrame = requestAnimationFrame(startAnimation)
      }, delay * 1000)

      return () => {
        clearTimeout(timeoutId)
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [inView, value, duration, delay])

  return (
    <motion.span
      ref={ref}
      className="text-2xl sm:text-3xl font-bold text-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {count}
    </motion.span>
  )
}

function SkillBar({ skill, level, delay }) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const getColorClass = (level) => {
    if (level >= 90) return "bg-gradient-to-r from-orange-400 to-orange-500"
    if (level >= 80) return "bg-gradient-to-r from-orange-300 to-orange-400"
    return "bg-gradient-to-r from-gray-400 to-gray-500"
  }

  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${level}%`,
        transition: { duration: 1.2, delay, ease: "easeOut" },
      })
    }
  }, [controls, inView, level, delay])

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{skill}</span>
        <span className="text-sm font-semibold text-gray-600">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <motion.div
          initial={{ width: "0%" }}
          animate={controls}
          className={`h-full rounded-full ${getColorClass(level)}`}
        />
      </div>
    </div>
  )
}

// ==================== CARD COMPONENTS ====================
function DesignerAvatar({ name }) {
  return (
    <div className="relative">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-500 opacity-75 blur-sm" />
      <div className="relative h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 overflow-hidden rounded-2xl border-3 border-white bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-600">
          {name.charAt(0)}
        </div>
      </div>
    </div>
  )
}

function DesignerInfo({ designer, index }) {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">{designer.name}</h2>
      <p className="text-orange-500 font-semibold text-sm sm:text-base">{designer.title}</p>
      <p className="text-xs sm:text-xs text-gray-600 max-w-xs mx-auto">{designer.location}</p>
      
      <div className="flex items-center justify-center space-x-2 pt-2">
        <span className="text-gray-600 text-lg">Experience:</span>
        <div className="flex items-baseline">
          <StatsCounter value={designer.experience} duration={2} delay={index * 0.2 + 1.2} />
          <span className="ml-1 text-gray-700 text-sm font-medium">years</span>
        </div>
      </div>
    </div>
  )
}

function SpecializationTags({ specializations }) {
  return (
    <div className="flex flex-wrap justify-center gap-3.5">
      {specializations.map((spec, i) => (
        <Badge
          key={i}
          className="bg-orange-100 text-orange-700 border border-orange-200 hover:bg-orange-150 transition-colors duration-200"
        >
          {spec}
        </Badge>
      ))}
    </div>
  )
}

function StatsGrid({ designer, index }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full bg-gray-50 rounded-xl p-1  border border-gray-200">
      <div className="text-center">
        <StatsCounter value={designer.stats.projects} duration={2.5} delay={index * 0.2 + 1.5} />
        <p className="text-xs text-gray-600 font-medium">Projects</p>
      </div>
      <div className="text-center">
        <StatsCounter value={designer.stats.clients} duration={2.5} delay={index * 0.2 + 1.7} />
        <p className="text-xs text-gray-600 font-medium">Clients</p>
      </div>
      <div className="text-center">
        <StatsCounter value={designer.stats.awards} duration={2.5} delay={index * 0.2 + 1.9} />
        <p className="text-xs text-gray-600 font-medium">Awards</p>
      </div>
    </div>
  )
}

function SocialLinks({ designer }) {
  const socialLinkClass = "rounded-full bg-gray-700 p-2.5 text-white transition-all duration-300 hover:bg-orange-500 hover:scale-110 hover:shadow-lg"

  return (
    <div className="flex justify-center space-x-4 pt-4">
      {designer.social.github && (
        <a
          href={`https://github.com/${designer.social.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className={socialLinkClass}
          onClick={(e) => e.stopPropagation()}
        >
          <Github className="h-4 w-4" />
          <span className="sr-only">GitHub</span>
        </a>
      )}
      {designer.social.linkedin && (
        <a
          href={`https://linkedin.com/in/${designer.social.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className={socialLinkClass}
          onClick={(e) => e.stopPropagation()}
        >
          <Linkedin className="h-4 w-4" />
          <span className="sr-only">LinkedIn</span>
        </a>
      )}
      {designer.social.dribbble && (
        <a
          href={`https://dribbble.com/${designer.social.dribbble}`}
          target="_blank"
          rel="noopener noreferrer"
          className={socialLinkClass}
          onClick={(e) => e.stopPropagation()}
        >
          <Dribbble className="h-4 w-4" />
          <span className="sr-only">Dribbble</span>
        </a>
      )}
      {designer.social.twitter && (
        <a
          href={`https://twitter.com/${designer.social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          className={socialLinkClass}
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="sr-only">Twitter</span>
        </a>
      )}
    </div>
  )
}

function CardFront({ designer, index, handleFlip }) {
  return (
    <div
      className="absolute inset-0 rounded-2xl bg-white shadow-xl border border-gray-200 p-4 sm:p-5 cursor-pointer transition-all duration-300 hover:shadow-2xl"
      style={{ backfaceVisibility: "hidden" }}
      onClick={handleFlip}
    >
      <div className="flex flex-col items-center space-y-6 h-full">
        <DesignerAvatar name={designer.name} />
        <DesignerInfo designer={designer} index={index} />
        <SpecializationTags specializations={designer.specializations} />
        <StatsGrid designer={designer} index={index} />

        <div className=" z-10 md:-mt-4 w-full ">
          <Button
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={(e) => {
              e.stopPropagation()
              window.open(designer.portfolio, "_blank")
            }}
          >
            View Portfolio
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>

          <p className="text-xs text-gray-500 text-center">Click card to see skills</p>
        </div>
      </div>
    </div>
  )
}

function CardBack({ designer, handleFlip }) {
  return (
    <div
      className="absolute inset-0 rounded-2xl bg-white shadow-xl border border-gray-200 p-6 sm:p-8 cursor-pointer"
      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      onClick={handleFlip}
    >
      <div className="flex h-full flex-col">
        <h3 className="mb-6 text-center text-xl font-bold text-gray-800">Skills & Expertise</h3>

        <div className="flex-1 space-y-4">
          {Object.entries(designer.skills).map(([skill, level], i) => (
            <SkillBar key={skill} skill={skill} level={level} delay={i * 0.1 + 0.5} />
          ))}
        </div>

        <div className="mt-6">
          <SocialLinks designer={designer} />
          <p className="mt-4 text-center text-xs text-gray-500">Click to flip back</p>
        </div>
      </div>
    </div>
  )
}

// ==================== MAIN CARD COMPONENT ====================
function DesignerCard({ designer, index, prefersReducedMotion }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.2 + 0.3,
        ease: "easeOut",
      },
    },
  }

  const handleFlip = () => {
    if (prefersReducedMotion) return
    setIsFlipped(!isFlipped)
  }

return (
    <motion.div
        variants={cardVariants}
        whileHover={prefersReducedMotion ? {} : { y: -8, transition: { duration: 0.2 } }}
        className="group relative w-full max-w-sm mx-auto"
        style={{ perspective: "1000px", minHeight: "475px" }}
    >
        <div
        className={`relative h-full transition-all duration-700 ${isFlipped ? "rotate-y-180" : ""} md:min-h-[506px] lg:min-h-[506px]`} 
        style={{ transformStyle: "preserve-3d" }}
      >
        <CardFront designer={designer} index={index} handleFlip={handleFlip} />
        <CardBack designer={designer} handleFlip={handleFlip} />
      </div>
    </motion.div>
  )
}

// ==================== MAIN COMPONENT ====================
export default function DesignersShowcase() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,146,60,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(251,146,60,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div
            className="text-center mb-3 sm:mb-3 lg:mb-3.5"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-[40px] lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-800 via-orange-600 to-gray-800 bg-clip-text text-transparent">
                Meet The Developers
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full" />
          </motion.div>
          
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-4 lg:gap-16 max-w-6xl mx-auto">
            {designers.map((designer, index) => (
              <DesignerCard
                key={designer.id}
                designer={designer}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}