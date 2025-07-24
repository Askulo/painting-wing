'use client'

import Image from 'next/image'
import { React, useEffect } from 'react'
import AOS from 'aos'



function WinnerSection() {
      useEffect(() => {
        AOS.init({ once: true });
      }, []);
  return (
    <section id="winner_section" className='w-screen bg-[#EFEAE3] flex flex-col items-center justify-center'
        data-aos='fade-up'  
        data-aos-offset="200"
        data-aos-delay="100" 
        data-aos-easing="ease-in-out"
    >
        <div className="box w-[80vw] min-h-[50vh] md:w-[60vw] md:min-h-[50vh]  bg-white-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-1 border border-[#d44829]
         pb-5"
        data-scroll data-scroll-speed="0.3">

           <div id="winner_header" className='flex flex-col items-center gap-5 pt-5 md:pt-10'>
            <h2 className='text-[1.7rem] md:text-5xl font-medium  capitalize'>all winners will get</h2>
            {/* <img src="./public/shades/cup.png" className='w-[30%] md:w-[10%] h-auto object-cover' alt="cup" /> */}
            <Image src="/shades/cup.png" width={50} height={30} alt="logo" />
           </div>

           <div id="winner_desc" className='pl-10 pt-[8vw] md:pt-[2vw] flex flex-col   gap-5 '>
           
            <p className=' flex items-center gap-1.5  capitalize text-neutral-700 md:justify-center'><span className='w-3 h-3 bg-black rounded-full'></span>Certificate of Achievement</p>
            <p className=' flex items-center gap-1.5 capitalize text-neutral-700 md:justify-center'><span className='w-3 h-3 bg-black rounded-full'></span>cash prize upto 2.5K</p>
            <p className=' flex items-center gap-1.5 capitalize text-neutral-700 md:justify-center'><span className='w-3 h-3 bg-black rounded-full'></span>Social Media Spotlight</p>
            <p className=' flex items-center gap-1.5 capitalize text-neutral-700 md:justify-center'><span className='w-3 h-3 bg-black rounded-full'></span>National-Level Fame</p>
            <p className=' flex items-center gap-1.5 capitalize text-neutral-700 md:justify-center'><span className='w-3 h-3 bg-black rounded-full'></span>Featured in Winner Gallery</p>

           </div>

        </div>
    </section>
  )
}

export default WinnerSection