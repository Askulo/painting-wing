'use client';

import { useEffect, useRef } from 'react';
import AlumniCard from './AlumniCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// Dummy alumni data grouped by batch
const alumniData = {
  '2K21': [
    {
      name: 'Aashish Kumar Lohra',
      position: 'Information Technology',
      image: '/Bearers/7.png',
      // quote: 'Chairperson',
      linkedin: 'https://www.linkedin.com/in/aashish-kumar-lohra-a09715256/',
      instagram: 'https://instagram.com/alice.verma',
      email: 'aashishkumarlohra9@gmail.com.com',
      cover: '/Bearers/covers/7-cover.jpg',
    },
    {
      name: 'Nilesh Kumar Mandal',
      position: 'Electrical',
      image: '/Bearers/4.png',
      // quote: 'Vice Chairperson',
      instagram: 'https://www.instagram.com/mandalnilesh8292?utm_source=ig_web_button_share_sheet&igsh=ODdmZWVhMTFiMw==',
      twitter: 'https://twitter.com/tanmayjoshi',
      email: 'kumarnilesh010524@gmail.com',
      cover: '/Bearers/covers/4-cover.jpg',
    },
    {
      name: 'Poonam Kumari',
      position: 'Electrical',
      image: '/Bearers/11.png',
      // quote: 'Vice Chairperson',
      linkedin: 'https://www.instagram.com/poonamk_02/?utm_source=ig_web_button_share_sheet',
      instagram: 'https://instagram.com/neha.design',
      email: 'neha@example.com',
      cover: '/Bearers/covers/11-cover.jpg',
    },
    {
      name: 'Jai Prakash Oraon',
      position: 'Civil',
      image: '/Bearers/1.png',
      // quote: 'Secretary',
      instagram: 'https://www.instagram.com/_jai_550o/?utm_source=ig_web_button_share_sheet',
      linkedin: 'https://linkedin.com/in/sanyakapoor',
      email: 'sanya@example.com',
      cover: '/Bearers/covers/1-cover.jpg',
    },
    {
      name: 'Samriddhi Singh',
      position: 'Chemical',
      image: '/Bearers/12.png',
      // quote: 'Secretary',
      instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/sanyakapoor',
      email: 'rajat@example.com',
      cover: '/Bearers/covers/12-cover.jpg',
    },
    {
      name: 'Tithi',
      position: 'Chemical',
      image: '/Bearers/9.png',
      // quote: 'Joint Secretary',
      instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/sanyakapoor',
      email: 'rajat@example.com',
      cover: '/Bearers/covers/9-cover.jpg',
    },
    {
      name: 'Anil Chandra Kisku',
      position: 'Mechanical',
      image: '/Bearers/14.png',
      // quote: 'Technical Head',
      instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'pooja@example.com',
      cover: '/Bearers/covers/14-cover.jpg',
    },
    {
      name: 'Aman Murmu',
      position: 'Mining',
      image: '/Bearers/13.png',
      // quote: 'Treasurer',
      instagram: 'https://www.instagram.com/sluggishry/?utm_source=ig_web_button_share_sheet&igsh=ODdmZWVhMTFiMw%3D%3D#',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'aryan@example.com',
      cover: '/Bearers/covers/13-cover.jpg',
    },
    {
      name: 'Komal Xalxo',
      position: 'Civil',
      image: '/Bearers/5.png',
      // quote: 'Joint Treasurer',
      instagram: 'https://www.instagram.com/_jai_550o/?utm_source=ig_web_button_share_sheet',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'mitali@example.com',
      cover: '/Bearers/covers/5-cover.jpg',
    },
    {
      name: 'Riya Gari',
      position: 'Civil',
      image: '/Bearers/15.png',
      // quote: 'Alumni Head',
      instagram: 'https://www.instagram.com/ria_gari/?utm_source=ig_web_button_share_sheet',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'kunal@example.com',
      cover: '/Bearers/covers/15-cover.jpg',
    },
    {
      name: 'Sahil Sah',
      position: 'Chemical',
      image: '/Bearers/16.png',
      // quote: ' Alumni Head',
      instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
      cover: '/Bearers/covers/16-cover.jpg',
    },
    {
      name: 'Shweta Kumari',
      position: 'Cse',
      image: '/Bearers/8.png',
      // quote: 'Media Head',
      instagram: 'https://www.instagram.com/shweta.k8515/?utm_source=ig_web_button_share_sheet',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
      cover: '/Bearers/covers/8-cover.jpg',
    },
    {
      name: 'Sunaram Hansda',
      position: 'Mechnical',
      image: '/Bearers/6.png',
      // quote: 'Media Head',
      instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
      cover: '/Bearers/covers/6-cover.jpg',
    },
    {
      name: 'Grecy Rose Tirkey',
      position: 'ECE',
      image: '/Bearers/2.png',
      // quote: 'PRO',
      instagram: 'https://www.instagram.com/rose._tirkey_/?utm_source=ig_web_button_share_sheet',
      linkedin: 'https://www.linkedin.com/in/grecy-rose-tirkey-4848aa271/',
      email: 'rosegrecy5@gmail.com',
      cover: '/Bearers/covers/2-cover.jpg',
    },
    {
      name: 'Rahul Kumar Mandal',
      position: 'Chemical',
      image: '/Bearers/10.png',
      // quote: 'PRO',
      instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
      cover: '/Bearers/covers/10-cover.jpg',
    },
    {
      name: 'Smriti Pal',
      position: 'Production',
      image: '/Bearers/3.png',
      // quote: 'Creative Head',
      instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
      cover: '/Bearers/covers/3-cover.jpg',
    },
  ],
};


