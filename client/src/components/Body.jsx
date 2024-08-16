import React from 'react'
import Login from './Login'
import PostCard from './PostCard'
import PostList from './PostList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Body = () => {

    const appRouter = createBrowserRouter([

        {
            path: "/",
            element: <Login/>
        },

        {
            path: "/posts",
            element: <PostList/>
        }

        ,

        {
            path: "/post/:postId",
            element: <PostCard/>
        }
    ])

  return (
    <div>

        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body