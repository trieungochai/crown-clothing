// takeEvery - listens for every action of a specific type that we pass to it
import { takeEvery, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import ShopActionTypes from './shop.types';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

export function* fetchCollectionsAsync() {
  yield console.log('I am fired');

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
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    //the 2ng arg - take every guess is another generator function that will run in response to this takeEvery() listener
    fetchCollectionsAsync
  );
};