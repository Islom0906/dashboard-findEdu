import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Auth from '@aws-amplify/auth';
import PropTypes from 'prop-types';
import {awsConfig} from './aws-exports';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from '../../../../shared/constants/ActionTypes';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

const AwsCognitoContext = createContext();
const AwsCognitoActionsContext = createContext();

export const useAwsCognito = () => useContext(AwsCognitoContext);

export const useAwsCognitoActions = () => useContext(AwsCognitoActionsContext);

const AwsAuthProvider = ({children}) => {
  const [awsCognitoData, setAwsCognitoData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const auth = useMemo(() => {
    Auth.configure(awsConfig);
    return Auth;
  }, []);

  useEffect(() => {
    auth
      .currentAuthenticatedUser()
      .then((user) =>
        setAwsCognitoData({
          user,
          isAuthenticated: true,
          isLoading: false,
        }),
      )
      .catch(() =>
        setAwsCognitoData({
          user: undefined,
          isAuthenticated: false,
          isLoading: false,
        }),
      );
  }, []);

  const signIn = async ({email, password}) => {
    dispatch({type: FETCH_START});
    try {
      const user = await Auth.signIn(email, password);
      console.log('user: ', user);
      dispatch({type: FETCH_SUCCESS});
      setAwsCognitoData({
        user: user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
  const signUpCognitoUser = async ({email, password, name}) => {
    dispatch({type: FETCH_START});
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
        },
      });
      dispatch({type: FETCH_SUCCESS});
      history.push('/confirm-signup', {email: email});
      dispatch({
        type: SHOW_MESSAGE,
        payload:
          'A code has been sent to your registered email address, Enter the code to complete the signup process!',
      });
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
  const confirmCognitoUserSignup = async (username, code) => {
    dispatch({type: FETCH_START});
    try {
      await Auth.confirmSignUp(username, code, {
        forceAliasCreation: false,
      });
      history.replace('/signin');
      dispatch({
        type: SHOW_MESSAGE,
        payload:
          'Congratulations, Signup process is complete, You can now Sign in by entering correct credentials!',
      });
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };
  const forgotPassword = async (username, code) => {
    dispatch({type: FETCH_START});
    try {
      await Auth.confirmSignUp(username, code, {
        forceAliasCreation: false,
      });
      history.replace('/signin');
      dispatch({
        type: SHOW_MESSAGE,
        payload:
          'Congratulations, Signup process is complete, You can now Sign in by entering correct credentials!',
      });
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      dispatch({type: FETCH_ERROR, payload: error.message});
    }
  };

  const logout = async () => {
    setAwsCognitoData({...awsCognitoData, isLoading: true});
    try {
      await auth.signOut();
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  return (
    <AwsCognitoContext.Provider
      value={{
        ...awsCognitoData,
        auth,
      }}>
      <AwsCognitoActionsContext.Provider
        value={{
          logout,
          signIn,
          signUpCognitoUser,
          confirmCognitoUserSignup,
          forgotPassword,
        }}>
        {children}
      </AwsCognitoActionsContext.Provider>
    </AwsCognitoContext.Provider>
  );
};

export default AwsAuthProvider;

AwsAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
