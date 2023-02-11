import React from 'react';
import './index.style.less';
import AuthWrapper from '../AuthWrapper';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import SignupFirebase from './SignupFirebase';

const Signup = () => {
  return (
    <AuthWrapper>
      <AppPageMetadata title='Register' />
      <SignupFirebase />
    </AuthWrapper>
  );
};

export default Signup;
