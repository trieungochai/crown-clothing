import React from 'react';

// import './collection.styles.scss';

import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { CollectionPageContainer, CollectionTitle, CollectionItemsContainer } from './collection.styles';

// import { firestore } from '../../firebase/firebase.utils';

const CollectionPage = ({ collection }) => {

  // useEffect(() => {
  //   const unsubscribeFromCollections = firestore.collection('collections').onSnapshot(snapshot => console.log(snapshot));
  //   // able to return a func from this func
  //   // this func that we return is what called a 'cleanup func'
  //   // a 'cleanup func' is what useEffect() calls when that component unmount
  //   return() => {
  //     unsubscribeFromCollections();
  //   };
  // }, []);

  const { title, items } = collection;
  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

// (state) is necessary because unlike other selectors, this selector needs a part of the state depending on the URL param!
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);