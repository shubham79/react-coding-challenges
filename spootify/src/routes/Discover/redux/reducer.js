import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newReleaseLoading: true,
  newReleases: [],
  newReleaseErrors: null,
  playlists: [],
  categories: [],
};

export const discoverSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {
    getNewReleases: (state) => {
      state.newReleaseLoading = true;
    },
    getNewReleasesSuccess: (state, action) => {
      state.newReleaseLoading = false;
      state.newReleases = action.payload;
    },
    getNewReleasesError: (state, action) => {
      state.newReleaseLoading = false;
      state.newReleases = [];
      state.newReleaseErrors = action.payload;
    },
  },
});

// Action creators
export const {
  // get lastest releases actions
  getNewReleases,
  getNewReleasesError,
  getNewReleasesSuccess,
} = discoverSlice.actions;

export default discoverSlice.reducer;
