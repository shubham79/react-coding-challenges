import { configureStore } from '@reduxjs/toolkit';
import discoverReducer from '../routes/Discover/redux/reducer';
import authReducer from '../auth/redux/reducer';
import createSagaMiddleware from 'redux-saga';
import saga from './rootSaga';

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    discover: discoverReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export default store;
