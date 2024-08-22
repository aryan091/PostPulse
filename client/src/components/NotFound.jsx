import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { BG_URL } from '../utils/constants'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <>
    <div className="min-h-[78.75vh] w-full overflow-x-hidden">
                <Header />

{/* Background Image */}
<div className="fixed inset-0 z-0 w-full h-full ">
  <img
    src={BG_URL}
    alt="Bg-Image"
    className="w-full h-full object-cover"
    loading="lazy"
  />

  <div className='absolute w-full top-28 md:top-64 p-8  bg-black bg-opacity-50 h-80 md:h-44'>
    <p className='text-white text-3xl font-bold text-center absolute'>
    <span className='text-red-500'>Looking for something?</span>
    We're sorry. The Web address you entered is not a functioning page on our site.
    </p>

    <Link to='/'><p className='text-white left-0 text-3xl font-bold text-center right-0 absolute mt-48 md:mt-24'>Go to <span className='text-red-500 hover:underline'>PostPulse's</span> Home</p></Link>
  </div>

</div>

    </div>
    <Footer />
    </>
  )
  
}

export default NotFound