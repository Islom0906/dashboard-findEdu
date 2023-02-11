import React from 'react';
import {AppLoader} from '../index';
import PropTypes from 'prop-types';
import {useAuthUser} from './AuthHooks';

const AuthRoutes = ({children}) => {
  const {isLoading} = useAuthUser();
  return isLoading ? <AppLoader /> : <>{children}</>;
};

export default AuthRoutes;

AuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
