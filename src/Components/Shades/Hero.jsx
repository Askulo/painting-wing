import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Important to include styles

function Hero() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section id="hero_section" className='w-screen h-[50vh] md:h-[80vh]  bg-[#EFEAE3] flex flex-col items-center justify-center'>
      <main className='text-center' data-scroll data-scroll-speed="-0.5">
        <div className='flex items-baseline space-x-1 font-bold'
          data-aos="fade-right"
          data-aos-delay="50"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
        >
        <h1
          className='uppercase text-[10vw] md:text-[6vw] font-[800] tracking-wide text-[#E06348] overflow-hidden' >
          shades'25
        </h1> 
        <h4 className='text-gray-500'>Live</h4>
        </div>

        <p
          className='w-[80vw] md:w-[40vw] text-neutral-700 pb-5 md:pb-10'
          data-aos="fade-right"
          data-aos-delay="50"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
        >
          A month-long national-level online art competition open to everyone — school and college students alike.
        </p>

        <a
          href="https://forms.gle/Bmuzm2Je8G7QcjBu6"
          target='_blank'
          className=' text-[14px] md:text-[20px] bg-[#E06348] hover:bg-[#D25940] px-5 py-3 rounded-xl text-white '
          data-aos="fade-right"
        >
          Register
        </a>
      </main>
    </section>
  );
}

export default Hero;
