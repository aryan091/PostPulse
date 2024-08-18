import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    token: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
    },
    removeUser: (state , action) => {
      state.userInfo = null;
      state.token = null
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
