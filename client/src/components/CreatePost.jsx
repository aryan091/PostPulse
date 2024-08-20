import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import usePostApi from "../hooks/usePostApi"; // Import the custom hook

const CreatePost = ({ closeModal }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageUrlRef = useRef(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  const { savePost, error, setError } = usePostApi(); // Use the custom hook

  useEffect(() => {
    if (state?.post) {
      titleRef.current.value = state?.post?.heading;
      descriptionRef.current.value = state?.post?.description;
      imageUrlRef.current.value = state?.post?.imageUrl;
    }
  }, [state?.post]);

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
      const post = {
        heading: titleRef.current.value,
        description: descriptionRef.current.value,
        imageUrl: imageUrlRef.current.value,
      };

      await savePost(post, state?.post?._id); // Use savePost from the hook
      closeModal();
      navigate("/posts");
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
                {state?.post ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
