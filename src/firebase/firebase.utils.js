import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCadGD_Kh4PIx4Zfua2qzeL112Mojc8Jic",
  authDomain: "crown-clothing-db-771d2.firebaseapp.com",
  databaseURL: "https://crown-clothing-db-771d2.firebaseio.com",
  projectId: "crown-clothing-db-771d2",
  storageBucket: "crown-clothing-db-771d2.appspot.com",
  messagingSenderId: "769042810983",
  appId: "1:769042810983:web:7b2302f1b013da0fc56cc2",
  measurementId: "G-807X7C1QHJ"
};

firebase.initializeApp(config);

// 7.12 Storing User Data in Firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

// always trigger the Google pop up whenever we use this GoogleAuthProvider() for authentication & Sign-in
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;