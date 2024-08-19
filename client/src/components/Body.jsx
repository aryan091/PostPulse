import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import PostList from './PostList';
import ProtectedRoute from './ProtectedRoute';
import PostView from './PostView';

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
        <PostView />
      </ProtectedRoute>
    )
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
  }
]);

const Body = () => {
  return (
       <div className="flex-grow">
      <RouterProvider router={appRouter} />
    </div>
  
  );

}

export default Body;
