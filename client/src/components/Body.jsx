import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import PostCard from './PostCard';
import PostList from './PostList';
import ProtectedRoute from './ProtectedRoute';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/posts",
    element: (
      <ProtectedRoute>
        <PostList />
      </ProtectedRoute>
    )
  },
  {
    path: "/post/:postId",
    element: (
      <ProtectedRoute>
        <PostCard />
      </ProtectedRoute>
    )
  }
]);

const Body = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default Body;
