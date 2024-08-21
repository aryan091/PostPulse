import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setComment } from "../slice/viewPostSlice";

const useFetchComments = (postId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/comment/post/${postId}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);

        dispatch(setComment(response.data.data.comments));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch comments");
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, dispatch]);

  return { loading, error };
};

export default useFetchComments;
