import React, { useContext } from "react";
import Header from "./Header";
import { BG_URL, AVATAR_URL , BG_CARD_URL } from "../utils/constants";
import { formatDate } from "../utils/helper";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import ShimmerView from "./ShimmerView";
import useFetchPost from "../hooks/useFetchPost";
import useFetchUser from "../hooks/useFetchUser";
import useFetchComments from "../hooks/useFetchComments";
import useCommentActions from "../hooks/useCommentActions";
import ShimmerComment from "./ShimmerComment";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

const PostView = () => {
  const { postId } = useParams();
  
  const posts = useSelector((state) => state?.post?.posts);
  const { post, loading: postLoading, error } = useFetchPost(postId, posts);

  const { user, loading: userLoading } = useFetchUser(post?.addedBy);
  const { loading: commentsLoading } = useFetchComments(postId);
  const postLoadingState = postLoading || userLoading || commentsLoading;

  const { email , isUserLoggedIn } = useContext(UserContext);

  const commentsFromStore = useSelector((state) => state?.viewPost?.comments);
  const {
    newComment,
    setNewComment,
    editCommentId,
    handleCommentSubmit,
    handleEditComment,
    handleDeleteComment,
    loading,
  } = useCommentActions(postId);

  

  if (error) {
    return <div>Error loading post.</div>;
  }

  if (!post) {
    return <div>Redirecting to posts...</div>;
  }

  const { createdAt, heading, description, imageAvatar } = post;
  const date = formatDate(createdAt);

  return (
    <>
      <div className="relative h-full overflow-hidden pb-28">
        <Header />

        <div className="absolute inset-0 z-0">
          <img
            src={BG_URL}
            alt="Bg-Image"
            className="object-cover w-screen h-full"
            loading="lazy"
          />
        </div>

        { postLoadingState ? <ShimmerView /> :(<div className="relative z-10 w-screen h-full text-white bg-black rounded-lg shadow-2xl bg-opacity-70 md:mx-auto md:h-3/4 top-20 md:w-4/5">
          <div className="flex flex-col w-full h-1/4 md:h-full">
            <div className="w-full h-96">
              <img
                src={imageAvatar ? imageAvatar : BG_CARD_URL}
                alt="Post Image"
                className="object-fill w-full h-full rounded-lg"
              />
            </div>

            <div className="w-full h-full p-4 md:p-8">

            <div className={`text-white flex justify-between ${!isUserLoggedIn ? 'flex-row-reverse' : ''} mt-2 gap-4 md:gap-0`}>

              { isUserLoggedIn &&(<div className="flex flex-row items-center gap-2">
                <div className="w-10 h-10 rounded-full">
                  <img
                    src={user?.avatar ? user?.avatar : AVATAR_URL}
                    alt="Profile Image"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div>
                  <div className="font-bold text-white">{user?.name}</div>
                  <div className="font-semibold text-white">
                    {user?.email}
                  </div>
                </div>
              </div>
)}

<div>
<p className="mt-2 font-semibold text-white">
                  Published on {date}
                </p>
              </div>
            </div>

              <h1 className="text-[2rem] font-bold text-white mt-4 md:mt-8">
                {heading}
              </h1>
              <p className="mt-2 text-justify text-white md:mt-4">
                {description}
              </p>
            </div>

          </div>




          <div className="p-4 text-white bg-gray-800 bg-opacity-70">
            <h2 className="mb-4 text-xl font-bold">Comments</h2>
            <div className="mb-4">
              {loading ? (
                <ShimmerComment />
              ) : commentsFromStore?.length === 0 ? (
                <p>No comments yet. Be the first to comment!</p>
              ) : (
                commentsFromStore?.map((comment) => (
                  <div
                    key={comment?._id}
                    className="p-2 mb-4 border-b border-gray-600"
                  >
                    <div className="z-20 flex justify-end gap-2">
      {isUserLoggedIn && (
        <>
          <button
            className="z-20"
            onClick={(e) => handleDeleteComment(comment._id, e)}
          >
            <RiDeleteBin6Fill size={24} color="red" />
          </button>
          
          {email === comment?.commentedBy?.email && (
            <button
              className="z-20"
              onClick={(e) => handleEditComment(comment, e)}
            >
              <FaEdit size={24} color="white" />
            </button>
          )}
        </>
      )}
    </div>

                    <div>
                      <div className="flex flex-row items-center gap-2">
                        <div className="w-10 h-10 rounded-full">
                          <img
                            src={comment?.commentedBy?.avatar ? comment?.commentedBy?.avatar : AVATAR_URL}
                            alt=""
                            className="w-full h-full rounded-full"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white">
                            {comment?.commentedBy?.name}
                          </div>
                          <div className="text-sm font-semibold text-white">
                            {comment?.commentedBy?.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4">{comment?.text}</p>
                    <p className="text-sm font-bold text-gray-400 text-end">
                      Published on {formatDate(comment?.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={(e) => handleCommentSubmit(e)}>
              <textarea
                className="w-full p-2 mb-2 text-white bg-gray-700 rounded"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="w-full p-2 mt-2 text-white bg-transparent border border-gray-600 rounded-md"
              >
                {editCommentId ? "Update Comment" : "Add Comment"}
              </button>
            </form>
          </div>
        </div>
)}
















        
      </div>
      <Footer />
    </>
  );
};

export default PostView;
