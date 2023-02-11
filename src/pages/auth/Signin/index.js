import React from 'react';
import './index.style.less';
import AuthWrapper from '../AuthWrapper';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import SignInFirebase from './SigninFirebase';

const Signin = () => {
  return (
    <AuthWrapper>
      <AppPageMetadata title='Login' />
      <SignInFirebase />
    </AuthWrapper>
  );
};

export default Signin;
