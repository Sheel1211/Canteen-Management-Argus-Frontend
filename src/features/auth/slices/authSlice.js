import { createSlice } from '@reduxjs/toolkit';const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading:true
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false; 
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false; 
    },
    setFetchedUserData: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false; 
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload; 
    },
  },
});

export const { setLogin ,logout,setFetchedUserData,setLoading} = authSlice.actions;

export default authSlice.reducer;