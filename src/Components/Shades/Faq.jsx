import {React, useEffect} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'; 


function FrequentAskedQuestions() {
    useEffect(() => {
      AOS.init({ once: true });
    }, []);
  return (
    <section id='Faq'className='min-h-screen bg-[#F2F0E6]  pt-20 md:pt-20 pb-20'>
               <div className="w-[80w] faq-desc flex flex-col items-center justify-center" data-scroll  data-scroll-speed="0.1">
                 <h2 className='text-[1.4rem] md:text-5xl font-medium mb-16'>Frequently Asked Questions</h2>
               
                <div className='grid grid-cols-1 md:grid-cols-2 gap-16 w-[80vw]' data-aos='fade-right'
                data-aos-offset="200"
                data-aos-delay="100"
                data-aos-duration="1500"
                data-aos-easing="ease-in-out">

                    <div className='border-b border-neutral-300 pb-5 relative' >
                        <h1 className='text-[9rem]  absolute top-[-5rem] left-20 text-[ #cbc39a] opacity-[0.08] text-[#B1702F]'>01</h1>
                        <h3 className='text-[1.1rem] font-medium mb-2 flex items-start'><span className='text-[#E06348]'>Q.</span>Who can participate in SHADES ?</h3>
                        <p className='pl-5'>
                        SHADESis open to everyone. Whether you're a student, professional, or hobbyist — if you
                        love art, you’re welcome to participate!
                        </p>
                        </div>

                    <div className='border-b border-neutral-300 pb-5 relative'>
                        <h1 className='text-[9rem]  absolute top-[-5rem] left-15 text-[ #cbc39a] opacity-[0.08] text-[#B1702F]'>02</h1>
                         <h3 className='text-[1.1rem] font-medium mb-2 flex items-start'><span className='text-[#E06348]'>Q.</span> . What types of artwork are allowed?</h3>
                        <p className='pl-5 text-neutral-700'>
                         Weaccept Sketching, Painting, Doodling, and Digital Art. Any theme or style is welcome,
                         as long as it aligns with our guidelines.  
                        </p>
                        
                        </div>

                    <div className='border-b border-neutral-300 pb-5 relative'>
                         <h1 className='text-[9rem]  absolute top-[-5rem] left-15 text-[ #cbc39a] opacity-[0.08] text-[#B1702F]'>03</h1>
                         <h3 className='text-[1.1rem] font-medium mb-2 flex items-start'><span className='text-[#E06348]'>Q.</span>  How doI submit my artwork?</h3>
                        <p className='pl-5 text-neutral-700'>
                       You can submit your entry through the official submission form available on this website.
 Make sure to upload a clear image of your artwork, and for digital entries, attach the AI or
 PSDfile as well
                        </p>
                        
                        </div>
                    <div className='border-b border-neutral-300 pb-5 relative'>
                         <h1 className='text-[9rem]  absolute top-[-5rem] left-15 text-[ #cbc39a] opacity-[0.08] text-[#B1702F]'>04</h1>
                         <h3 className='text-[1.1rem] font-medium mb-2 flex items-start'><span className='text-[#E06348]'>Q.</span> Is there any registration fee?</h3>
                        <p className='pl-5 text-neutral-700'>
                          No, participation in SHADES is completely free of cost
                        </p>
                        
                        </div>
                    <div className='border-b border-neutral-300 pb-5 relative'>
                         <h1 className='text-[9rem]  absolute top-[-5rem] left-15 text-[ #cbc39a] opacity-[0.08] text-[#B1702F]'>05</h1>
                         <h3 className='text-[1.1rem] font-medium mb-2 flex items-start'><span className='text-[#E06348]'>Q.</span>  Can I edit my entry after submitting?</h3>
                        <p className='pl-5 text-neutral-700'>
                          Unfortunately, no edits are allowed once the entry is submitted. Please double-check your
 artwork and details before uploading.
                        </p>
                        
                        </div>

                    <div className='border-b border-neutral-300 pb-5 relative'>
                         <h1 className='text-[9rem]  absolute top-[-5rem] left-15 text-[ #cbc39a] opacity-[0.08] text-[#B1702F]'>06</h1>
                         <h3 className='text-[1.1rem] font-medium mb-2 flex items-start'><span className='text-[#E06348]'>Q.</span> What kind of content is not allowed in submissions?</h3>
                        <p className='pl-5 text-neutral-700'>
                        Artworks must not include any offensive, political, or inappropriate content. Any such
 entries will be disqualified without notice
                        </p>
                        </div>



                    <div className='border-b border-neutral-300 pb-5 relative'>
                         <h1 className='text-[9rem]  absolute top-[-5rem] left-15 text-[ #cbc39a] opacity-[0.08] text-[#B1702F]'>07</h1>
                         <h3 className='text-[1.1rem] font-medium mb-2 flex items-start'><span className='text-[#E06348]'>Q.</span>  Can I submit more than one entry?</h3>
                        <p className='pl-5 text-neutral-700'>
                         No, only one entry per participant is allowed. Choose your best artwork for submission.
                        </p>
                        
                        </div>

                        <div className='border-b border-neutral-300 pb-5 relative'>
                         <h1 className='text-[9rem]  absolute top-[-5rem] left-15 text-[ #cbc39a] opacity-[0.08] text-[#B1702F]'>08</h1>
                         <h3 className='text-[1.1rem] font-medium mb-2 flex items-start'><span className='text-[#E06348]'>Q.</span> . How will my entry be judged?</h3>
                        <p className='pl-5 text-neutral-700'>
                         Judging will be based on creativity and Instagram engagement (likes/comments). The top
 10 will go through an online presentation, and the final top 3 will be selected by a jury.
                        </p>
                        
                        </div>

                </div>
                </div>
        </section>
  )
}

export default FrequentAskedQuestions