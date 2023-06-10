import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newReleaseLoading: false,
  newReleases: [],
  newReleaseErrors: null,
  playlistLoading: false,
  playlists: [],
  playlistError: null,
  categoriesLoading: false,
  categories: [],
  categoriesError: null,
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
      state.newReleaseErrors = action.payload;
    },
    getNewReleasesError: (state, action) => {
      state.newReleaseLoading = false;
      state.newReleases = [];
      state.newReleaseErrors = action.payload;
    },
    getPlaylists: (state) => {
      state.playlistLoading = true;
    },
    getPlaylistsSuccess: (state, action) => {
      state.playlistLoading = false;
      state.playlists = action.payload;
      state.playlistError = null;
    },
    getPlaylistsError: (state, action) => {
      state.playlistLoading = false;
      state.playlists = [];
      state.playlistError = action.payload;
    },
    getCategories: (state) => {
      state.categoriesLoading = true;
    },
    getCategoriesSuccess: (state, action) => {
      state.categoriesLoading = false;
      state.categories = action.payload;
    },
    getCategoriesError: (state, action) => {
      state.categoriesLoading = false;
      state.categories = [];
      state.categoriesError = action.payload;
    },
  },
});

// Action creators
export const {
  // get lastest releases actions
  getNewReleases,
  getNewReleasesError,
  getNewReleasesSuccess,

  getPlaylists,
  getPlaylistsError,
  getPlaylistsSuccess,

  getCategories,
  getCategoriesError,
  getCategoriesSuccess,
} = discoverSlice.actions;

export default discoverSlice.reducer;
