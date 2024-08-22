// hooks/useFetchPost.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchPost = (postId, posts) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        setLoading(true);
        const url = `${import.meta.env.VITE_BACKEND_URL}/post/view-post/${postId}`;
        const response = await axios.get(url);
        setPost(response.data.data.post);
        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (posts && posts.length > 0) {
      const foundPost = posts.find((post) => post._id === postId);
      if (foundPost) {
        setPost(foundPost);
        setLoading(false);
      } else {
        fetchPostById();
      }
    } else {
      fetchPostById();
    }
  }, [postId, posts]);

  return { post, loading, error };
};

export default useFetchPost;
