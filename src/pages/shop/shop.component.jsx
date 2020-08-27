import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { connect } from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { createStructuredSelector } from 'reselect';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    // just call it the moment component mounts
    fetchCollectionsStartAsync();
  };

  render() {
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props;

    return (
      <div className='shop-page'>
        {/* because we got to build our roots off of this 
            (we don't actually know where our shop page is currently*/}
        <Route
          exact
          path={`${match.path}`}
          render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}
        />
      </div>
    );
  };
}; 

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);