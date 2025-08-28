import React, { createContext, useEffect, useReducer } from 'react';

// third party
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// project imports
import Loader from '../ui-component/Loader';

import { LOGIN, LOGOUT } from '../store/actions';
import accountReducer from '../store/accountReducer';

// types
import { FirebaseContextType, InitialLoginContextProps } from 'types/auth';

// firebase initialize
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
  });
}

// const
const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export function FirebaseProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(
    () =>
      firebase.auth().onIdTokenChanged((user) => {
        if (user) {
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                id: user.uid,
                email: user.email!,
                name: user.displayName || 'John Doe'
              }
            }
          });
        } else {
          dispatch({ type: LOGOUT });
        }
      }),
    []
  );

  const firebaseEmailPasswordSignIn = (email: string, password: string) => firebase.auth().signInWithEmailAndPassword(email, password);

  const firebaseGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  };

  const firebaseTwitterSignIn = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const firebaseFacebookSignIn = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const firebaseRegister = async (email: string, password: string) => firebase.auth().createUserWithEmailAndPassword(email, password);

  const logout = () => firebase.auth().signOut();

  const resetPassword = async (email: string) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  const updateProfile = () => {};
  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <FirebaseContext
      value={{
        ...state,
        firebaseRegister,
        firebaseEmailPasswordSignIn,
        firebaseGoogleSignIn,
        firebaseTwitterSignIn,
        firebaseFacebookSignIn,
        logout,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </FirebaseContext>
  );
}

export default FirebaseContext;
