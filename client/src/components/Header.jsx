import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../slice/userSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { setPosts } from "../slice/postSlice";
import { setMyPosts  } from '../slice/postSlice';
import { setBookmarks } from '../slice/postSlice';
import { FiMenu, FiX } from 'react-icons/fi';
import { IoLogInOutline } from "react-icons/io5";

const Header = () => {
  const user = localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();  // Add this line to get the current location
  const { setId, setUsername, setIsUserLoggedIn , setEmail } = useContext(UserContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async (searchQuery = '') => {
      try {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = token;

        let reqUrl;
        let response;

        if (location.pathname === '/my-posts') {
          // Fetch user's posts
          reqUrl = `${import.meta.env.VITE_BACKEND_URL}/post/my-posts${searchQuery ? `?title=${encodeURIComponent(searchQuery)}` : ''}`;
          response = await axios.get(reqUrl);
          dispatch(setMyPosts(response.data.data.posts));
        } else if (location.pathname === '/bookmarks') {
          // Fetch user's bookmarks
          reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/bookmarks${searchQuery ? `?title=${encodeURIComponent(searchQuery)}` : ''}`;
          response = await axios.post(reqUrl);
          dispatch(setBookmarks(response.data.data.bookmarks));
        } else {
          // Fetch all posts (default for `/` route)
          reqUrl = `${import.meta.env.VITE_BACKEND_URL}/post/all-posts${searchQuery ? `?title=${encodeURIComponent(searchQuery)}` : ''}`;
          response = await axios.get(reqUrl);
          dispatch(setPosts(response.data.data.posts));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(debouncedQuery);
    
  }, [debouncedQuery, dispatch, location.pathname]);


  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleRegisterClick = () => {
    navigate("/login", { state: { defaultSignIn: false } }); // Navigate to the register page with prop
  };

  const handleCreateTaskClick = () => {
    navigate("/create");
  };

  const handleMyPostsClick = () => {
    navigate("/my-posts");
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setIsUserLoggedIn(false);
    setId(null);
    setUsername(null);
    setEmail(null);
    dispatch(removeUser());
    navigate('/');
  };

  const handleBookmarkClick = () => {
    navigate("/bookmarks");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isPostDetailPage = /^\/post\/[a-zA-Z0-9]+$/.test(location.pathname);


  return (
    <div className='fixed top-0 left-0 w-full p-4 mb-4 z-40 flex flex-col md:flex-row justify-between items-center bg-gradient-to-b from-black to-transparent'>
      <Link to='/'><h1 className='text-3xl font-bold text-white '>PostPulse</h1></Link>

      {user && (
        <>
          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden flex items-center absolute left-[22rem]">
            <button onClick={toggleDropdown} className="text-white">
              {isDropdownOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Dropdown Menu */}
          <div className={`${isDropdownOpen ? 'block' : 'hidden'} md:flex justify-around items-center gap-4`}>
            <button className='py-2 px-4 text-white bg-transparent rounded-md font-semibold' onClick={handleCreateTaskClick}>Create</button>
            <button className='py-2 px-4 text-white bg-transparent rounded-md font-semibold' onClick={handleMyPostsClick}>My Posts</button>
            <button className='py-2 px-4 text-white bg-transparent rounded-md font-semibold' onClick={handleBookmarkClick}>Bookmark</button>
            <button className='py-2 px-4 text-white bg-transparent rounded-md font-semibold' onClick={handleLogOut}><IoLogInOutline color='white' size={20} />
            </button>
          </div>

          {/* Search Bar */}
          {!isPostDetailPage && (
            <div className='text-white flex gap-4 mt-4 md:mt-0'>
              <label htmlFor="search" className='text-white font-semibold'>Search</label>
              <input
                type="text"
                id="search"
                className='px-4 text-white border border-white bg-transparent rounded-md'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Title"
              />
            </div>
          )}
        </>
      )}
{ !user && (
  <><div className="md:hidden flex items-center absolute left-[22rem]">
            <button onClick={toggleDropdown} className="text-white">
              {isDropdownOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
          
<div className={`${isDropdownOpen ? 'block' : 'hidden'} md:flex justify-around items-center gap-4`}>
<button className='py-2 px-4 text-white bg-transparent rounded-md font-semibold' onClick={handleRegisterClick}>Register</button>
<button className='py-2 px-4 text-white bg-transparent rounded-md font-semibold' onClick={handleLoginClick}>Login</button>
</div>
</>
)}


    </div>
  );
};

export default Header;
