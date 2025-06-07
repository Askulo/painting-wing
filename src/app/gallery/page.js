'use client'

import React, { useState } from 'react'
// import Gallery from '@/Components/Gallery'
import Navbar from '@/Components/BitSindri/Navbar'
// import LoadingScreen from '@/Components/LoadingScreen' // Adjust path if needed
import Gallery from '@/Components/Gallery'

const Page = () => {
  const [loading, setLoading] = useState(true);

  // Pass setLoading to Gallery so it can notify when loaded
  return (
    <>
      <Navbar />
      {/* {loading && <LoadingScreen />} */}
      <Gallery onLoaded={() => setLoading(false)} />
      {/* <Gallery /> */}
    </>
  )
}

export default Page
