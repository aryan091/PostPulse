import React, { useContext } from "react";
import Header from "./Header";
import { BG_URL, AVATAR_URL } from "../utils/constants";
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

  const { createdAt, heading, description, imageUrl } = post;
  const date = formatDate(createdAt);

  return (
    <>
      <div className="relative h-full overflow-hidden pb-28">
        <Header />

        <div className="absolute inset-0 z-0">
          <img
            src={BG_URL}
            alt="Bg-Image"
            className="h-full w-screen object-cover"
            loading="lazy"
          />
        </div>

        { postLoadingState ? <ShimmerView /> :(<div className="relative z-10 bg-black bg-opacity-70 md:mx-auto h-full md:h-3/4 top-20 text-white w-screen md:w-4/5 shadow-2xl rounded-lg">
          <div className="w-full h-1/4 md:h-full flex flex-col">
            <div className="w-full h-96">
              <img
                src={imageUrl}
                alt="Post Image"
                className="w-full h-full object-fill rounded-lg"
              />
            </div>

            <div className="h-full w-full p-4 md:p-8">

            <div className={`text-white flex justify-between ${!isUserLoggedIn ? 'flex-row-reverse' : ''} mt-2 gap-4 md:gap-0`}>

              { isUserLoggedIn &&(<div className="flex flex-row gap-2 items-center">
                <div className="rounded-full w-10 h-10">
                  <img
                    src={AVATAR_URL}
                    alt=""
                    className="rounded-full w-full h-full"
                  />
                </div>
                <div>
                  <div className="text-white font-bold">{user?.name}</div>
                  <div className="text-white font-semibold">
                    {user?.email}
                  </div>
                </div>
              </div>
)}

<div>
<p className="text-white  font-semibold mt-2">
                  Published on {date}
                </p>
              </div>
            </div>

              <h1 className="text-[2rem] font-bold text-white mt-4 md:mt-8">
                {heading}
              </h1>
              <p className="text-white mt-2 md:mt-4 text-justify">
                {description}
              </p>
            </div>

          </div>




          <div className="p-4 bg-gray-800 text-white bg-opacity-70">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            <div className="mb-4">
              {loading ? (
                <ShimmerComment />
              ) : commentsFromStore?.length === 0 ? (
                <p>No comments yet. Be the first to comment!</p>
              ) : (
                commentsFromStore?.map((comment) => (
                  <div
                    key={comment?._id}
                    className="mb-4 p-2 border-b border-gray-600"
                  >
                    <div className="flex justify-end gap-2 z-20">
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
                      <div className="flex flex-row gap-2 items-center">
                        <div className="rounded-full w-10 h-10">
                          <img
                            src={AVATAR_URL}
                            alt=""
                            className="rounded-full w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="text-white font-bold">
                            {comment?.commentedBy?.name}
                          </div>
                          <div className="text-white text-sm font-semibold">
                            {comment?.commentedBy?.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4">{comment?.text}</p>
                    <p className="text-sm text-end font-bold text-gray-400">
                      Published on {formatDate(comment?.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={(e) => handleCommentSubmit(e)}>
              <textarea
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="mt-2 p-2 bg-transparent border border-gray-600 text-white rounded-md w-full"
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
