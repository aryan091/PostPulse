import React, { useRef, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { addPost } from "../slice/postSlice";
import { useDispatch } from "react-redux";

const CreatePost = ({ closeModal }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageUrlRef = useRef(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateFields = () => {
    if (
      !titleRef.current.value.trim() ||
      !descriptionRef.current.value.trim() ||
      !imageUrlRef.current.value.trim()
    ) {
      return false;
    }
    return true;
  };

  const handleSavePost = async (event) => {
    event.preventDefault();

    if (!validateFields()) {
      setError("All fields are required");
    } else {
      setError("");
      const newTask = {
        heading: titleRef.current.value,
        description: descriptionRef.current.value,
        imageUrl: imageUrlRef.current.value,
      };

      try {
        const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/post/create`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(reqUrl, newTask);
        console.log(response.data.post);
        dispatch(addPost(response.data.post));
        navigate("/posts");
        toast.success("Post created successfully");

      } catch (error) {
        console.log(error);
        toast.error("Failed to create post");
      }

      closeModal();
    }
  };

  return (
    <div className="task-modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="task-modal-content bg-black bg-opacity-70 rounded-lg shadow-lg w-[350px] h-[596px] p-6 flex flex-col justify-between relative sm:w-[644px]">
        <form className="flex flex-col flex-grow" onSubmit={handleSavePost}>
          <div className="flex-grow">
            <div className="task-title mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter Post Title"
                ref={titleRef}
                className="task-title-input shadow appearance-none border rounded w-full py-2 px-3 bg-black bg-opacity-70 text-white font-semibold leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="task-description mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
                Description <span className="text-red-500">*</span>
              </label>
              <input
                id="description"
                type="text"
                placeholder="Enter Post Description"
                ref={descriptionRef}
                className="task-description-input shadow appearance-none border rounded w-full py-2 px-3 bg-black bg-opacity-70 text-white font-semibold leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="task-description mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="imageUrl">
                Image URL <span className="text-red-500">*</span>
              </label>
              <input
                id="imageUrl"
                type="text"
                placeholder="Enter Image URL"
                ref={imageUrlRef}
                className="task-imageUrl-input shadow appearance-none border rounded w-full py-2 px-3 bg-black text-white font-semibold bg-opacity-70 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          {/* Error message display */}
          {error && (
            <div className="text-red-500 text-sm font-bold text-center mb-4">
              {error}
            </div>
          )}

          <div className="task-modal-actions mt-4">
            <div className="task-modal-buttons flex gap-4 sm:gap-[17rem]">
              <button
                type="button"
                className="task-cancel border border-solid border-[#CF3636] w-40 h-11 text-[#CF3636] py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline font-bold shadow-lg"
                onClick={() => navigate("/posts")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="task-save w-40 h-11 bg-transparent border border-solid border-white text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-lg font-bold"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
