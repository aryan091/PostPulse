import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addPost, updatePost } from '../slice/postSlice';

const usePostApi = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const savePost = async (post, postId = null) => {
    const isUpdate = !!postId;
    const url = isUpdate
      ? `${import.meta.env.VITE_BACKEND_URL}/post/update/${postId}`
      : `${import.meta.env.VITE_BACKEND_URL}/post/create`;

    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;

    try {
      const response = isUpdate
        ? await axios.put(url, post)
        : await axios.post(url, post);

      const savedPost = response.data.post;
      if (isUpdate) {
        dispatch(updatePost(savedPost));
        toast.success("Post updated successfully");
      } else {
        dispatch(addPost(savedPost));
        toast.success("Post created successfully");
      }
    } catch (error) {
      console.error(error);
      setError(isUpdate ? "Failed to update post" : "Failed to create post");
      toast.error(isUpdate ? "Failed to update post" : "Failed to create post");
    }
  };

  return {
    savePost,
    error,
    setError,
  };
};

export default usePostApi;
