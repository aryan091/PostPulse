import React from 'react';
import { BG_CARD_URL , AVATAR_URL} from '../utils/constants';
import { FcLike } from "react-icons/fc";
import { FaBookmark, FaEdit } from "react-icons/fa";

const PostCard = ({post}) => {

    console.log("Post : ",post)

    const { heading, description, imageUrl } = post
    

  return (
    <div className="relative h-[460px] w-80 rounded-md overflow-hidden group shadow-2xl">
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-in-out bg-cover bg-center group-hover:scale-110"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}
      />
      {/* Edit Icon */}
      <button className="absolute top-2 right-2 z-20">
        <FaEdit size={24} color="white" />
      </button>

      {/* Content */}
      <div className="relative z-10 bottom-2 left-0 right-0 p-4 bg-gradient-to-b from-black rounded-b-md">
        <h1 className="text-[2rem] font-bold text-white mt-52  line-clamp-1 overflow-hidden">{heading}</h1>
        <p className="text-white h-12 mt-2 line-clamp-2 overflow-hidden">
          {description}
        </p>

        <div className="text-white flex justify-between mt-2">
          <div className="flex flex-row gap-2 items-center ">
            <div className='rounded-full w-12 h-12'>
                <img src={AVATAR_URL} alt=""  className='rounded-full w-full h-full'/>
                </div>            
            <div className='text-white font-bold'>Aryan Daftari</div>
          </div>
        </div>

        <p className='text-white font-semibold mt-2'>Published on 01 Jan 2023</p>


        <div className="text-white flex justify-between mt-2">
          <div className="flex flex-row gap-2 items-center">
            <button><FcLike size={24} /></button>
            <div>0</div>
          </div>
          <button><FaBookmark size={24} color="blue" /></button>
        </div>

      </div>
    </div>
  );
};

export default PostCard;
