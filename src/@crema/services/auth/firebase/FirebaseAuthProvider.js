import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  auth,
  facebookAuthProvider,
  githubAuthProvider,
  googleAuthProvider,
  twitterAuthProvider,
} from './firebase';
import {useDispatch} from 'react-redux';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  LOGIN,
  LOGOUT,
} from '../../../../shared/constants/ActionTypes';
import axios from 'axios';
import {message} from 'antd'

const FirebaseContext = createContext();
const FirebaseActionsContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const useFirebaseActions = () => useContext(FirebaseActionsContext);

const FirebaseAuthProvider = ({children}) => {
  const [firebaseData, setFirebaseData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthUser = auth.onAuthStateChanged(
      (user) => {
        setFirebaseData({
          user: user,
          isLoading: false,
          isAuthenticated: Boolean(user),
        });
      },
      () => {
        setFirebaseData({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      },
      (completed) => {
        setFirebaseData({
          user: null,
          isLoading: false,
          isAuthenticated: completed,
        });
      },
    );

    return () => {
      getAuthUser();
    };
  }, [auth]);

  const getProvider = (providerName) => {
    switch (providerName) {
      case 'google': {
        return googleAuthProvider;
      }
      case 'facebook': {
        return facebookAuthProvider;
      }
      case 'twitter': {
        return twitterAuthProvider;
      }
      case 'github': {
        return githubAuthProvider;
      }
      default:
        return googleAuthProvider;
    }
  };

  const signInWithPopup = async (providerName) => {
    dispatch({type: FETCH_START});
    try {
      const {user} = await auth.signInWithPopup(getProvider(providerName));
      setFirebaseData({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch({type: FETCH_SUCCESS});
    } catch (error) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
  const signInWithEmailAndPassword = async ({email, password}) => {
    if (localStorage.getItem('token')) {
      setFirebaseData({user: 'user1', isAuthenticated: true, isLoading: false});
    } else {
      try {
        const response = await axios.post(
          'http://18.216.178.179/api/v1/user/login',
          {
            email,
            password,
          },
        );
        localStorage.setItem('token', response?.data?.token);
        if (response?.data?.token) {
          dispatch({type: LOGIN});
          dispatch({type: FETCH_START});
          try {
            // let {user} = await auth.signInWithEmailAndPassword(email, password);
            setFirebaseData({
              user: 'user1',
              isAuthenticated: true,
              isLoading: false,
            });
            dispatch({type: FETCH_SUCCESS});
          } catch (error) {
            setFirebaseData({
              ...firebaseData,
              isAuthenticated: false,
              isLoading: false,
            });
            dispatch({type: FETCH_ERROR, payload: error.message});
          }
        } else alert('wrong');
      } catch (e) {
        message.error(e?.response?.data?.message)
      }
    }
  };
  const createUserWithEmailAndPassword = async ({name, email, password, passwordConfirm, role}) => {
    dispatch({type: FETCH_START});
    try{
      const response = await axios.post(
        'http://18.216.178.179/api/v1/user/signup',
        {
          name,
          email,
          password,
          passwordConfirm,
          role,
        },
      );
      message.success(response.data.status)
      // location.reload()
      dispatch({type: FETCH_SUCCESS});
    //    try {
    //   const {user} = await auth.createUserWithEmailAndPassword(email, password);
    //   await auth.currentUser.sendEmailVerification({
    //     url: window.location.href,
    //     handleCodeInApp: true,
    //   });
    //   await auth.currentUser.updateProfile({
    //     displayName: name,
    //   });
    //   setFirebaseData({
    //     user: {...user, displayName: name},
    //     isAuthenticated: true,
    //     isLoading: false,
    //   });
    //   dispatch({type: FETCH_SUCCESS});
    // } catch (error) {
    //   setFirebaseData({
    //     ...firebaseData,
    //     isAuthenticated: false,
    //     isLoading: false,
    //   });
    //   dispatch({type: FETCH_ERROR, payload: error.message});
    // }
  } catch(error){
    message.error(error.response?.data?.message)
  }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setFirebaseData({...firebaseData, isLoading: true});
    dispatch({type: LOGOUT});
    try {
      await auth.signOut();
      setFirebaseData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      setFirebaseData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        ...firebaseData,
      }}>
      <FirebaseActionsContext.Provider
        value={{
          signInWithEmailAndPassword,
          createUserWithEmailAndPassword,
          signInWithPopup,
          logout,
        }}>
        {children}
      </FirebaseActionsContext.Provider>
    </FirebaseContext.Provider>
  );
};
export default FirebaseAuthProvider;

FirebaseAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
