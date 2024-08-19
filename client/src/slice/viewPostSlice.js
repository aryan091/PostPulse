import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice(
    {
        name: "viewPost",
        initialState: {
            post: null,
        totalLikes : null
        },
        reducers: {
            setPost: (state, action) => {
                state.post = action.payload;
            },
            setTotalLikes : (state, action) => {
                state.totalLikes = action.payload
            },
            updatePost : (state, action) => {
                state.post = action.payload;
            }
        },
    }
);

export const { setPost , updatePost , setTotalLikes} = postSlice.actions;
export default postSlice.reducer;