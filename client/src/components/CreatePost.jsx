import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import usePostApi from "../hooks/usePostApi";
import { LOADING_STYLE } from "../utils/constants";
import { PropagateLoader } from "react-spinners";

const CreatePost = ({ closeModal }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const { savePost, error, setError , loading } = usePostApi();

  useEffect(() => {
    if (state?.post) {
      titleRef.current.value = state?.post?.heading;
      descriptionRef.current.value = state?.post?.description;
      if (state?.post?.imageAvatar) {
        setImagePreview(state?.post?.imageAvatar); // Set the image preview from URL
      }
    }

    document.body.style.overflow = "hidden";

    // Re-enable scrolling when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };


  }, [state?.post]);

  const handleImageChange = () => {
    const file = imageRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set preview to new image
      };
      reader.readAsDataURL(file);
    }
    // If no file selected, retain existing preview (do nothing here)
  };

  const validateFields = () => {
    return (
      titleRef.current.value.trim() &&
      descriptionRef.current.value.trim() &&
      (imagePreview || imageRef.current.files[0])
    );
  };

  const handleSavePost = async (event) => {
    event.preventDefault();

    if (!validateFields()) {
      setError("All fields are required");
      return;
    }

    setError("");
    const formData = new FormData();
    formData.append("heading", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);

    if (imageRef.current.files[0]) {
      formData.append("imageAvatar", imageRef.current.files[0]);
    } else if (state?.post?.imageAvatar) {
      // Keep the existing image URL on update if no new image is selected
      formData.append("existingImageAvatar", state?.post?.imageAvatar);
    }

    await savePost(formData, state?.post?._id); // Use savePost from the hook
    closeModal();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 task-modal">
      <div className="task-modal-content bg-black bg-opacity-70 rounded-lg shadow-lg w-[350px] h-[596px] p-6 flex flex-col justify-between relative sm:w-[644px] overflow-hidden">
        <form className="flex flex-col flex-grow" onSubmit={handleSavePost}>
          <div className="flex-grow">
            <div className="mb-4 task-title">
              <label
                className="block mb-2 text-sm font-bold text-white"
                htmlFor="title"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter Post Title"
                ref={titleRef}
                className="w-full px-3 py-2 font-semibold leading-tight text-white bg-black border rounded shadow appearance-none task-title-input bg-opacity-70 focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4 task-description">
              <label
                className="block mb-2 text-sm font-bold text-white"
                htmlFor="description"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <input
                id="description"
                type="text"
                placeholder="Enter Post Description"
                ref={descriptionRef}
                className="w-full px-3 py-2 font-semibold leading-tight text-white bg-black border rounded shadow appearance-none task-description-input bg-opacity-70 focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4 task-image">
              <label
                className="block mb-2 text-sm font-bold text-white"
                htmlFor="imageUrl"
              >
                Image <span className="text-red-500">*</span>
              </label>
              <input
                id="imageUrl"
                type="file"
                ref={imageRef}
                onChange={handleImageChange}
                className="w-full px-3 py-2 font-semibold leading-tight text-white bg-black border rounded shadow appearance-none task-image-input bg-opacity-70 focus:outline-none focus:shadow-outline"
              />
              {imagePreview && (
                <div className="mt-2 image-preview-container">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                  />
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-4 text-sm font-bold text-center text-red-500">
              {error}
            </div>
          )}

          {loading && (
            <PropagateLoader color="#ffffff" cssOverride={LOADING_STYLE} />
          )}

          <div className="mt-4 task-modal-actions">
            <div className="task-modal-buttons flex gap-4 sm:gap-[17rem]">
              <button
                type="button"
                className="task-cancel border border-solid border-[#CF3636] w-40 h-11 text-[#CF3636] py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline font-bold shadow-lg"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-40 px-4 py-2 font-bold text-white bg-transparent border border-white border-solid shadow-lg task-save h-11 rounded-xl focus:outline-none focus:shadow-outline"
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
