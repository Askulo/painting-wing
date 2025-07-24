import {React, useEffect} from 'react'
import AOS from 'aos'

function Benefits() {
    useEffect(() => {
      AOS.init({ once: true });
    }, []);
  return (
    
  <section className='w-full h-full bg-[#e06348] flex flex-col justify-center items-center rounded-t-[50px] overflow-hidden relative'>
        <div className="squaresElem md:visible  invisible ">
          <div className=' bg-[#ffa490b6] w-5 h-5 absolute top-[70%] left-[10%]'></div>
        <div className=' bg-[#ffa4907d] w-5 h-5 absolute top-[76%] left-[10%]'></div>
        <div className=' bg-[#ffa4902e] w-5 h-5 absolute top-[81.9%] left-[10%]'></div>
        </div>
     <div className='w-[80vw] min-h-[60vh] md:min-h-[60vh] flex flex-col items-center justify-center py-10 md:py-10' >
       <div className="its-benefits md:pl-[15vw]">
        <h2 className='text-[1.9rem] md:text-5xl font-medium pb-5 md:pb-5' data-aos='fade-right' data-aos-duration='1500'>Benefits of Participation</h2>

      <div 
                data-aos='fade-up'  
                data-aos-offset="200"
                data-aos-delay="100"
                data-aos-easing="ease-in-out">

        <h3 className='text-neutral-50 text-[1.3rem] md:pb-1'>Platform to Showcase Talent:</h3>
        <p className='text-neutral-900'>Participants can showcase their creative skills through various visual forms.</p>

        <h3 className='text-neutral-50 text-[1.3rem] pb-1'>Learning Opportunity:</h3>
        <p className='text-neutral-900'>Participants can learn and gain insights through online exposure to diverse creative styles.</p>

        <h3 className='text-[1.3rem] text-neutral-50 pb-1'>Theme Interpretation Practice</h3>
        <p className='text-neutral-900'>Sharpen your ability to convert themes into visual stories.</p>

        <h3 className='text-[1.3rem] text-neutral-50 pb-1'>Digital Presentation Skills</h3>
        <p className='text-neutral-900'>Digital Presentation Skills.</p>
        
</div>
    
      </div>  
      <a href="https://forms.gle/Bmuzm2Je8G7QcjBu6" target='_blank' className='text-[3.5vw] bg-[#fff] hover:bg-[#D25940] px-5 py-3 rounded-[20px]  text-black md:text-[1vw] mt-5 md:mt-5' data-aos='fade-right'>Register Now </a>
     </div>
</section>
  )
}

export default Benefits