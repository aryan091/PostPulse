import React,{useContext} from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../slice/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const user = localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{ setId , setUsername, setIsUserLoggedIn} = useContext(UserContext)


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

      { user && (
        <div className='flex justify-around gap-4'>
          <button className='py-2 px-4 text-white bg-transparent rounded-md font-semibold' onClick={handleCreateTaskClick}>Create</button>
          <button className='py-2 px-4 text-white bg-transparent rounded-md font-semibold' onClick={handleMyPostsClick}>My Posts</button>
          <button className='py-2 px-4 text-white bg-transparent rounded-md font-semibold' onClick={handleBookmarkClick}>Bookmark</button>
          <button className='py-2 px-4 text-white bg-transparent rounded-md font-semibold' onClick={handleLogOut}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default Header;
