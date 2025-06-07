'use client';

import { useEffect, useRef } from 'react';
import AlumniCard from './AlumniCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// Dummy alumni data grouped by batch
const alumniData = {
  '2K21': [
    {
      name: 'Krishna Kumar',
      position: 'Electrical',
      image: '/alumni21/22.png',
      // quote: 'Art speaks where words are unable to explain.',
      // twitter: 'https://twitter.com/aliceverma',
      linkedin: 'https://linkedin.com/in/aliceverma',
      instagram: 'https://instagram.com/alice.verma',
      email: 'alice@example.com',
    },
    {
      name: 'Komal Pahan',
      position: 'Electrical',
     image: '/alumni21/17.png',
      // quote: 'Creativity is intelligence having fun.',
      linkedin: 'https://linkedin.com/in/nehabansal',
      instagram: 'https://instagram.com/neha.design',
      email: 'neha@example.com',
    },
    {
      name: 'Rohit Mahato',
      position: 'Civil',
     image: '/alumni21/18.png',
      // quote: 'Art is a lie that makes us realize the truth.',
      instagram: 'https://instagram.com/neha.design',
      twitter: 'https://twitter.com/tanmayjoshi',
      email: 'tanmay@example.com',
    },
     {
      name: 'Praveen Oraon',
      position: 'ECE',
      image: '/alumni21/21.png',
      // quote: 'Every frame tells a story.',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
    },
    {
      name: 'Aaditya Narayan',
      position: 'Mechanical',
     image: '/alumni21/25.png',
      // quote: 'Design is about solving problems, not making things pretty.',
      instagram: 'https://instagram.com/neha.design',
      linkedin: 'https://linkedin.com/in/sanyakapoor',
      email: 'sanya@example.com',
    },
        {
      name: 'Alok Ranjan',
      position: 'Electrical',
     image: '/alumni21/23.png',
      // quote: 'Design with purpose.',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'kunal@example.com',
    },
    {
      name: 'Nikita Singh',
      position: 'Electrical',
      image: '/alumni21/24.png',
      // quote: 'Every frame tells a story.',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
    },
    // {
    //   name: 'Raghwendra Singh',
    //   position: 'Mechanical',
    //   image: '/img/7.jpg',
    //   // quote: 'Motion is emotion.',
    //   instagram: 'https://instagram.com/rajat.motion',
    //         linkedin: 'https://linkedin.com/in/sanyakapoor',
    //   email: 'rajat@example.com',
    // },
    {
      name: 'Raj Ranjan',
      position: 'Chemical',
      image: '/alumni21/27.png',
      // quote: 'Draw what you can’t say.',
        instagram: 'https://www.instagram.com/raj_ranjan_112002/',
      linkedin: '#',
      email: 'rajranjandeepak@gmail.com',
    },
    // {
    //   name: 'Kushagra Kaushal',
    //   position: 'Mechanical',
    //   image: '/img/9.jpg',
    //   // quote: 'Art connects the soul to the universe.',
    //           instagram: 'https://instagram.com/rajat.motion',
    //   linkedin: 'https://linkedin.com/in/poojarathi',
    //   email: 'aryan@example.com',
    // },
    {
      name: 'Nisha Sweety Murmu',
      position: 'Electrical',
     image: '/alumni21/19.png',
      // quote: 'Simplicity is the keynote of all true elegance.',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'mitali@example.com',
    },

    // {
    //   name: 'Riya Srivastava',
    //   position: 'Cse',
    //   image: '/img/12.jpg',
    //   // quote: 'Every frame tells a story.',
    //           instagram: 'https://instagram.com/rajat.motion',
    //   linkedin: 'https://linkedin.com/in/poojarathi',
    //   email: 'rhea@example.com',
    // },
   
    {
      name: 'Lovely Kumari',
      position: 'Metallurgy',
     image: '/alumni21/26.png',
      // quote: 'Every frame tells a story.',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
    },
    // {
    //   name: 'Ruchi Sarna Bhagat',
    //   position: 'ECE',
    //   image: '/img/12.jpg',
    //   // quote: 'Every frame tells a story.',
    //           instagram: 'https://instagram.com/rajat.motion',
    //   linkedin: 'https://linkedin.com/in/poojarathi',
    //   email: 'rhea@example.com',
    // },
    {
      name: 'Aman Tudu',
      position: 'Civil',
    image: '/alumni21/20.png',
      // quote: 'Every frame tells a story.',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
    },
  ],
  // '2K20': [
  //   {
  //     name: 'Shreyas Kumar Tah',
  //     position: 'Mechanical',
  //     image: '/img/2.jpg',
  //     // quote: 'Colors are my voice.',
  //     linkedin: 'https://linkedin.com/in/rohitmehra',
  //     instagram: 'https://instagram.com/rohit.art',
  //     email: 'shreyas@example.com',
  //   },
  //   {
  //     name: 'Ankit Singh',
  //     position: 'Mechanical',
  //     image: '/img/13.jpg',
  //     // quote: 'Imagination takes you everywhere.',
  //           linkedin: 'https://linkedin.com/in/rohitmehra',
  //     instagram: 'https://instagram.com/rohit.art',
  //     email: 'ankit@example.com',
  //   },
  //   {
  //     name: 'Anima Khalkho',
  //     position: 'Chemical',
  //     image: '/img/14.jpg',
  //     // quote: 'Design is not just what it looks like.',
  //           linkedin: 'https://linkedin.com/in/rohitmehra',
  //     instagram: 'https://instagram.com/rohit.art',
  //     email: 'Anima@example.com',
  //   },
  //   {
  //     name: 'Madhu Kumari',
  //     position: 'Chemical',
  //     image: '/img/15.jpg',
  //     // quote: 'Pixels have power.',
  //           linkedin: 'https://linkedin.com/in/rohitmehra',
  //     instagram: 'https://instagram.com/rohit.art',
  //     email: 'madhu@example.com',
  //   },
  //   {
  //     name: 'Prerna Kumari',
  //     position: 'Chemical',
  //     image: '/img/16.jpg',
  //     // quote: 'Great art makes the invisible visible.',
  //           linkedin: 'https://linkedin.com/in/rohitmehra',
  //     instagram: 'https://instagram.com/rohit.art',
  //     email: 'prerna@example.com',
  //   },
  //   {
  //     name: 'Akash Kumar Aryan',
  //     position: 'ECE',
  //     image: '/img/17.jpg',
  //     // quote: 'Patterns tell stories too.',
  //           linkedin: 'https://linkedin.com/in/rohitmehra',
  //     instagram: 'https://instagram.com/rohit.art',
  //     email: 'sneha@example.com',
  //   },
  //   {
  //     name: 'Karuna Kumari',
  //     position: 'ECE',
  //     image: '/img/18.jpg',
  //     // quote: 'Big walls, bigger ideas.',
  //           linkedin: 'https://linkedin.com/in/rohitmehra',
  //     instagram: 'https://instagram.com/rohit.art',
  //     email: 'karuna@example.com',
  //   },
  //   {
  //     name: 'Faishal Rahman',
  //     position: 'Metallurgy',
  //     image: '/img/19.jpg',
  //     // quote: 'Media is the message.',
  //           linkedin: 'https://linkedin.com/in/rohitmehra',
  //     instagram: 'https://instagram.com/rohit.art',
  //     email: 'lavanya@example.com',
  //   },
  //   {
  //     name: 'Abhishek Purty',
  //     position: 'Mining',
  //     image: '/img/20.jpg',
  //     // quote: 'Clarity in design is clarity in thought.',
  //           linkedin: 'https://linkedin.com/in/rohitmehra',
  //     instagram: 'https://instagram.com/rohit.art',
  //     email: 'abhishek@example.com',
  //   },
  //   {
  //     name: 'Adarsh Aind',
  //     position: 'Electrical',
  //     image: '/img/21.jpg',
  //     // quote: 'Your brand is your voice.',
  //           linkedin: 'https://linkedin.com/in/rohitmehra',
  //     instagram: 'https://instagram.com/rohit.art',
  //     email: 'adarsh@example.com',
  //   },
  // ],
  // '2K19': [
  //   {
  //     name: 'Simran Kapoor',
  //     position: 'Visual Designer at Pixellence',
  //     image: '/img/1.jpg',
  //     quote: 'Design is intelligence made visible.',
  //     twitter: 'https://twitter.com/simrankapoor',
  //     instagram: 'https://instagram.com/simran.design',
  //     email: 'simran@example.com',
  //   },
  //   {
  //     name: 'Nikhil Suri',
  //     position: 'Senior Illustrator at Byju’s',
  //     image: '/img/22.jpg',
  //     quote: 'Learning through lines.',
  //     email: 'nikhil@example.com',
  //   },
  //   {
  //     name: 'Radhika Bose',
  //     position: 'Art Therapist',
  //     image: '/img/23.jpg',
  //     quote: 'Healing with hues.',
  //     email: 'radhika@example.com',
  //   },
  //   {
  //     name: 'Aman Saxena',
  //     position: 'Poster Designer at Bollywood',
  //     image: '/img/24.jpg',
  //     quote: 'Cinema begins with a poster.',
  //     email: 'aman@example.com',
  //   },
  //   {
  //     name: 'Priya Kaul',
  //     position: 'Fashion Illustrator',
  //     image: '/img/25.jpg',
  //     quote: 'Style through sketches.',
  //     email: 'priya@example.com',
  //   },
  //   {
  //     name: 'Karan Singh',
  //     position: 'Digital Sculptor at Weta Digital',
  //     image: '/img/26.jpg',
  //     quote: 'Forms in pixels.',
  //     email: 'karan@example.com',
  //   },
  //   {
  //     name: 'Sanya Arora',
  //     position: 'Freelance Calligrapher',
  //     image: '/img/27.jpg',
  //     quote: 'Letters dance when I draw.',
  //     email: 'sanya@example.com',
  //   },
  //   {
  //     name: 'Ujjwal Mathur',
  //     position: 'Art Professor at NIFT',
  //     image: '/img/28.jpg',
  //     quote: 'Teaching creativity is creating teachers.',
  //     email: 'ujjwal@example.com',
  //   },
  //   {
  //     name: 'Ira Banerjee',
  //     position: 'Comics Creator',
  //     image: '/img/29.jpg',
  //     quote: 'Panels of passion.',
  //     email: 'ira@example.com',
  //   },
  //   {
  //     name: 'Zain Khan',
  //     position: 'Tattoo Artist',
  //     image: '/img/30.jpg',
  //     quote: 'Ink that speaks.',
  //     email: 'zain@example.com',
  //   },
  // ],
};


export default function AlumniPage() {
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
            Alumni
            <span className="absolute rounded-full -bottom-2 left-0 right-0 h-1 bg-gradient-to-r to-[#e65512] from-gray-300"></span>
          </h1>
          <p className='text-gray-600 mt-5'>A dedicated team of passionate alumni, united by a shared vision to drive innovation, foster meaningful connections, and consistently exceed expectations through their expertise, experience, and collaborative spirit.</p>
        </div>

        {Object.entries(alumniData).map(([batch, members], batchIndex) => (
          <div 
            key={batch} 
            className="mb-20 pb-6 relative batch-section"
            ref={el => sectionsRef.current[batchIndex] = el}
          >
            {/* Decorative background element with class for animation */}
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b to-[#e65512] from-gray-100 rounded-full decorative-line"></div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8 ml-4 batch-heading relative inline-block">
              Batch {batch}
              <span className="absolute rounded-full -bottom-2 left-0 w-3/4 h-1 bg-gradient-to-r to-[#e65512] from-gray-300 "></span>
            </h2>
            
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