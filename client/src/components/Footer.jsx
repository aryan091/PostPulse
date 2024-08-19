import React from "react";

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
        <div className="mt-4">
          <a
            href="https://twitter.com/yourcompany"
            className="text-gray-400 hover:text-white mx-2"
          >
            Twitter
          </a>
          <a
            href="https://facebook.com/yourcompany"
            className="text-gray-400 hover:text-white mx-2"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com/yourcompany"
            className="text-gray-400 hover:text-white mx-2"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
