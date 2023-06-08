import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  getNewReleases,
  getNewReleasesError,
  getNewReleasesSuccess,
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

export default function* discoverSaga() {
  yield takeEvery(getNewReleases().type, fetchLatestReleases);
}
