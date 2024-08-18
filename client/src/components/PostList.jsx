import React, { useEffect, useState } from 'react';
import Header from './Header';
import { BG_URL } from '../utils/constants';
import PostCard from './PostCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setPosts, setMyPosts } from '../slice/postSlice';
import { Link, useLocation } from 'react-router-dom';
import CreatePost from './CreatePost';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const myPosts = useSelector((state) => state.post.myPosts);
  const location = useLocation();
  const [showMyPosts, setShowMyPosts] = useState(false);

  useEffect(() => {
    if (location.pathname === "/my-posts") {
      fetchMyPosts();
    } else {
      fetchAllPosts();
    }
  }, [dispatch, location.pathname]);

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
        {(showMyPosts ? myPosts : posts)?.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id}>
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
