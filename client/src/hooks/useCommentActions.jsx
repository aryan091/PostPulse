import { useState, useContext } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addComment, updateComment, deleteComment, setComment } from "../slice/viewPostSlice";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext"; // Import UserContext
import { useNavigate } from "react-router-dom"; // Import useNavigate

const useCommentActions = (postId) => {
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserLoggedIn } = useContext(UserContext); // Get login status from context

  const handleAction = (event, action) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isUserLoggedIn) {
      toast.error("Please login to perform this action");
      navigate("/login");
      return true; // Indicate that the user is not logged in
    }

    return false; // Indicate that the user is logged in
  };

  const fetchPostComments = async () => {
    
    setLoading(true); // Start loading

    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/comment/post/${postId}`;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(reqUrl);
      
      dispatch(setComment(response.data.data.comments));
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCommentSubmit = async (e) => {
    if (handleAction(e)) return; // Check if the user is logged in

    if (newComment.trim()) {
      setLoading(true); // Start loading
  
      try {
        if (editCommentId) {
          // Update comment
          const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/comment/update/${editCommentId}`,
            { text: newComment }
          );
          
          // Dispatch the updated comment to the Redux store
          dispatch(updateComment(response.data.data.comment));
  
          // Optionally, refetch the comments if needed
           await fetchPostComments();
  
          toast.success("Comment updated successfully");
          setEditCommentId(null); // Clear the edit comment ID after successful update
        } else {
          // Add new comment
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/comment/create`,
            { postId, text: newComment }
          );
          
          // Dispatch the new comment to the Redux store
          dispatch(addComment(response.data.data.comment));
          await fetchPostComments();

          toast.success("Comment added successfully");
        }
  
        setNewComment(""); // Clear the comment input field
      } catch (error) {
        toast.error("Failed to submit comment");
        console.error("Failed to submit comment:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  const handleEditComment = (comment,event) => {
    if (handleAction(event)) return; // Check if the user is logged in

    setEditCommentId(comment._id);
    setNewComment(comment.text);
  };

  const handleDeleteComment = async (commentId, event) => {
    if (handleAction(event)) return; // Check if the user is logged in

    setLoading(true); // Start loading
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/comment/delete/${commentId}`;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      await axios.delete(reqUrl);
      dispatch(deleteComment(commentId));
      await fetchPostComments();
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error("Failed to delete comment:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return {
    newComment,
    setNewComment,
    editCommentId,
    handleCommentSubmit,
    handleEditComment,
    handleDeleteComment,
    loading, // Return loading state
  };
};

export default useCommentActions;
