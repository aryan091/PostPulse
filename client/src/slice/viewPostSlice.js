import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice(
    {
        name: "viewPost",
        initialState: {
            post: null,
        },
        reducers: {
            setPost: (state, action) => {
                state.post = action.payload;
            },
            updatePost : (state, action) => {
                state.post = action.payload;
            }
        },
    }
);

export const { setPost , updatePost } = postSlice.actions;
export default postSlice.reducer;