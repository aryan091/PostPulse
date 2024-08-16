import React from 'react'

const Header = () => {
  return (
    <div className='absolute top-0 left-0 p-4 mb-4 header w-screen  px-8 py-2 z-40 flex justify-between flex-col md:flex-row items-center bg-gradient-to-b from-black '>

    <h1 className='text-3xl font-bold text-white '>VerseVault</h1>

    <div  className='flex justify-around gap-4'>

        <button className='py-2 px-4 text-white bg-transparent border border-white rounded-md font-semibold'>My Post</button>

        <button className='py-2 px-4 text-white bg-transparent border border-white rounded-md font-semibold'>Bookmark</button>

        <button className='py-2 px-4 text-white bg-transparent border border-white rounded-md font-semibold'>Log Out</button>



    </div>

    </div>
  )
}

export default Header