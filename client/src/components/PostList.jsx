import React, { useState, useEffect } from 'react';
import Header from './Header';
import { BG_URL } from '../utils/constants';
import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import Footer from './Footer';
import useFetchPosts from '../hooks/useFetchPosts';
import useFetchMyPosts from '../hooks/useFetchMyPosts';
import useFetchBookmarks from '../hooks/useFetchBookmarks';
import { PropagateLoader } from 'react-spinners'; // Import the PropagateLoader
import { LOADING_STYLE } from '../utils/constants'; // Import LOADING_STYLE if you have custom styles

const PostList = () => {
  const posts = useSelector((state) => state.post.posts);
  const myPosts = useSelector((state) => state.post.myPosts);
  const bookmarks = useSelector((state) => state.post.bookmarks);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [loading, setLoading] = useState(true);

  useFetchPosts(searchQuery);
  useFetchMyPosts(searchQuery);
  useFetchBookmarks(searchQuery);

  useEffect(() => {
    if (location.pathname === "/my-posts") {
      setShowMyPosts(true);
      setShowBookmarks(false);
    } else if (location.pathname === "/bookmarks") {
      setShowMyPosts(false);
      setShowBookmarks(true);
    } else {
      setShowMyPosts(false);
      setShowBookmarks(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    setLoading(false);
  }, [posts, myPosts, bookmarks]);

  const closeModal = () => {
    navigate("/");
  };

  // Determine which posts to show
  const postsToShow = showMyPosts ? myPosts : showBookmarks ? bookmarks : posts;

  return (
    <>
      <div className="min-h-screen w-full overflow-x-hidden">
        <Header />

        {/* Background Image */}
        <div className="fixed inset-0 z-0 w-full h-full">
          <img
            src={BG_URL}
            alt="Bg-Image"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Post Cards or Loader */}
        <div className="relative z-10 flex flex-wrap justify-center gap-4 pt-[7rem] pb-[3rem] px-4 mt-[5.5rem]">
          {loading ? (
            <PropagateLoader color="#ffffff" cssOverride={LOADING_STYLE} />
          ) : postsToShow.length > 0 ? (
            postsToShow.map((post) => (
              <Link to={`/post/${post?._id}`} key={post?._id}>
                <PostCard post={post} />
              </Link>
            ))
          ) : (
            <div className="relative -top-32 flex items-center justify-center w-screen h-[20.20rem] bg-gradient-to-b from-black">
              <p className="text-white text-lg md:text-4xl font-bold ">
                {showMyPosts
                  ? "You haven't created any posts yet."
                  : showBookmarks
                  ? "You haven't bookmarked any posts yet."
                  : "No posts to show at the moment."}
              </p>
            </div>
          )}
        </div>

        {location.pathname === "/create" && (
          <CreatePost closeModal={closeModal} />
        )}
        <Footer />
      </div>
    </>
  );
};

export default PostList;
