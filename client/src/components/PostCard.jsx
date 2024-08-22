import React, { useContext, useState, useEffect } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaBookmark, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from '../utils/helper';
import { UserContext } from "../context/UserContext";
import { deletePost, updateTotalLikes, updatePost, setBookmarks, setMyPosts } from "../slice/postSlice";
import ShimmerPostCard from "./ShimmerPostCard";
import { setPost } from "../slice/viewPostSlice";

const PostCard = ({ post, userId }) => {
  if (!post) return null;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const likesValue = post?.totalLikes;
  const { id, isUserLoggedIn } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allBookmarks = useSelector((state) => state.post.bookmarks);

  useEffect(() => {
    dispatch(setPost(post));
  }, [post]);

  useEffect(() => {
    if (id !== null && id !== undefined && post.bookmarks && post.likes) {
      setIsBookmarked(post.bookmarks.includes(id));
      setIsLiked(post.likes.includes(id));
    }
  }, [id, post.bookmarks, post.likes]);

  const date = formatDate(post.createdAt);

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

  const handleDelete = async (event) => {
    if (handleAction(event)) return;
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/post/delete/${post._id}`;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      await axios.delete(reqUrl);
      dispatch(deletePost(post._id));
      await fetchMyPosts();
      toast.success("Post deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (event) => {
    if (handleAction(event)) return;
    navigate("/create", {
      state: { post: post, edit: true },
    });
  };

  const handleBookmarkClick = async (event) => {
    if (handleAction(event)) return;
    try {
      setLoading(true);
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/bookmark/${post._id}`;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      await axios.post(reqUrl);
      const updatedBookmarks = isBookmarked
        ? allBookmarks.filter(bookmark => bookmark !== post._id)
        : [...allBookmarks, post._id];
      setIsBookmarked(!isBookmarked);
      dispatch(setBookmarks(updatedBookmarks));
      toast.success(isBookmarked ? "Post removed from bookmarks" : "Post bookmarked successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to bookmark post");
      console.log(error);
    }
  };

  const handleLikeClick = async (event) => {
    if (handleAction(event)) return;
    try {
      setLoading(true);
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/post/like/${post._id}`;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(reqUrl);
      dispatch(updateTotalLikes({ _id: post._id, totalLikes: response.data.data.post.totalLikes }));
      setIsLiked(!isLiked);
      dispatch(updatePost(response.data.data.post));
      toast.success(isLiked ? 'Post unliked successfully!' : 'Post liked successfully!');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to like post");
      console.log(error);
    }
  };

  return (
    <div className="relative h-[460px] w-[20rem] md:w-[28rem] rounded-md overflow-hidden group shadow-2xl">
      {loading ? (
        <ShimmerPostCard />
      ) : (
        <>
          <div
            className="absolute inset-0 transition-transform duration-300 ease-in-out bg-cover bg-center group-hover:scale-110"
            style={{ 
              backgroundImage: `url(${post.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: -1
            }}
          />
          {post.addedBy === id && (
            <>
              <button className="absolute top-2 left-3 z-20" onClick={handleDelete}>
                <RiDeleteBin6Fill size={24} color="red" />
              </button>
              <button className="absolute top-2 right-2 z-20" onClick={handleEditClick}>
                <FaEdit size={24} color="white" />
              </button>
            </>
          )}
          <div className="relative z-10 bottom-2 left-0 right-0 p-4 bg-gradient-to-b from-black rounded-b-md">
            <h1 className="text-[2rem] font-bold text-white mt-60 line-clamp-1 overflow-hidden">{post.heading}</h1>
            <p className="text-white h-12 mt-2 line-clamp-2 overflow-hidden font-semibold">
              {post.description}
            </p>
            <p className='text-white font-semibold mt-8'>Published on {date}</p>
            <div className="text-white flex justify-between mt-2">
              <div className="flex flex-row gap-2 items-center">
                <button onClick={(e) => handleLikeClick(e)}>
                  {isLiked ? <FcLike size={24} /> : <FcLikePlaceholder size={24} />}
                </button>
                {likesValue > 0 && <div className="text-white font-bold">{likesValue}</div>}
              </div>
              <div onClick={(e) => handleBookmarkClick(e)}>
                <FaBookmark size={24} color={isBookmarked ? "yellow" : "white"} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
