import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// thunk is an action creator that returns a func that gets the dispatch similar to the mapDispatchToProps
// action === JS obj
// going to write a func that returns a func that gets dispatch
// so whenever dispatch is called -> it'll fire multiple actions
export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
  // no payload because all this action does is switches isFetching state
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

// this is going to be the actual func that we pass into our component to begin this process
export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');

    // dispatching the moment this func gets called
    dispatch(fetchCollectionsStart());

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};

// if redux-thunk middleware is enabled,
// anytime we attempt to dispatch a func instead of an obj,
// the middleware will call that func with dispatch method itself as the 1st argument.