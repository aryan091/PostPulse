import { createSlice } from "@reduxjs/toolkit";


const postSlice = createSlice(
    {
        name: "viewPost",
        initialState: {
            post: null,
        totalLikes : null,
        comments:null
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
            },
            setComment : (state, action) => {
                state.comments = action.payload
            },
            addComment(state, action) {
                state.comments = [...state.comments, action.payload]
            },
            updateComment(state, action) {
                state.comments = state.comments.map((comment) => {
                    if (comment._id === action.payload._id) {
                        return action.payload
                    }
                    return comment
                })
            },
            deleteComment(state, action) {
                state.comments = state.comments.filter((comment) => comment._id !== action.payload)
            }

        },
    }
);

export const { setPost , updatePost , setComment , setTotalLikes , addComment , updateComment , deleteComment} = postSlice.actions;
export default postSlice.reducer;