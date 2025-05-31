


import React from 'react'
// import Navbar from '@/BitSindri/Navbar'
// import HeroSection from '@Components/BitSindri/Hero'
import AboutSection from '@/Components/BitSindri/About'
import AcademicsSection from '@/Components/BitSindri/Academic'
import Footer from '@/Components/BitSindri/Footer'
import Navbar from '@/Components/BitSindri/Navbar'
import HeroSection from '@/Components/BitSindri/Hero'

const BitSindri = () => {
  return (
   <>
    {/* <div className='bg-black w-screen absolute top-0 left-0 overflow-y-scroll h-screen pointer-events-none'></div> */}
    <div
  className="bg-black w-screen overflow-y-scroll h-screen absolute top-0 left-0 z-[9999] pointer-events-auto"
>
  <Navbar />
  <HeroSection />
  <AboutSection />
  <AcademicsSection />
  <Footer />
</div>

   </>
  )
}

export default BitSindri
