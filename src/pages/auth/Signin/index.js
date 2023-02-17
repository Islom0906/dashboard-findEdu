import React from 'react';
import './index.style.less';
import AuthWrapper from '../AuthWrapper';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import SignInJwtAuth from './SigninJwtAuth';

const Signin = () => {
  return (
    <AuthWrapper>
      <AppPageMetadata title='Login' />
      <SignInJwtAuth />
    </AuthWrapper>
  );
};

export default Signin;
