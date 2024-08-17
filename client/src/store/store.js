import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import postSlice from "../slice/postSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        post: postSlice
    },
});

export default store