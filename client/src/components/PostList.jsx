import React from 'react';
import Header from './Header';
import { BG_URL } from '../utils/constants';
import PostCard from './PostCard';

const PostList = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={BG_URL} alt="Bg-Image" className="h-screen w-screen object-cover" />
      </div>

      {/* Post Cards */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 py-20 overflow-y-scroll h-full mt-16">
        <PostCard />
        <PostCard />    <PostCard />    <PostCard />    <PostCard />
      </div>
    </div>
  );
};

export default PostList;
