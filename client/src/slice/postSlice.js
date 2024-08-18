import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice(
    {
        name: "post",
        initialState: {
            posts: [],
            myPosts:[]
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
            updatePost : (state, action) => {
                state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
                
            },
            setMyPosts : (state, action) => {
                state.myPosts = action.payload;
            }
        },
    }
);

export const { setPosts , addPost, setMyPosts , deletePost , updatePost} = postSlice.actions;
export default postSlice.reducer;