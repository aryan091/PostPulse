import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setPosts } from '../slice/postSlice';
import { useEffect } from 'react';

const useFetchPosts = (searchQuery) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
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

    fetchPosts();
  }, [dispatch, searchQuery]);
};

export default useFetchPosts;
