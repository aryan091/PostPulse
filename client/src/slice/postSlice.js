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
            setMyPosts : (state, action) => {
                state.myPosts = action.payload;
            }
        },
    }
);

export const { setPosts , addPost, setMyPosts} = postSlice.actions;
export default postSlice.reducer;