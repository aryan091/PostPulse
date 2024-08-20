import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaBookmark, FaEdit } from "react-icons/fa";
import { formatDate } from '../utils/helper';
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updateTotalLikes, updatePost, setBookmarks , setPosts, setMyPosts} from "../slice/postSlice";
import { setPost } from "../slice/viewPostSlice";

import { useNavigate } from "react-router-dom";

const PostCard = ({ post , userId}) => {
    if (!post) return null;

    console.log("id in card : ", userId)
    
    useEffect(() => {
        dispatch(setPost(post));
    }, [post]);

   

    const fetchAllPosts = async () => {
      try {
        const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/post/all-posts`;
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = token;
        const response = await axios.get(reqUrl);
        dispatch(setPosts(response.data.data.posts));
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
      } catch (error) {
        console.log(error);
      }
    };
  
    const fetchMyBookmarks = async () => {
      try {
        const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/bookmarks`;
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = token;
        const response = await axios.post(reqUrl);
        dispatch(setBookmarks(response.data.data.bookmarks));
      } catch (error) {
        console.log(error);
      }
    };

    const { _id, heading, description, imageUrl, createdAt, addedBy, bookmarks, likes } = post;
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const likesValue = post?.totalLikes;

    const date = formatDate(createdAt);
    const { id } = useContext(UserContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allBookmarks = useSelector((state) => state.post.bookmarks);

    useEffect(() => {
    
        if (id !== null && id !== undefined && bookmarks && likes) {
          setIsBookmarked(bookmarks.includes(id));
          setIsLiked(likes.includes(id));
        }
      }, [id, bookmarks, likes]);
    
    
      
    



    const handleDelete = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/post/delete/${_id}`;
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            await axios.delete(reqUrl);
            dispatch(deletePost(_id));
            await fetchMyPosts();
            toast.success("Post deleted successfully");
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigate("/create", {
            state: { post: post, edit: true },
        });
    };

    const handleBookmarkClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/bookmark/${_id}`;
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            await axios.post(reqUrl);
            const updatedBookmarks = isBookmarked
                ? allBookmarks.filter(bookmark => bookmark !== _id)
                : [...allBookmarks, _id];
            setIsBookmarked(!isBookmarked);
            dispatch(setBookmarks(updatedBookmarks));
            await fetchMyBookmarks();
            toast.success(isBookmarked ? "Post removed from bookmarks" : "Post bookmarked successfully");
        } catch (error) {
            toast.error("Failed to bookmark post");
            console.log(error);
        }
    };

    const handleLikeClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            setLoading(true);
            const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/post/like/${_id}`;
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = token;
            const response = await axios.post(reqUrl);
            dispatch(updateTotalLikes({ _id, totalLikes: response.data.data.post.totalLikes }));
            setIsLiked(!isLiked);
            dispatch(updatePost(response.data.data.post));
            await Promise.all([ fetchMyPosts(),fetchMyBookmarks()]);

            (isLiked) ?   toast.success('Story Unliked Successfully!') : toast.success('Story Liked Successfully!')
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Failed to like post");
            console.log(error);
        }
    };


 

    return (
        <div className="relative h-[460px] w-[20rem] md:w-[30rem] rounded-md overflow-hidden group shadow-2xl">
            {/* Background Image */}
            <div
                className="absolute inset-0 transition-transform duration-300 ease-in-out bg-cover bg-center group-hover:scale-110"
                style={{ 
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1
                }}
            />
            {addedBy === id && (
                <>
                    <button className="absolute top-2 left-3 z-20" onClick={handleDelete}>
                        <RiDeleteBin6Fill size={24} color="red" />
                    </button>
                    <button className="absolute top-2 right-2 z-20" onClick={handleEditClick}>
                        <FaEdit size={24} color="white" />
                    </button>
                </>
            )}

            {/* Content */}
            <div className="relative z-10 bottom-2 left-0 right-0 p-4 bg-gradient-to-b from-black rounded-b-md">
                <h1 className="text-[2rem] font-bold text-white mt-60  line-clamp-1 overflow-hidden">{heading}</h1>
                <p className="text-white h-12 mt-2 line-clamp-2 overflow-hidden font-semibold">
                    {description}
                </p>
                <p className='text-white font-semibold mt-8'>Published on {date}</p>

                <div className="text-white flex justify-between mt-2">
                    <div className="flex flex-row gap-2 items-center">
                        <button onClick={(e) => handleLikeClick(e)}>
                            {isLiked ? <FcLike size={24} /> : <FcLikePlaceholder size={24} />}
                        </button>
                        {likesValue > 0 && <div>{likesValue}</div>}
                    </div>
                    <div onClick={(e) => handleBookmarkClick(e)}>
                        <FaBookmark size={24} color={isBookmarked ? "blue" : "white"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
