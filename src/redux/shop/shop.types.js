const ShopActionTypes = {
  // because we're handling all the async activity
  // going set multiple states that are shop actions could be in as far as fetching asynchronous data goes
  FETCH_COLLECTIONS_START: 'FETCH_COLLECTIONS_START',
  FETCH_COLLECTIONS_SUCCESS: 'FETCH_COLLECTIONS_SUCCESS',
  FETCH_COLLECTIONS_FAILURE: 'FETCH_COLLECTIONS_FAILURE'
};

export default ShopActionTypes;
