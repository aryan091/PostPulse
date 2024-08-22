import React from 'react'

const ShimmerPostCard = () => {
  return (
<div className="relative h-full w-full">
          <div className="absolute inset-0 bg-gray-100 bg-opacity-50 shimmer animate-pulse animate-shimmer" />
          <div className="relative z-10 bottom-2 left-0 right-0 p-4 bg-gradient-to-b from-black rounded-b-md">
            <div className="w-full h-40 bg-gray-100 bg-opacity-50 shimmer rounded-md mb-2" />
            <div className="w-full h-12 bg-gray-100 bg-opacity-50 shimmer rounded-md mb-2" />
            <div className="w-full h-4 bg-gray-100 bg-opacity-50 shimmer rounded-md" />
            <div className="text-white flex justify-between mt-2">
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6 h-6 bg-gray-100 bg-opacity-50 shimmer rounded-full" />
                <div className="w-16 h-4 bg-gray-100 bg-opacity-50 shimmer rounded-md" />
              </div>
              <div className="w-6 h-6 bg-gray-100 bg-opacity-50 shimmer rounded-full" />
            </div>
          </div>
        </div>  )
}

export default ShimmerPostCard