'use client'

import { useState } from 'react'
// import './App.css'
import Hero from './Shades/Hero'
import WinnerSection from './Shades/WinnerSection'
import Feedback from './Shades/feedback'
import Categories from './Shades/categories'
// import Theme from './Components/Theme'
import Prizes from './Shades/Prizes'
import Benefit from './Shades/Benefits'
import Faq  from './Shades/Faq'
import HallOfFame from './Shades/HallofFame'

// import LocomotiveScroll from 'locomotive-scroll';
import Navbar from './BitSindri/Navbar'
import Footer from './BitSindri/Footer'





function App() {

    // const locomotiveScroll = new LocomotiveScroll();

    return (
        <section id="container" className='bg-[#EFEAE3]'>
            <Navbar />
            <Hero/>
            <WinnerSection/>
            <Feedback/>
            <Categories/>
            <HallOfFame/>
            <Prizes/>
            <Benefit/> 
            <Faq/>
            <Footer />
        </section>
    )
}

export default App
