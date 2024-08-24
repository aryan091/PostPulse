import React from "react";
import {FaLinkedin} from 'react-icons/fa'
import {FaGithub} from 'react-icons/fa'
import { FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
<footer className=" footer bg-gray-800 relative text-white px-6 py-6 w-full overflow-x-visible">
<div className="container mx-auto text-center w-full">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="mt-4">
          <a
            href="/privacy-policy"
            className="text-gray-400 hover:text-white mx-2"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="text-gray-400 hover:text-white mx-2"
          >
            Terms of Service
          </a>
        </div>
        <div className="mt-4 flex justify-center gap-4">
        <FaLinkedin className='cursor-pointer hover:text-pink-500'  onClick={() => window.open('https://www.linkedin.com/in/aryandaftari/', '_blank')}/>
        <FaGithub className='cursor-pointer hover:text-pink-500' onClick={() => window.open('https://github.com/aryan091', '_blank')}/>
        <FaGlobe className='cursor-pointer hover:text-pink-500' onClick={() => window.open('https://portfolio-three-gules-82.vercel.app/', '_blank')}/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
