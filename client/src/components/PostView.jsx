import React from "react";
import Header from "./Header";
import { BG_URL, AVATAR_URL } from "../utils/constants";
import { formatDate } from "../utils/helper";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import ShimmerView from "./ShimmerView"; // Import the ShimmerView component
import useFetchUser from "../hooks/useFetchUser";

const PostView = () => {
  const { postId } = useParams();
  const posts = useSelector((state) => state?.post?.posts);
  const post = posts.find((post) => post._id === postId);

  // Use custom hook to fetch user details
  const { user, loading: userLoading } = useFetchUser(post?.addedBy);
  const postLoading = !post || userLoading;

  // if (postLoading) {
  //   return <ShimmerView />;
  // }

  if (!post) {
    return null; // Or you can return a message or redirect the user
  }

  const { createdAt, heading, description, imageUrl } = post;
  const date = formatDate(createdAt);

  return (
    <>
      <div className="relative h-full overflow-hidden pb-28">
        <Header />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={BG_URL}
            alt="Bg-Image"
            className="h-full w-screen object-cover"
          />
        </div>

        {
          postLoading ? (
            <ShimmerView />
          )
          :
          (
<div className="relative z-10 bg-black bg-opacity-70 md:mx-auto h-full md:h-3/4 top-20 text-white w-screen md:w-4/5 shadow-2xl rounded-lg">
          <div className="w-full h-1/4 md:h-full flex flex-col">
            <div className="w-full h-96">
              <img
                src={imageUrl}
                alt=""
                className="w-full h-full object-fill rounded-lg"
              />
            </div>

            <div className="h-full w-full p-4 md:p-8">
              <div className="text-white flex justify-between mt-2 gap-4 md:gap-0">
                <div className="flex flex-row gap-2 items-center">
                  <div className="rounded-full w-10 h-10">
                    <img
                      src={AVATAR_URL}
                      alt=""
                      className="rounded-full w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="text-white font-bold">{user.name}</div>
                    <div className="text-white font-semibold">{user.email}</div>
                  </div>
                </div>

                <div>
                  <p className="text-white font-semibold mt-2">
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
        </div>
          )
        }

        

      </div>
      <Footer />
    </>
  );
};

export default PostView;
