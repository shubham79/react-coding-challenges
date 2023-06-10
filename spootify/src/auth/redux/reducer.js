import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authDetails: null,
  loading: false,
  authError: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuthToken: (state) => {
      state.loading = true;
    },
    getAuthTokenSuccess: (state, action) => {
      state.loading = false;
      state.authDetails = action.payload;
    },
    getAuthTokenError: (state, action) => {
      state.loading = false;
      state.authDetails = null;
      state.authError = action.payload;
    },
  },
});

// Action creators
export const {
  // get auth token actions
  getAuthToken,
  getAuthTokenError,
  getAuthTokenSuccess,
} = authSlice.actions;

export default authSlice.reducer;
