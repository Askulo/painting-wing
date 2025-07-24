
import {React, useEffect} from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';


const cards = [
  {
    id: 1,
    image: '/shades/shwin7.jpg',
    title: '1st Winner',
    description: 'Komal Pahan'
  },
  {
    id: 2,
    image: '/shades/shwin6.jpg',
    title: '1st Runner',
    description: 'Raj Shah'
    
  },
  {
    id: 3,
    image: '/shades/shwin5.jpg',
    title: '2nd Runner',
    description: 'Nilesh Oraon'

  },

];

const HallOfFame = () => {
    useEffect(() => {
      AOS.init({ once: true });
    }, []);
  return (
    <section id='categories' className='w-full h-full bg-[#EFEAE3]  md:pb-10 md:pt-10 mt-10 md:mt-10'>
      <div id="Categories-header" className='flex items-start pl-[8vw] pb-5 md:pl-[10vw]' data-aos='fade-right' data-duration='1500'>
        <h2 className='text-[2rem] md:text-5xl font-medium  capitalize' >Shades 2023 Winners</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto w-[90vw] md:w-[90vw] pb-10 md:pb-10" data-aos='fade-up' data-aos-duration='2000' data-aos-easing='easeInOut' >
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {/* Image--> */}

          <img
            src={card.image}
            alt={card.title}
            className="w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
          />

          {/* TEXT over the image--> */}

          <div className="absolute inset-0 flex flex-col justify-end p-4 text-[#E06348] bg-gradient-to-t from-black/90 via-black/0 to-transparent z-10">
            <h2 className="text-[2rem] md:text-3xl">{card.title}</h2>
            <p className=" text-gray-200">{card.description}</p>
          </div>
        </motion.div>
      ))}
    </div>

   

    </section>
  );
};

export default HallOfFame;
