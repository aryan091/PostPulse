import React, { useEffect } from 'react';
import Header from './Header';
import { BG_URL } from '../utils/constants';
import PostCard from './PostCard';
import { useDispatch , useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setPosts } from '../slice/postSlice';

const PostList = () => {

    const dispatch = useDispatch();
    const fetchAllPosts = async () => {
        try {
            const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/post/all-posts`;
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = token;
            const response = await axios.get(reqUrl);
        
            console.log(response.data.data);
            dispatch(setPosts(response.data.data.posts));
        
        
        } catch (error) {
            console.log(error);
            
        }
        }
        
        useEffect(() => {
          fetchAllPosts();
        }, []);

        const posts = useSelector((state) => state?.post?.posts);
        console.log(posts);


  return (
    <div className="relative h-screen overflow-hidden">
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={BG_URL} alt="Bg-Image" className="h-screen w-screen object-cover" />
      </div>

      {/* Post Cards */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 py-20 overflow-y-scroll h-full mt-16">
       {
        posts && posts.map((post) => (
          <PostCard post={post} />
        ))
       }
      </div>
    </div>
  );
};

export default PostList;
