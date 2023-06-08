import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  getCategories,
  getCategoriesError,
  getCategoriesSuccess,
  getNewReleases,
  getNewReleasesError,
  getNewReleasesSuccess,
  getPlaylists,
  getPlaylistsError,
  getPlaylistsSuccess,
} from './reducer';
import request from '../../../utils/request';
import config from '../../../config';

function* fetchLatestReleases() {
  try {
    // Get latest releases from API
    const authDetails = yield select((state) => state.auth.authDetails);
    const res = yield call(() =>
      request(`${config.api.baseUrl}/browse/new-releases?country=AU`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authDetails.access_token}`,
        },
      })
    );
    if (res?.albums?.items) {
      yield put(getNewReleasesSuccess(res.albums.items));
    }
  } catch (error) {
    // dispatch error for latest releases
    yield put(
      getNewReleasesError(
        error?.message || 'Something went wrong fetching latest releases!'
      )
    );
  }
}

function* fetchPlaylists() {
  try {
    // Get playlists from API
    const authDetails = yield select((state) => state.auth.authDetails);
    const res = yield call(() =>
      request(`${config.api.baseUrl}/browse/featured-playlists`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authDetails.access_token}`,
        },
      })
    );
    if (res?.playlists?.items) {
      yield put(getPlaylistsSuccess(res.playlists.items));
    }
  } catch (error) {
    // dispatch error for playlists
    yield put(
      getPlaylistsError(
        error?.message || 'Something went wrong fetching featured playlists!'
      )
    );
  }
}

function* fetchCategories() {
  try {
    // Get latest releases from API
    const authDetails = yield select((state) => state.auth.authDetails);
    const res = yield call(() =>
      request(`${config.api.baseUrl}/browse/categories`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authDetails.access_token}`,
        },
      })
    );
    if (res?.categories?.items) {
      yield put(getCategoriesSuccess(res.categories.items));
    }
  } catch (error) {
    // dispatch error for categories
    yield put(
      getCategoriesError(
        error?.message || 'Something went wrong fetching categories!'
      )
    );
  }
}

export default function* discoverSaga() {
  yield takeEvery(getNewReleases().type, fetchLatestReleases);
  yield takeEvery(getPlaylists().type, fetchPlaylists);
  yield takeEvery(getCategories().type, fetchCategories);
}
