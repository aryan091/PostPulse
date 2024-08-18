import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import postSlice from "../slice/postSlice";
import viewPostSlice from "../slice/viewPostSlice";

const store = configureStore({
    reducer: {
        post: postSlice,
        user: userSlice,
        viewPost:viewPostSlice
    },
});

export default store