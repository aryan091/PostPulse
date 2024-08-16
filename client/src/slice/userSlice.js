import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name: "user",
        initialState: {
            token: null, // or '' depending on how you handle it
            userInfo: null, // Add user details if needed
          },
          reducers: {
            addUser: (state, action) => {
              state.token = action.payload.token;
              state.userInfo = action.payload.userInfo;
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