// Shimmer.js
import React from 'react';

const Shimmer = () => {
  return (
    <div className="relative h-[460px] w-[20rem] md:w-[30rem] rounded-md overflow-hidden group shadow-2xl bg-gray-100 bg-opacity-50  animate-pulse">


<div className="absolute inset-0 bg-gradient-to-r   animate-shimmer" />
            <div className="relative p-4">
                {/* Content styling for the shimmer placeholder */}
                <div className="h-32 bg-gray-100 rounded-md mb-4 bg-opacity-50" />
                <div className="h-8 bg-gray-100 rounded-md mb-2 bg-opacity-50" />
                <div className="h-8 bg-gray-100 rounded-md bg-opacity-50" />
            </div>


    </div>
  );
};

export default Shimmer;
