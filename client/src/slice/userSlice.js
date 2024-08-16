import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name: "user",
        initialState: {},
        reducers: {
            addUser: (state, action) => {
                state = action.payload;
                return state;
            },
            removeUser: (state, action) => {
                state = null;
                return state;
            }
        }
    }
)

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer