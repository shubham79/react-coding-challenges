import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getAuthToken,
  getAuthTokenError,
  getAuthTokenSuccess,
} from './reducer';
import request from '../../utils/request';
import config from '../../config';

function* fetchAuthToken() {
  try {
    const { authUrl, clientId, clientSecret } = config.api;
    const queryString = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;
    // Get auth token from Spotify
    const authRes = yield call(() =>
      request(authUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString,
      })
    );
    if (authRes?.access_token) {
      yield put(getAuthTokenSuccess(authRes));
    }
  } catch (error) {
    // dispatch error for latest releases
    yield put(
      getAuthTokenError(
        error?.message || 'Something went wrong fetching auth token!'
      )
    );
  }
}

export default function* authSaga() {
  yield takeEvery(getAuthToken().type, fetchAuthToken);
}
