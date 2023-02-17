import React from 'react';
import './index.style.less';
import AuthWrapper from '../AuthWrapper';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import SignInJwtAuth from '../Signin/SigninJwtAuth';

const Signup = () => {
  return (
    <AuthWrapper>
      <AppPageMetadata title='Register' />
      <SignInJwtAuth />
    </AuthWrapper>
  );
};

export default Signup;
