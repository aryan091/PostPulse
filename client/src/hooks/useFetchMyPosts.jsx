import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setMyPosts } from '../slice/postSlice';
import { useEffect } from 'react';

const useFetchMyPosts = (searchQuery) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/post/my-posts${searchQuery ? `?title=${encodeURIComponent(searchQuery)}` : ''}`;
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = token;
        const response = await axios.get(reqUrl);
        dispatch(setMyPosts(response.data.data.posts));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyPosts();
  }, [dispatch]);
};

export default useFetchMyPosts;
