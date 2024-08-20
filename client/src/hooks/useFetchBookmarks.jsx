import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setBookmarks } from '../slice/postSlice';
import { useEffect } from 'react';

const useFetchBookmarks = (searchQuery) => {
  const dispatch = useDispatch();

  useEffect(() => {

    console.log("Fetching bookmarks...");
    const fetchBookmarks = async () => {
      try {
        const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/bookmarks${searchQuery ? `?title=${encodeURIComponent(searchQuery)}` : ''}`;
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = token;
        const response = await axios.post(reqUrl);
        dispatch(setBookmarks(response.data.data.bookmarks));
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookmarks();
  }, []);
};

export default useFetchBookmarks;
