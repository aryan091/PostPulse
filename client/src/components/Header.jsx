import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../slice/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { setPosts } from "../slice/postSlice"; // Ensure this action is imported

const Header = () => {
  const user = localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setId, setUsername, setIsUserLoggedIn } = useContext(UserContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const fetchAllPosts = async (searchQuery = '') => {
      try {
        const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/post/all-posts${searchQuery ? `?title=${encodeURIComponent(searchQuery)}` : ''}`;
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = token;
        const response = await axios.get(reqUrl);
        dispatch(setPosts(response.data.data.posts));
      } catch (error) {
        console.log(error);
      }
    };

    if (debouncedQuery) {
      fetchAllPosts(debouncedQuery);
    } else {
      fetchAllPosts();
    }
  }, [debouncedQuery, dispatch]);

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
    dispatch(removeUser());
    navigate('/');
  };

  const handleBookmarkClick = () => {
    navigate("/bookmarks");
  };

  return (
    <div className='fixed top-0 left-0 w-full p-4 mb-4 z-40 flex justify-between flex-col md:flex-row items-center bg-gradient-to-b from-black to-transparent'>
      <Link to='/'><h1 className='text-3xl font-bold text-white '>VerseVault</h1></Link>

      {user && (
        <>
          <div className='flex justify-around gap-4'>
            <button className='py-2 px-4 text-white bg-transparent rounded-md font-semibold' onClick={handleCreateTaskClick}>Create</button>
            <button className='py-2 px-4 text-white bg-transparent rounded-md font-semibold' onClick={handleMyPostsClick}>My Posts</button>
            <button className='py-2 px-4 text-white bg-transparent rounded-md font-semibold' onClick={handleBookmarkClick}>Bookmark</button>
            <button className='py-2 px-4 text-white bg-transparent rounded-md font-semibold' onClick={handleLogOut}>Log Out</button>
          </div>

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
        </>
      )}
    </div>
  );
};

export default Header;
