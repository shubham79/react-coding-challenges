import { all } from 'redux-saga/effects';
import discoverSaga from '../routes/Discover/redux/saga';
import authSaga from '../auth/redux/saga';

export default function* rootSaga() {
  yield all([authSaga(), discoverSaga()]);
}
