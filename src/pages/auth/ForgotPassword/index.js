import React from 'react';
import ForgetPasswordFirebase from './ForgetPasswordFirebase';
import './index.style.less';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import AuthWrapper from '../AuthWrapper';

const ForgetPassword = () => {
  return (
    <AuthWrapper type='bottom'>
      <AppPageMetadata title='Forgot Password' />
      <ForgetPasswordFirebase />
    </AuthWrapper>
  );
};

export default ForgetPassword;
