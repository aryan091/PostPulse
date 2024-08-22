import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import PostList from './PostList';
import ProtectedRoute from './ProtectedRoute';
import PostView from './PostView';
import NotFound from './NotFound';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <PostList /> // Allow viewing posts without login
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/post/:postId",
    element: <PostView /> // Allow viewing a single post without login
  },
  {
    path: "/create",
    element: (
      <ProtectedRoute>
        <PostList />
      </ProtectedRoute>
    )
  },
  {
    path: "/my-posts",
    element: (
      <ProtectedRoute>
        <PostList />
      </ProtectedRoute>
    )
  },
  {
    path: "/bookmarks",
    element: (
      <ProtectedRoute>
        <PostList />
      </ProtectedRoute>
    )
  },
  {
    path: "*",
    element : <NotFound />
  }
]);

const Body = () => {
  return (
    <div className="flex-grow">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
