// src/components/ImageCards.jsx
import {React, useEffect} from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import Image from 'next/image';



const cards = [

  {
    id: 1,
    image: '/shades/sketching.jpg',
    title: 'Sketching',
    
  },
  {
    id: 2,
    image: '/shades/painting.jpg',
    title: 'Painting',
   
  },
  {
    id: 3,
    image: '/shades/digitalArt.jpg',
    title: 'Digital Art',
   
  },
  {
    id: 4,
    image: '/shades/doodling.jpg',
    title: 'Doodling',
    
  },
];

const ImageCards = () => {

    useEffect(() => {
      AOS.init({ once: true });
    }, []);

  return (
    <section id='categories' className='w-full h-full bg-[#EFEAE3]'>
      <div className=''>
      <div id="Categories-header" className='flex items-start pl-[8vw] md:pl-[10vw] pb-5 pt-10 md:pb-10 '>
        <h2 className='text-[2rem] md:text-5xl font-medium capitalize z-10' data-aos='fade-right' data-aos-duration='1500'>Categories</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 max-w-7xl mx-auto w-[90vw]" 
        data-aos='fade-up'  
        data-aos-offset="200"
        data-aos-delay="100" 
        data-aos-easing="ease-in-out"
      >
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className="relative rounded-2xl overflow-hidden shadow-xl group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <Image
            src={card.image}
            alt={card.title}
            width={500}
            height={400}
            className="w-full h-[50vh] md:h-[45vh] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-[#ed7054] bg-gradient-to-t from-black/60 via-black/40 to-transparent z-10">
            <h2 className="text-[2rem] md:text-4xl font-medium text-center">{card.title}</h2>
            <p className="text-sm text-gray-200">{card.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
    </div>

       <div className='w-full min-h-[40vh] md:min-h-[50vh] bg-[#e06348] relative overflow-hidden mt-10 md:mt-10 pb-5 md:pb-5'>
        <h1 className='absolute top-[70%] md:top-[10%] left-[9%] text-[22vw] md:text-[20vw] font-[900] md:font-[800] opacity-15 md:opacity-10 text-[#ff9279]'data-scroll data-scroll-speed='-.3'>SHADES</h1>
        <div id="theme-disc" className='pt-10 md:pt-10 flex flex-col items-start  justify-center pl-[8vw] md:pl-[10vw] '>
        <h2 className='text-[2.5rem] md:text-6xl font-[600] capitalize text-[#ffa490] pb-5 md:pb-5 relative' data-aos='fade-right' data-aos-duration='1000'> Theme - SHADES</h2>

        <div className='w-[80%] flex flex-col gap-1.5 relative pl-3 md:pl-5' data-aos='fade-up'  data-aos-offset="100"
                data-aos-delay="100" data-aos-easing="ease-in-out" >
          <span className='h-3 w-3 bg-[#ffa490] rounded-full absolute top-[3%] md:top-[7%]'></span><p className='pl-4 text-[1.3rem] md:text-[1.4rem] text-neutral-900'> Nature's Palette</p>
          <span className='h-3 w-3 bg-[#ffa490] rounded-full absolute top-[19%]  md:top-[33%]'></span><p className='text-[1.3rem] md:text-[1.4rem] text-neutral-900 pl-4'> Human Emotions
            Paws & Feathers Incredible India</p>
          <span className='h-3 w-3 bg-[#ffa490] rounded-full absolute top-[48%]  md:top-[59%]'></span><p className='text-[1.3rem] md:text-[1.4rem] text-neutral-900 pl-4'> Kaleidoscope – Colors, patterns,diversity</p>
         <span className='h-3 w-3 bg-[#ffa490] rounded-full absolute top-[77%]  md:top-[85%]'></span><p className='text-[1.3rem] md:text-[1.4rem] text-neutral-900 pl-4'> Dreamscapes & Inner Worlds –Imagination, dreams.</p>
         
        </div>
        
    </div>
       </div>


    </section>
  );
};

export default ImageCards;
