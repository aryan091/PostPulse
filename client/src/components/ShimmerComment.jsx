import React from "react";

const ShimmerComment = () => {
  return (
    <div className="animate-pulse flex space-x-4 mb-4 p-2 border-b border-gray-600">
      <div className="rounded-full bg-gray-700 h-10 w-10"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default ShimmerComment;
