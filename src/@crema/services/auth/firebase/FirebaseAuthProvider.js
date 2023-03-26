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
  IS_OPEN_TRUE,
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
          'http://3.138.61.64/auth/login',
          {
            email,
            password,
          },
        );
        console.log(response);
        localStorage.setItem('token', response?.data?.access_token);
        if (response?.data?.access_token) {
          dispatch({type: LOGIN});
          dispatch({type: FETCH_START});
          try {
            // let {user} = await auth.signInWithEmailAndPassword(email, password);
            setFirebaseData({
              user: {
              uid: 1,
              displayName: response?.data?.name,
              email: response.data.email 
              },
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
        } else message.error("error");
      } catch (e) {
        message.error(e?.response?.data?.message)
      }
    }
  };
  const createUserWithEmailAndPassword = async ({email, name, password, role}) => {
    dispatch({type: FETCH_START});
    try{
      const response = await axios.post(
        'http://3.138.61.64/auth/register',
        {
          name,
          email,
          password,
          role,
        },
      );
      message.success(response.data?.message)
      dispatch({type: FETCH_SUCCESS});
      response.status == 201 ? dispatch({type: IS_OPEN_TRUE}) : null
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
    error.response?.data?.message == "this user already exists" ? dispatch({type: IS_OPEN_TRUE}) : null
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
