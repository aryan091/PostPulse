import React, { useEffect, useState } from 'react';
import Header from './Header';
import { BG_URL } from '../utils/constants';
import PostCard from './PostCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setPosts, setMyPosts, setBookmarks } from '../slice/postSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const myPosts = useSelector((state) => state.post.myPosts);
  const bookmarks = useSelector((state) => state.post.bookmarks); // Select bookmarks from state
  const location = useLocation();
  const navigate = useNavigate();
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false); // State for showing bookmarks

  useEffect(() => {
    if (location.pathname === "/my-posts") {

      fetchMyPosts();
      setShowBookmarks(false); // Hide bookmarks when not on /bookmarks route
    } else if (location.pathname === "/bookmarks") {
      console.log("Fetching bookmarks...");
      fetchMyBookmarks();
      setShowBookmarks(true); // Show bookmarks when on /bookmarks route
    } else {
      fetchAllPosts();
      setShowBookmarks(false); // Hide bookmarks when not on /bookmarks route
    }
  }, [dispatch, location.pathname]);

  const fetchMyBookmarks = async () => {
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/bookmarks`;
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      const response = await axios.post(reqUrl);
      dispatch(setBookmarks(response.data.data.bookmarks));
      setShowMyPosts(false); // Ensure "My Posts" state is not active
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/post/all-posts`;
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      const response = await axios.get(reqUrl);
      dispatch(setPosts(response.data.data.posts));
      setShowMyPosts(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyPosts = async () => {
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/post/my-posts`;
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      const response = await axios.get(reqUrl);
      dispatch(setMyPosts(response.data.data.posts));
      setShowMyPosts(true);
    } catch (error) {
      console.log(error);
    }
  };
  

  const closeModal = () => {
    navigate("/");
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG_URL}
          alt="Bg-Image"
          className="h-screen w-screen object-cover"
        />
      </div>

      {/* Post Cards */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 py-20 overflow-y-scroll h-full mt-16">
        {(showMyPosts ? myPosts : showBookmarks ? bookmarks : posts)?.map((post) => (
          <Link to={`/post/${post?._id}`} key={post?._id}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>

      {location.pathname === "/create" && (
        <CreatePost closeModal={closeModal} />
      )}
    </div>
  );
};

export default PostList;
