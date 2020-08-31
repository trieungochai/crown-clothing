// takeEvery - listens for every action of a specific type that we pass to it
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import ShopActionTypes from './shop.types';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    // call is the effect inside of our generator function that invokes the method
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    // sagas do not dispatch actions using the dispatch keyword (instead they use another effect called 'put')
    //'put' is the saga effect for creating action
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
};

// What this saga does with the effect is?
// it's going to pause whenever a specific action type that we want comes in.
export function* fetchCollectionsStart() {
  // takeLatest - because we only want to issue this API call 1 time
  // (going to get most up to date data from DB)
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    //the 2ng arg - take every guess is another generator function that will run in response to this takeEvery() listener
    fetchCollectionsAsync
  );
};

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
};