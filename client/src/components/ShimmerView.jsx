import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const ShimmerView = () => {
  return (

      <div className="relative z-10 bg-black bg-opacity-70 md:mx-auto h-full md:h-3/4 top-20 text-white w-screen md:w-4/5 shadow-2xl rounded-lg">
        <div className="w-full h-1/4 md:h-full flex flex-col">
          <div className="w-full h-96 bg-gray-300 animate-shimmer rounded-lg" />
          <div className="h-full w-full p-4 md:p-8">
            <div className="text-white flex justify-between mt-2 gap-4 md:gap-0">
              <div className="flex flex-row gap-2 items-center">
                <div className="rounded-full w-10 h-10 bg-gray-300 animate-shimmer" />
                <div>
                  <div className="h-4 bg-gray-300 animate-shimmer rounded-md mb-2" />
                  <div className="h-4 bg-gray-300 animate-shimmer rounded-md" />
                </div>
              </div>
              <div>
                <div className="h-4 bg-gray-300 animate-shimmer rounded-md" />
              </div>
            </div>

            <div className="h-8 bg-gray-300 animate-shimmer rounded-md mt-4" />
            <div className="h-4 bg-gray-300 animate-shimmer rounded-md mt-2" />
          </div>
        </div>
      </div>

  );
};

export default ShimmerView;