export default function PostBearers() {
  const sectionsRef = useRef([]);
  const heroRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate the hero section
    gsap.fromTo(
      heroRef.current.querySelector('h1'),
      { opacity: 0, y: -30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out'
      }
    );
    
    gsap.fromTo(
      heroRef.current.querySelector('p'),
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        delay: 0.3,
        ease: 'power3.out'
      }
    );

    // For each batch section
    sectionsRef.current.forEach((section, index) => {
      // Animate the batch heading with a more sophisticated entrance
      gsap.fromTo(
        section.querySelector('.batch-heading'),
        { 
          opacity: 0, 
          x: -50,
          skewX: -10
        },
        { 
          opacity: 1, 
          x: 0,
          skewX: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Custom stagger effect for cards to create a wave-like appearance
      gsap.fromTo(
        section.querySelectorAll('.alumni-card'),
        { 
          opacity: 0, 
          y: 100,
          scale: 0.9,
          rotation: -2
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: {
            amount: 0.6, // Total stagger time spread across all elements
            from: 'center', // Start from the center for a wave effect
            grid: 'auto'
          },
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Animate the decorative line
      gsap.fromTo(
        section.querySelector('.decorative-line'),
        {
          scaleY: 0,
          transformOrigin: 'top'
        },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="overflow-hidden">
    
      <div className="py-16 px-4 md:pt-28 md:px-12 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 mt-10 relative inline-block">
            Office Bearers
            <span className="absolute rounded-full -bottom-2 left-0 right-0 h-1 bg-gradient-to-r to-[#e65512] from-gray-300"></span>
          </h1>
          <p className='text-gray-600 mt-5'> Meet the dedicated post bearers who lead our organization with vision, commitment, and excellence. Their leadership and teamwork drive our mission forward.</p>
        </div>

        {Object.entries(alumniData).map(([batch, members], batchIndex) => (
          <div 
            key={batch} 
            className="mb-20 pb-6 relative batch-section"
            ref={el => sectionsRef.current[batchIndex] = el}
          >
            {/* Decorative background element with class for animation */}
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b to-[#e65512] from-gray-100 rounded-full decorative-line"></div>
{/*             
            <h2 className="text-3xl font-semibold text-gray-700 mb-8 ml-4 batch-heading relative inline-block">
              Batch {batch}
              <span className="absolute -bottom-2 left-0 w-3/4 h-1 bg-gradient-to-r to-[#e65512] from-gray-300 "></span>
            </h2> */}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {members.map((alumnus, index) => (
                <div 
                  key={index} 
                  className="alumni-card w-full max-w-xs"
                  data-speed={1 + (index % 3) * 0.1} // Varied parallax speeds for visual interest
                >
                  <AlumniCard {...alumnus} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}