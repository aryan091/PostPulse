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
import Shimmer from './Shimmer';  // Import your Shimmer component

const PostList = () => {
  const posts = useSelector((state) => state.post.posts);
  const myPosts = useSelector((state) => state.post.myPosts);
  const bookmarks = useSelector((state) => state.post.bookmarks);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

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
    // Set loading to false once data is fetched
    if (posts.length || myPosts.length || bookmarks.length) {
      setLoading(false);
    }
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
          />
        </div>

        {/* Post Cards or Shimmer */}
        <div className="relative z-10 flex flex-wrap justify-center gap-4 py-20 px-4 mt-16">
          {loading ? (
            Array(6).fill("").map((_, index) => <Shimmer key={index} />) // Show shimmer placeholders
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
