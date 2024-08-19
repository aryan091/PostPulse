import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice(
    {
        name: "post",
        initialState: {
            posts: [],
            myPosts:[],
            bookmarks:[]
        },
        reducers: {
            setPosts: (state, action) => {
                state.posts = action.payload;
            },

            addPost: (state, action) => {
                state.posts.push(action.payload);
            },
            deletePost : (state, action) => {
                state.posts = state.posts.filter((post) => post._id !== action.payload);
            
            },
            updatePost: (state, action) => {
                state.posts = state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                );
            },
            
            setBookmarks : (state, action) => {
                state.bookmarks = action.payload;
            },
            setMyPosts : (state, action) => {
                state.myPosts = action.payload;
            },
            updateTotalLikes : (state, action) => {
                state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
            }
        },
    }
);

export const { setPosts , addPost, setMyPosts , deletePost , updatePost , setBookmarks , updateTotalLikes} = postSlice.actions;
export default postSlice.reducer;