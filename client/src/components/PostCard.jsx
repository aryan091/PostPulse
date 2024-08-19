import { FcLike } from "react-icons/fc";
import { FaBookmark, FaEdit } from "react-icons/fa";
import { formatDate } from '../utils/helper';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { deletePost } from "../slice/postSlice";
import { useNavigate } from "react-router-dom";
import { FcLikePlaceholder } from "react-icons/fc";
import { useState , useEffect} from "react";
const PostCard = ({post}) => {

if(!post) return null

    const {_id, heading, description, imageUrl  , createdAt , addedBy , bookmarks} = post

    const [isBookmarked, setIsBookmarked] = useState(false);


    
    const date = formatDate(createdAt)

    const {id} = useContext(UserContext)



    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      setIsBookmarked(bookmarks.includes(id));
  }, [bookmarks, id]);


    const handleDelete = (event) => {

      event.preventDefault(); 
      event.stopPropagation(); 
      try {
        const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/post/delete/${_id}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const post = axios.delete(reqUrl);
        dispatch(deletePost(_id));
        toast.success("Post deleted successfully");
      } catch (error) {
        console.log(error);
        
      }

    }

    const handleEditClick = (event) => {
      event.preventDefault(); // Prevent default behavior
      event.stopPropagation(); // Stop event from bubbling up
      
      // Handle edit click
      navigate("/create", {
        state: { post: post, edit: true },
      });
    };
  
    const handleBookmarkClick = (event) => {
      event.preventDefault(); // Prevent default behavior
      event.stopPropagation(); // Stop event from bubbling up
      
      try{

        const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/bookmark/${_id}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = axios.post(reqUrl);
        setIsBookmarked(!isBookmarked);
        toast.success("Post bookmarked successfully");
      }
      catch(error)
      {
        toast.error("Failed to bookmark post");
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
        <button className="absolute top-2 left-3 z-20" onClick={(e)=>{handleDelete(e)}}>
<RiDeleteBin6Fill size={24} color="red" />
</button>
        <button className="absolute top-2 right-2 z-20" onClick={(e)=>{handleEditClick(e)}}>
          <FaEdit size={24} color="white"  />
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
            <button><FcLike size={24}  /></button>
            <div>0</div>
          </div >
          <div onClick={(e)=>{handleBookmarkClick(e)}}>
          <FaBookmark size={24} color={isBookmarked ? "blue" : "white"} />

          </div>
          </div>

      </div>


    </div>
  );
};

export default PostCard;
